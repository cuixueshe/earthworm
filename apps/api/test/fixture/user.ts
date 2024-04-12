import { UserEntity } from 'src/user/user.decorators';
import { logtoApi } from '../../src/services/logtoService';

export function createUser(): UserEntity {
  return {
    userId: '123456',
  };
}

export const tokenOwner = process.env.LOGTO_CLIENT_ID;

export async function createLogtoUser(username: string) {
  const params = new URLSearchParams([['search.username', username]]);
  const { data: users } = await logtoApi.get('/api/users', {
    params,
  });

  for (const user of users) {
    await logtoApi.delete(`/api/users/${user.id}`);
  }

  // // 2. 创建一个 user
  const { data } = await logtoApi.post('/api/users', {
    username,
  });

  return { userId: data.id, username };
}
