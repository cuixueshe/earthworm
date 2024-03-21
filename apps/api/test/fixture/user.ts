import { UserEntity } from 'src/user/user.decorators';

export function createUser(): UserEntity {
  return {
    userId: 1,
    username: 'testUser',
    phone: '13831881811',
  };
}
