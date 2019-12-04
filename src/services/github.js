import request from '@octokit/request';
import Octokit from '@octokit/rest';

// Compare: https://developer.github.com/v3/repos/#list-organization-repositories
export const listRepos = octokit =>
  octokit.repos
    .listForOrg({
      org: 'jimmylv',
      type: 'public',
    })
    .then(({ data, headers, status }) => {
      // handle data
      console.log('repo data', data);
    });

export const createGitHubClient = accessToken =>
  new Octokit({
    auth: `token ${accessToken}`,
  });

export const listPrivateRepos = async accessToken => {
  // Following GitHub docs formatting:
  // https://developer.github.com/v3/repos/#list-organization-repositories
  const result = await request('GET /orgs/:org/repos', {
    headers: {
      authorization: `token ${accessToken}`,
    },
    org: 'jimmylv',
    type: 'private',
  });

  console.log(`${result.data.length} repos found.`, result.data);
};
