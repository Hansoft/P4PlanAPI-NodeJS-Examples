import { gql } from 'graphql-request';

export async function addUserToProject(client, projectID, userID) {
  const mutation = gql`
    mutation addProjectUser($projectID: ID!, $userID: ID!) {
      addProjectUser(projectID: $projectID, userID: $userID) {
        id
      }
    }
  `;

  const variables = { projectID, userID };

  try {
    await client.request(mutation, variables);
  } catch (err) {
    console.error('Failed to add user to project:', err);
    throw err;
  }
}