import { gql } from 'graphql-request';

export async function getItems(client, projectID) {
  const query = gql`
    query items($projectID: ID!) {
      items(id: $projectID) {
        id
        name
        subprojectPath
        localID
        __typename
        ... on BacklogTask {
          userStory
          status
        }
        ... on Bug {
          detailedDescription
          status
        }
        ... on ScheduledTask {
          status
          timeSpans {
            start
            finish
          }
        }
        ... on Sprint {
          start
          finish
        }
        ... on Release {
          date
        }
      }
    }
  `;

  const variables = { projectID };

  try {
    const data = await client.request(query, variables);
    return data.items;
  } catch (err) {
    console.error('Failed to fetch items:', err);
    throw err;
  }
}