import { achievements, userAchievements, userProfile } from '@earthworm/schema';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { UserService } from 'src/user/user.service';
import { DB, DbType } from '../global/providers/db.provider';
import {
  FindUserDto,
  UserAchievementDto,
  publishAchievementDto,
  setAchievementDto,
} from './model/pub.dto';
@Injectable()
export class AchieveService {
  constructor(
    @Inject(DB) private db: DbType,
    private userService: UserService,
  ) {}
  async authUser(dto: FindUserDto) {
    const user = await this.userService.findWithPhone(dto);
    if (!user) {
      throw new HttpException('不存在该用户', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
  async useAchievement(dto: UserAchievementDto) {
    const userAchieve = await this.db.query.userAchievements.findFirst({
      where: eq(userAchievements.userID, dto.userID),
    });
    if (!userAchieve) {
      throw new HttpException('当前未设置使用中成就', HttpStatus.BAD_REQUEST);
    }
    return userAchieve;
  }
  async setAchievement(dto: setAchievementDto) {
    const haveAchieve = await this.db.query.userAchievements.findFirst({
      where: eq(userAchievements.achievementID, dto.achievementID),
    });
    if (!haveAchieve) {
      throw new HttpException('不存在该成就', HttpStatus.BAD_REQUEST);
    }
    const activeAchieve = await this.db.query.userProfile.findFirst({
      where: eq(userProfile.userID, dto.userID),
    });
    if (activeAchieve) {
      if (activeAchieve.achievementID === dto.achievementID) {
        throw new HttpException(
          '当前成就为使用中成就，请更换其他成就',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const res = await this.db
          .update(userProfile)
          .set({
            achievementID: dto.achievementID,
          })
          .where(eq(userProfile.userID, dto.userID));
        if (res) {
          throw new HttpException('更换成就成功', HttpStatus.OK);
        }
      }
    } else {
      const res = await this.db
        .insert(userProfile)
        .values({ userID: dto.userID, achievementID: dto.achievementID });
      if (res) {
        throw new HttpException('设置当前成就为使用中', HttpStatus.OK);
      }
    }
  }
  async PubAchievement(dto: publishAchievementDto) {
    const existing = await this.db.query.userAchievements.findMany({
      where: eq(userAchievements.userID, dto.userID),
    });

    if (existing) {
      const existingAchievements = existing.map(
        (record) => record.achievementID,
      );
      const newAchievements = dto.choiceAchievement.filter(
        (achievementID) =>
          !existingAchievements.includes(Number(achievementID)),
      );
      if (newAchievements.length > 0) {
        const insertData = newAchievements.map((achievementID) => ({
          userID: dto.userID,
          achievementID: Number(achievementID), // Convert achievementID to a number
        }));
        const res = await this.db.insert(userAchievements).values(insertData);

        if (res) {
          throw new HttpException('添加成就完成', HttpStatus.OK);
        }
      } else {
        throw new HttpException('选中成就已经拥有', HttpStatus.BAD_REQUEST);
      }
    } else {
      const insertData = dto.choiceAchievement.map((achievementID) => ({
        userID: dto.userID,
        achievementID: Number(achievementID), // Convert achievementID to a number
      }));
      const res = await this.db.insert(userAchievements).values(insertData);

      if (res) {
        throw new HttpException('添加成就完成', HttpStatus.OK);
      }
    }
  }

  async AllAchievement() {
    const achievementAll = await this.db
      .select({
        id: achievements.id,
        name: achievements.name,
        description: achievements.description,
      })
      .from(achievements);

    return achievementAll;
  }
  async haveAchievement(dto: UserAchievementDto) {
    const userAchieve = await this.db.query.userAchievements.findMany({
      where: eq(userAchievements.userID, dto.userID),
    });
    if (!userAchieve.length) {
      throw new HttpException('还没有获得成就', HttpStatus.BAD_REQUEST);
    }
    // 查询achievements表，获取详细信息
    const promises = userAchieve.map(async (achievement) => {
      const achievementDetails = await this.db.query.achievements.findFirst({
        where: eq(achievements.id, achievement.achievementID),
      });
      if (!achievementDetails) {
        throw new HttpException('找不到相应的成就信息', HttpStatus.BAD_REQUEST);
      }
      return achievementDetails;
    });
    const achievementDetails = await Promise.all(promises);
    const result = userAchieve.map((achievement, index) => ({
      ...achievementDetails[index],
      createdAt: achievement.createdAt,
    }));

    return result;
  }
}
