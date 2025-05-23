import { gql } from 'graphql-request';

export async function appInfo(client) {

  const query = gql`
    query appInfo {
      appInfo {
        apiVersion
      }
    }
  `;
  const data = await client.request(query);
  return data.appInfo.apiVersion;
}