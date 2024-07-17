import { and, asc, eq, or } from "drizzle-orm";
import { afterAll, beforeEach, describe, expect, it } from "vitest";

import {
  courseHistory as courseHistorySchema,
  coursePack as coursePackSchema,
  course as courseSchema,
  statement as statementSchema,
  userCourseProgress as userCourseProgressSchema,
} from "@earthworm/schema";
import { cleanDB, db } from "../../db";
import { createCoursePack, deleteCoursePack, updateCoursePack } from "../course-pack.service";

describe("course pack service", () => {
  beforeEach(async () => {
    // 清空数据库
    await cleanDB(db);
  });

  afterAll(async () => {
    await cleanDB(db);
  });

  describe("create course pack", () => {
    it("should create a new course pack with all fields correctly provided", async () => {
      const mockData = createCoursePackMockData();
      const result = await createCoursePack(mockData);

      expect(result).toBeDefined();
      expect(result.coursePackId).toBeDefined();
      expect(result.courseIds.length).toBe(mockData.courses.length);
    });

    it("should return the correct result with course pack ID, title, and course ID list", async () => {
      const mockData = createCoursePackMockData();
      const result = await createCoursePack(mockData);

      expect(result).toBeDefined();
      expect(result.coursePackId).toBeDefined();
      expect(result.courseIds.length).toBe(mockData.courses.length);
    });

    it("should correctly calculate the course pack order", async () => {
      const mockData = createCoursePackMockData();

      // Create the first course pack
      const firstResult = await createCoursePack(mockData);
      expect(firstResult.coursePackId).toBeDefined();

      // Query the order of the first course pack
      const firstCoursePackOrder = await db.query.coursePack.findFirst({
        where: (coursePacks, { eq }) => eq(coursePacks.id, firstResult.coursePackId),
        columns: { order: true },
      });
      expect(firstCoursePackOrder!.order).toBe(1);

      // Create the second course pack
      const secondResult = await createCoursePack(mockData);
      expect(secondResult.coursePackId).toBeDefined();

      // Query the order of the second course pack
      const secondCoursePackOrder = await db.query.coursePack.findFirst({
        where: (coursePacks, { eq }) => eq(coursePacks.id, secondResult.coursePackId),
        columns: { order: true },
      });
      expect(secondCoursePackOrder!.order).toBe(2);
    });
  });

  describe("delete course pack", () => {
    it("should delete a course pack and related entities", async () => {
      const mockData = createCoursePackMockData();
      const result = await createCoursePack(mockData);

      const deleteResult = await deleteCoursePack(result.coursePackId);
      expect(deleteResult).toBe(true);

      // Check if the course pack is deleted
      const coursePack = await db.query.coursePack.findFirst({
        where: eq(coursePackSchema.id, result.coursePackId),
      });
      expect(coursePack).toBeUndefined();

      // Check if the related courses are deleted
      const courses = await db.query.course.findMany({
        where: eq(courseSchema.coursePackId, result.coursePackId),
      });
      expect(courses.length).toBe(0);

      // Check if the related statements are deleted
      const statements = await db.query.statement.findMany({
        where: or(...result.courseIds.map((courseId) => eq(statementSchema.courseId, courseId))),
      });
      expect(statements.length).toBe(0);
    });

    it("should delete course history related to the course pack", async () => {
      // Create a course pack
      const mockData = createCoursePackMockData();
      const result = await createCoursePack(mockData);

      expect(result).toBeDefined();
      expect(result.coursePackId).toBeDefined();

      // Insert course history data
      await db.insert(courseHistorySchema).values({
        coursePackId: result.coursePackId,
        courseId: "",
        completionCount: 1,
        userId: "user123",
      });

      // Delete the course pack
      const deleteResult = await deleteCoursePack(result.coursePackId);
      expect(deleteResult).toBe(true);

      // Check if the course history is deleted
      const courseHistory = await db.query.courseHistory.findMany({
        where: eq(courseHistorySchema.coursePackId, result.coursePackId),
      });
      expect(courseHistory.length).toBe(0);
    });

    it("should delete user course progress related to the course pack", async () => {
      // Create a course pack
      const mockData = createCoursePackMockData();
      const result = await createCoursePack(mockData);

      expect(result).toBeDefined();
      expect(result.coursePackId).toBeDefined();

      // Insert user course progress data
      await db.insert(userCourseProgressSchema).values({
        coursePackId: result.coursePackId,
        userId: "user123",
        courseId: "",
        statementIndex: 0,
      });

      // Delete the course pack
      const deleteResult = await deleteCoursePack(result.coursePackId);
      expect(deleteResult).toBe(true);

      // Check if the user course progress is deleted
      const userCourseProgress = await db.query.userCourseProgress.findMany({
        where: eq(userCourseProgressSchema.coursePackId, result.coursePackId),
      });
      expect(userCourseProgress.length).toBe(0);
    });

    it("should not delete course history unrelated to the course pack", async () => {
      // Create a course pack
      const mockData = createCoursePackMockData();
      const result = await createCoursePack(mockData);

      expect(result).toBeDefined();
      expect(result.coursePackId).toBeDefined();

      // Insert unrelated course history data
      await db.insert(courseHistorySchema).values({
        coursePackId: "unrelated-course-pack-id",
        userId: "user123",
        courseId: "",
        completionCount: 50,
      });

      // Delete the course pack
      const deleteResult = await deleteCoursePack(result.coursePackId);
      expect(deleteResult).toBe(true);

      // Check if the unrelated course history is still present
      const courseHistory = await db.query.courseHistory.findMany({
        where: eq(courseHistorySchema.coursePackId, "unrelated-course-pack-id"),
      });
      expect(courseHistory.length).toBe(1);
    });

    it("should not delete user course progress unrelated to the course pack", async () => {
      // Create a course pack
      const mockData = createCoursePackMockData();
      const result = await createCoursePack(mockData);

      expect(result).toBeDefined();
      expect(result.coursePackId).toBeDefined();

      // Insert unrelated user course progress data
      await db.insert(userCourseProgressSchema).values({
        coursePackId: "unrelated-course-pack-id",
        userId: "user123",
        courseId: "",
        statementIndex: 0,
      });

      // Delete the course pack
      const deleteResult = await deleteCoursePack(result.coursePackId);
      expect(deleteResult).toBe(true);

      // Check if the unrelated user course progress is still present
      const userCourseProgress = await db.query.userCourseProgress.findMany({
        where: eq(userCourseProgressSchema.coursePackId, "unrelated-course-pack-id"),
      });
      expect(userCourseProgress.length).toBe(1);
    });

    it("should return false if the course pack does not exist", async () => {
      await expect(async () => {
        await deleteCoursePack("non-existent-id");
      }).rejects.toThrow("not found course pack");
    });
  });

  describe("update course pack", () => {
    it("should update basic information of the course pack", async () => {
      // Create a course pack
      const mockData = createCoursePackMockData();
      const result = await createCoursePack(mockData);

      // Update course pack information
      const updateInfo = {
        uId: mockData.uId,
        title: "Updated Title",
        description: "Updated Description",
        cover: "https://example.com/updated-cover.jpg",
        shareLevel: "public",
        courses: [],
      };

      const updateResult = await updateCoursePack(result.coursePackId, updateInfo);
      expect(updateResult).toEqual({
        courseIds: [],
      });

      //       Check if the course pack information is updated
      const updatedCoursePack = await db.query.coursePack.findFirst({
        where: eq(coursePackSchema.id, result.coursePackId),
      });

      expect(updatedCoursePack).toBeDefined();
      expect(updatedCoursePack!.title).toBe(updateInfo.title);
      expect(updatedCoursePack!.description).toBe(updateInfo.description);
      expect(updatedCoursePack!.cover).toBe(updateInfo.cover);
    });

    it("should only allow the creator to update the course pack information", async () => {
      // Create a course pack
      const mockData = createCoursePackMockData();
      const result = await createCoursePack(mockData);

      // Attempt to update with a different user ID
      const updateInfo = {
        uId: "different-user-id",
        title: "Updated Title",
        description: "Updated Description",
        cover: "https://example.com/updated-cover.jpg",
        courses: [],
        shareLevel: "public",
      };

      await expect(async () => {
        await updateCoursePack(result.coursePackId, updateInfo);
      }).rejects.toThrow("not found course pack");
    });

    it("should return false if the course pack does not exist", async () => {
      // Attempt to update a non-existent course pack
      const updateInfo = {
        uId: "user123",
        title: "Updated Title",
        description: "Updated Description",
        cover: "https://example.com/updated-cover.jpg",
        courses: [],
        shareLevel: "public",
      };

      await expect(async () => {
        await updateCoursePack("non-existent-course-pack-id", updateInfo);
      }).rejects.toThrow("not found course pack");
    });

    describe("update course", () => {
      it("should update existing course information", async () => {
        // Create a course pack
        const mockData = createCoursePackMockData();
        const result = await createCoursePack(mockData);

        // Update course information
        const updateInfo = {
          uId: mockData.uId,
          title: "Updated Title",
          description: "Updated Description",
          cover: "https://example.com/updated-cover.jpg",
          shareLevel: "public",
          courses: [
            {
              title: "Updated Course Title 1",
              description: "Updated Course Description 1",
              publishCourseId: result.courseIds[0],
              statements: mockData.courses[0].statements,
            },
          ],
        };

        await updateCoursePack(result.coursePackId, updateInfo);
        // Check if the course information is updated
        const updatedCourse = await db.query.course.findFirst({
          where: eq(courseSchema.id, updateInfo.courses[0].publishCourseId),
        });

        expect(updatedCourse).toBeDefined();
        expect(updatedCourse!.title).toBe(updateInfo.courses[0].title);
        expect(updatedCourse!.description).toBe(updateInfo.courses[0].description);
      });

      it("should create new courses and add them to the course pack", async () => {
        // Create a course pack
        const mockData = createCoursePackMockData();
        const result = await createCoursePack(mockData);

        mockData.courses[0].publishCourseId = result.courseIds[0];
        mockData.courses[1].publishCourseId = result.courseIds[1];
        // Update course pack with new courses
        const updateInfo = {
          uId: mockData.uId,
          title: "Updated Title",
          description: "Updated Description",
          cover: "https://example.com/updated-cover.jpg",
          shareLevel: "public",
          courses: [
            ...mockData.courses,
            {
              title: "New Course Title",
              description: "New Course Description",
              publishCourseId: "",
              statements: [
                {
                  english: "New English Statement",
                  chinese: "New Chinese Statement",
                  phonetic: "New Phonetic",
                },
              ],
            },
          ],
        };

        const updateResult = await updateCoursePack(result.coursePackId, updateInfo);
        expect(updateResult).toBeDefined();

        // Check if the new course is created
        const newCourseId = updateResult.courseIds[2] || "";
        const newCourse = await db.query.course.findFirst({
          where: eq(courseSchema.id, newCourseId),
        });

        expect(newCourse).toBeDefined();
        expect(newCourse!.title).toBe(updateInfo.courses[2].title);
        expect(newCourse!.description).toBe(updateInfo.courses[2].description);
      });

      it("should delete existing courses that are no longer needed", async () => {
        // Create a course pack
        const mockData = createCoursePackMockData();
        const result = await createCoursePack(mockData);

        // Update course pack with fewer courses
        const updateInfo = {
          uId: mockData.uId,
          title: "Updated Title",
          description: "Updated Description",
          cover: "https://example.com/updated-cover.jpg",
          shareLevel: "public",
          courses: [
            {
              title: "Updated Course Title 1",
              description: "Updated Course Description 1",
              publishCourseId: result.courseIds[0],
              statements: mockData.courses[0].statements,
            },
          ],
        };
        await updateCoursePack(result.coursePackId, updateInfo);
        // 删除了一个 只剩下一个
        const courses = await db.query.course.findMany();
        expect(courses.length).toBe(1);
      });

      it("should delete course history records when a course is deleted", async () => {
        // Create a course pack
        const mockData = createCoursePackMockData();
        const result = await createCoursePack(mockData);

        // Insert course history records
        await db.insert(courseHistorySchema).values({
          coursePackId: result.coursePackId,
          courseId: result.courseIds[1], // Use the publishCourseId from the result
          userId: "user123",
          completionCount: 50,
        });

        // Update course pack with fewer courses
        const updateInfo = {
          uId: mockData.uId,
          title: "Updated Title",
          description: "Updated Description",
          cover: "https://example.com/updated-cover.jpg",
          shareLevel: "public",
          courses: [
            {
              title: "Updated Course Title 1",
              description: "Updated Course Description 1",
              publishCourseId: result.courseIds[0], // Use the publishCourseId from the result
              statements: mockData.courses[0].statements,
            },
          ],
        };

        const updateResult = await updateCoursePack(result.coursePackId, updateInfo);
        expect(updateResult).toBeDefined();

        // Check if the course history records are deleted
        const courseHistory = await db.query.courseHistory.findFirst({
          where: and(
            eq(courseHistorySchema.coursePackId, result.coursePackId),
            eq(courseHistorySchema.courseId, result.courseIds[1]), // Use the publishCourseId from the result
          ),
        });

        expect(courseHistory).toBeUndefined();
      });

      it("should delete user course progress records when a course is deleted", async () => {
        // Create a course pack
        const mockData = createCoursePackMockData();
        const result = await createCoursePack(mockData);

        // Insert user course progress records
        await db.insert(userCourseProgressSchema).values({
          coursePackId: result.coursePackId,
          courseId: result.courseIds[1], // Use the publishCourseId from the result
          userId: "user123",
          statementIndex: 1,
        });

        // Update course pack with fewer courses
        const updateInfo = {
          uId: mockData.uId,
          title: "Updated Title",
          description: "Updated Description",
          cover: "https://example.com/updated-cover.jpg",
          shareLevel: "public",
          courses: [
            {
              title: "Updated Course Title 1",
              description: "Updated Course Description 1",
              publishCourseId: result.courseIds[0], // Use the publishCourseId from the result
              statements: mockData.courses[0].statements,
            },
          ],
        };

        const updateResult = await updateCoursePack(result.coursePackId, updateInfo);
        expect(updateResult).toBeDefined();

        // Check if the user course progress records are deleted
        const userCourseProgress = await db.query.userCourseProgress.findFirst({
          where: and(
            eq(userCourseProgressSchema.coursePackId, result.coursePackId),
            eq(userCourseProgressSchema.courseId, result.courseIds[1]), // Use the publishCourseId from the result
          ),
        });

        expect(userCourseProgress).toBeUndefined();
      });

      it("should not affect publishCourseId in courseHistorySchema after deleting a course", async () => {
        // Create a course pack
        const mockData = createCoursePackMockData();
        const result = await createCoursePack(mockData);

        // Insert course history records
        await db.insert(courseHistorySchema).values({
          coursePackId: result.coursePackId,
          courseId: result.courseIds[0], // Use the publishCourseId from the result
          userId: "user123",
          completionCount: 50,
        });

        // Update course pack with fewer courses
        const updateInfo = {
          uId: mockData.uId,
          title: "Updated Title",
          description: "Updated Description",
          cover: "https://example.com/updated-cover.jpg",
          shareLevel: "public",
          courses: [
            {
              title: "Updated Course Title 1",
              description: "Updated Course Description 1",
              publishCourseId: result.courseIds[0], // Use the publishCourseId from the result
              statements: mockData.courses[0].statements,
            },
          ],
        };

        const updateResult = await updateCoursePack(result.coursePackId, updateInfo);
        expect(updateResult).toBeDefined();

        // Check if the course history records are intact
        const courseHistory = await db.query.courseHistory.findFirst({
          where: and(
            eq(courseHistorySchema.coursePackId, result.coursePackId),
            eq(courseHistorySchema.courseId, result.courseIds[0]), // Use the publishCourseId from the result
          ),
        });

        expect(courseHistory).toBeDefined();
      });

      it("should not affect publishCourseId in userCourseProgressSchema after deleting a course", async () => {
        // Create a course pack
        const mockData = createCoursePackMockData();
        const result = await createCoursePack(mockData);

        expect(result).toBeDefined();
        expect(result.coursePackId).toBeDefined();

        // Insert user course progress records
        await db.insert(userCourseProgressSchema).values({
          coursePackId: result.coursePackId,
          courseId: result.courseIds[0], // Use the publishCourseId from the result
          userId: "user123",
          statementIndex: 1,
        });

        // Update course pack with fewer courses
        const updateInfo = {
          uId: mockData.uId,
          title: "Updated Title",
          description: "Updated Description",
          cover: "https://example.com/updated-cover.jpg",
          shareLevel: "public",
          courses: [
            {
              title: "Updated Course Title 1",
              description: "Updated Course Description 1",
              publishCourseId: result.courseIds[0], // Use the publishCourseId from the result
              statements: mockData.courses[0].statements,
            },
          ],
        };

        const updateResult = await updateCoursePack(result.coursePackId, updateInfo);
        expect(updateResult).toBeDefined();

        // Check if the user course progress records are intact
        const userCourseProgress = await db.query.userCourseProgress.findFirst({
          where: and(
            eq(userCourseProgressSchema.coursePackId, result.coursePackId),
            eq(userCourseProgressSchema.courseId, result.courseIds[0]), // Use the publishCourseId from the result
          ),
        });

        expect(userCourseProgress).toBeDefined();
      });
    });

    describe("update statements", () => {
      it("should update existing statement information", async () => {
        // Create a course pack
        const mockData = createCoursePackMockData();
        const result = await createCoursePack(mockData);

        // Update course pack with updated statements
        const updateInfo = {
          uId: mockData.uId,
          title: "Updated Title",
          description: "Updated Description",
          cover: "https://example.com/updated-cover.jpg",
          shareLevel: "public",
          courses: [
            {
              title: "Updated Course Title 1",
              description: "Updated Course Description 1",
              publishCourseId: result.courseIds[0], // Use the publishCourseId from the result
              statements: [
                {
                  english: "Updated English Statement",
                  chinese: "Updated Chinese Statement",
                  phonetic: "Updated Phonetic",
                },
              ],
            },
          ],
        };

        const updateResult = await updateCoursePack(result.coursePackId, updateInfo);
        expect(updateResult).toBeDefined();

        // Check if the statement information is updated
        const updatedStatement = await db.query.statement.findFirst({
          where: eq(statementSchema.courseId, result.courseIds[0]), // Use the publishCourseId from the result
        });

        expect(updatedStatement).toBeDefined();
        expect(updatedStatement!.english).toBe(updateInfo.courses[0].statements[0].english);
        expect(updatedStatement!.chinese).toBe(updateInfo.courses[0].statements[0].chinese);
        expect(updatedStatement!.soundmark).toBe(updateInfo.courses[0].statements[0].phonetic);
      });

      it("should create new statements and add them to the course", async () => {
        // Create a course pack
        const mockData = createCoursePackMockData();
        const result = await createCoursePack(mockData);

        // Update course pack with new statements
        const updateInfo = {
          uId: mockData.uId,
          title: "Updated Title",
          description: "Updated Description",
          cover: "https://example.com/updated-cover.jpg",
          shareLevel: "public",
          courses: [
            {
              title: "Updated Course Title 1",
              description: "Updated Course Description 1",
              publishCourseId: result.courseIds[0], // Use the publishCourseId from the result
              statements: [
                ...mockData.courses[0].statements,
                {
                  english: "New English Statement",
                  chinese: "New Chinese Statement",
                  phonetic: "New Phonetic",
                },
              ],
            },
          ],
        };

        const updateResult = await updateCoursePack(result.coursePackId, updateInfo);
        expect(updateResult).toBeDefined();

        // Check if the new statement is created
        const newStatement = await db.query.statement.findFirst({
          where: and(
            eq(statementSchema.courseId, result.courseIds[0]), // Use the publishCourseId from the result
            eq(statementSchema.english, "New English Statement"),
          ),
        });

        expect(newStatement).toBeDefined();
        expect(newStatement!.chinese).toBe("New Chinese Statement");
        expect(newStatement!.soundmark).toBe("New Phonetic");
      });

      it("should delete existing statements that are no longer needed", async () => {
        // Create a course pack
        const mockData = createCoursePackMockData();
        const result = await createCoursePack(mockData);

        // Update course pack with fewer statements
        const updateInfo = {
          uId: mockData.uId,
          title: "Updated Title",
          description: "Updated Description",
          cover: "https://example.com/updated-cover.jpg",
          shareLevel: "public",
          courses: [
            {
              title: "Updated Course Title 1",
              description: "Updated Course Description 1",
              publishCourseId: result.courseIds[0], // Use the publishCourseId from the result
              statements: [
                {
                  english: "Updated English Statement",
                  chinese: "Updated Chinese Statement",
                  phonetic: "Updated Phonetic",
                },
              ],
            },
          ],
        };

        const updateResult = await updateCoursePack(result.coursePackId, updateInfo);
        expect(updateResult).toBeDefined();

        // Check if the statement is deleted
        const deletedStatement = await db.query.statement.findFirst({
          where: and(
            eq(statementSchema.courseId, result.courseIds[0]), // Use the publishCourseId from the result
            eq(statementSchema.english, mockData.courses[0].statements[1].english),
          ),
        });

        expect(deletedStatement).toBeUndefined();
      });

      it("should update statement order", async () => {
        // Create a course pack
        const mockData = createCoursePackMockData();
        const result = await createCoursePack(mockData);

        // Update course pack with reordered statements
        const updateInfo = {
          uId: mockData.uId,
          title: "Updated Title",
          description: "Updated Description",
          cover: "https://example.com/updated-cover.jpg",
          shareLevel: "public",
          courses: [
            {
              title: "Updated Course Title 1",
              description: "Updated Course Description 1",
              publishCourseId: result.courseIds[0], // Use the publishCourseId from the result
              statements: [mockData.courses[0].statements[1], mockData.courses[0].statements[0]],
            },
          ],
        };

        const updateResult = await updateCoursePack(result.coursePackId, updateInfo);
        expect(updateResult).toBeDefined();

        // Check if the statement order is updated
        const statements = await db.query.statement.findMany({
          where: eq(statementSchema.courseId, result.courseIds[0]), // Use the publishCourseId from the result
          orderBy: [asc(statementSchema.order)],
        });

        expect(statements).toBeDefined();
        expect(statements.length).toBe(2);
        expect(statements[0].english).toBe(mockData.courses[0].statements[1].english);
        expect(statements[1].english).toBe(mockData.courses[0].statements[0].english);
      });
    });
  });
});

