import { GraphQLClient, gql } from 'graphql-request';
import { appInfo } from './requests/queries/appInfo.js';
import { getItems } from './requests/queries/items.js';
import { getProjects } from './requests/queries/projects.js';
import { login } from './requests/login.js';
import { extractSubFromToken } from './util/extractSubFromToken.js';
import { createProject } from './requests/mutations/createProject.js';
import { addUserToProject } from './requests/mutations/addUserToProject.js';
import { makeUserMainManager } from './requests/mutations/makeUserMainManager.js';
import { createBacklogTasks } from './requests/mutations/createBacklogTasks.js';

import dotenv from 'dotenv';
dotenv.config();

const API_URL = `${process.env.P4PLAN_API_HOST}/graphql`;
const client = new GraphQLClient(API_URL, {
  headers: {
    'Cache-Control': 'no-cache',
  },
});


// Implement login, getProjects, getItems, createProject, extractSubFromToken, addUserToProject, makeUserMainManager, createBacklogTasks as needed

async function main() {
  try {
    // 1. Get API version
    const apiVersion = await appInfo(client);
    console.log(`JS client connected successfully to P4 Plan API: ${apiVersion}`);

    // 2. Login and get access token
    const accessToken = await login(client, process.env.P4PLAN_USERNAME, process.env.P4PLAN_PASSWORD);
    console.log('Access token:', accessToken);

    client.setHeader('Authorization', `Bearer ${accessToken}`);

    // 3. Get all projects
    const projects = await getProjects(client);
    console.log('Projects received:', projects.length);

    // 4. Get items for first project
    const items = await getItems(client, projects[0].id);
    console.log(`Planning tab items for ${projects[0].name} received:`, items.length);

    // 5. Create new project
    const newProject = await createProject(client);
    console.log('New project created:', newProject.name);

    // 6. Extract user ID from token
    const authenticatedUserId = extractSubFromToken(accessToken);

    // 7. Add user to new project
    await addUserToProject(client, newProject.id, authenticatedUserId);
    // 8. Make user main manager
    await makeUserMainManager(client, newProject.id, authenticatedUserId);
    console.log('Authenticated user added to new project and is now a main manager');

    // 9. Create backlog tasks
    await createBacklogTasks(client, newProject.backlog.id);
    console.log('10 new backlog tasks have been created in the newly created project');
  } catch (err) {
    console.error(err);
  }
}

main();