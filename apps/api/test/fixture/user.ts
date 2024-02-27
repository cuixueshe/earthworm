import { UserEntity } from 'src/user/user.decorators';

export function createUser(): UserEntity {
  return {
    userId: 1,
    username: 'testUser',
    phone: '1383188181181',
  };
}