function createCoursePackMockData() {
  return {
    title: "Advanced English Course Pack",
    description: "This course pack is designed for advanced English learners.",
    cover: "https://example.com/cover.jpg",
    uId: "user123",
    shareLevel: "public",
    courses: [
      {
        title: "Advanced Grammar",
        description: "Deep dive into advanced English grammar concepts.",
        publishCourseId: "",
        statements: [
          {
            english: "The quick brown fox jumps over the lazy dog.",
            phonetic: "/ðə kwɪk braʊn fɑks dʒʌmps oʊvər ðə leɪzi dɔɡ/",
            chinese: "快速的棕色狐狸跳过懒狗。",
          },
          {
            english: "She sells seashells by the seashore.",
            phonetic: "/ʃi sɛlz siːʃɛlz baɪ ðə siːʃɔːr/",
            chinese: "她在海边卖贝壳。",
          },
        ],
      },
      {
        title: "Advanced Vocabulary",
        description: "Expand your vocabulary with advanced English words.",
        publishCourseId: "",
        statements: [
          {
            english: "He is an erudite scholar with extensive knowledge.",
            phonetic: "/hiː ɪz ən ˈɜːr.daɪt ˈskɒl.ər wɪð ɪkˈstɛn.sɪv ˈnɒl.ɪdʒ/",
            chinese: "他是一位博学的学者，拥有广泛的知识。",
          },
          {
            english: "The symposium encompassed a wide range of topics.",
            phonetic: "/ðə ˈsɪm.pə.zi.əm ɛn.kʌmp.əsəd ə waɪd reɪndʒ ʌv ˈtɑ.pɪks/",
            chinese: "研讨会涵盖了广泛的主题。",
          },
        ],
      },
    ],
  };
}
