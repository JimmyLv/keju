import {request} from '@octokit/request';

test('show github repos', async () => {
  let accessToken = '';
  const result = await request('GET /users/:username/repos', {
    headers: {
      authorization: `token ${accessToken}`,
    },
    username: 'jimmylv',
    type: 'private',
  });

  console.log(`${result.data.length} repos found.`, result.data);
});
