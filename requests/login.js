import { gql } from 'graphql-request';

export async function login(client, username, password) {
  const mutation = gql`
    mutation login($username: String!, $password: String!) {
      login(loginUserInput: { username: $username, password: $password }) {
        access_token
      }
    }
  `;

  const variables = { username, password };

  try {
    const data = await client.request(mutation, variables);
    console.log('User successfully authenticated');
    return data.login.access_token;
  } catch (err) {
    console.error('Login failed:', err);
    throw err;
  }
}