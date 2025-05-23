import { gql } from 'graphql-request';
import { faker } from '@faker-js/faker';

export async function createBacklogTasks(client, projectID) {
  const mutation = gql`
    mutation createBacklogTasks($backlogProjectID: ID!, $createBacklogTasksInput: [CreateBacklogTaskInput]!) {
      createBacklogTasks(projectID: $backlogProjectID, createBacklogTasksInput: $createBacklogTasksInput) {
        id
      }
    }
  `;

  // Generate 10 fake backlog tasks
  const tasks = Array.from({ length: 10 }, () => ({
    name: faker.lorem.sentence(3),
    status: 'notDone',
    isUserStory: true,
  }));

  const variables = {
    backlogProjectID: projectID,
    createBacklogTasksInput: tasks,
  };

  try {
    await client.request(mutation, variables);
  } catch (err) {
    console.error('Failed to create backlog tasks:', err);
    throw err;
  }
}