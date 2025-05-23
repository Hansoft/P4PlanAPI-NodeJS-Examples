import { gql } from 'graphql-request';
import { faker } from '@faker-js/faker';

export async function createProject(client) {
  const mutation = gql`
    mutation createProject($createProjectInput: CreateProjectInput!) {
      createProject(createProjectInput: $createProjectInput) {
        id
        name
        backlog {
          id
        }
        qa {
          id
        }
      }
    }
  `;

  const variables = {
    createProjectInput: {
      name: faker.company.buzzPhrase(),
      archivedStatus: false,
    },
  };

  try {
    const data = await client.request(mutation, variables);
    return data.createProject;
  } catch (err) {
    console.error('Failed to create project:', err);
    throw err;
  }
}