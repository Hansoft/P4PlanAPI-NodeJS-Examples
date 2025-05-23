# P4PlanAPI-NodeJS-Examples

Examples to explore the P4 Plan API using NodeJS.

## GraphQL Client

* Simple implementation of some useful queries and mutations to familiarize someone with P4Plan's API.

## Dependencies

* Node.js version LTS
* [P4 Plan Server 2024.1/013 or later](https://www.perforce.com/downloads/hansoft-server)
* [P4 Plan API 2024.1/001](https://www.perforce.com/downloads/helix-plan-api) or [P4 Plan Web 2024.1/001](https://www.perforce.com/downloads/helix-plan-web-client)
* P4 Plan license with the SDK enabled

## Quick Start

* Download and install the dependencies
`npm ci`
* Rename `example.env` file to `.env` and modify the P4PLAN_API_HOST, P4PLAN_USERNAME and P4PLAN_PASSWORD in with your login details (for the examples to work, user must have ADMIN access).
* With `node index.js` you can execute the go process which will connect to the API and run the requests
