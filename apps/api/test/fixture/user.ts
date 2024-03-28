import { UserEntity } from 'src/user/user.decorators';

export function createUser(): UserEntity {
  return {
    userId: 1,
    username: '13831881811',
    phone: '13831881811',
    nickname: 'testUser',
  };
}
