import { gql } from 'graphql-request';

export async function makeUserMainManager(client, projectID, userID) {
  const mutation = gql`
    mutation updateProjectUserAccessRights($projectID: ID!, $userID: ID!, $accessRights: ProjectUserAccessRightsInput!) {
      updateProjectUserAccessRights(
        projectID: $projectID
        userID: $userID
        accessRights: $accessRights
      ) {
        user {
          id
        }
      }
    }
  `;

  const variables = {
    projectID,
    userID,
    accessRights: {
      isMainManager: true,
      canAccessProjectHistory: true,
    },
  };

  try {
    await client.request(mutation, variables);
  } catch (err) {
    console.error('Failed to set user as main manager:', err);
    throw err;
  }
}