import { gql } from 'graphql-request';

export async function getProjects(client) {
  const query = gql`
    query projects {
      projects {
        id
        name
        qa {
          id
        }
        backlog {
          id
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    return data.projects;
  } catch (err) {
    console.error('Failed to fetch projects:', err);
    throw err;
  }
}