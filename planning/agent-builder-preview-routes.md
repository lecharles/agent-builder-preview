# Agent Builder & Preview — Routes Table

## Auth Routes (controllers/auth.js)

| Method | Route | Action | Description |
|--------|-------|--------|-------------|
| GET | /auth/sign-up | New | Show sign-up form |
| POST | /auth/sign-up | Create | Create new user account |
| GET | /auth/sign-in | New | Show sign-in form |
| POST | /auth/sign-in | Create | Authenticate user |
| GET | /auth/sign-out | Destroy | End user session |

## User Routes (controllers/user.js)

| Method | Route | Action | Description |
|--------|-------|--------|-------------|
| GET | /users/me | Show | Show user profile / dashboard |

## Skills Routes (controllers/skills.js)

| Method | Route | Action | Description |
|--------|-------|--------|-------------|
| GET | /skills | Index | List all skills for current user |
| GET | /skills/new | New | Show create skill form |
| POST | /skills | Create | Create new skill |
| GET | /skills/:id | Show | Show single skill details |
| GET | /skills/:id/edit | Edit | Show edit skill form (pre-filled) |
| PUT | /skills/:id | Update | Update existing skill |
| DELETE | /skills/:id | Destroy | Delete a skill |

## Agents Routes (controllers/agents.js)

| Method | Route | Action | Description |
|--------|-------|--------|-------------|
| GET | /agents | Index | List all agents (all users) |
| GET | /agents/new | New | Show create agent form |
| POST | /agents | Create | Create new agent |
| GET | /agents/:id | Show | Show single agent details |
| GET | /agents/:id/edit | Edit | Show edit agent form (pre-filled) |
| PUT | /agents/:id | Update | Update existing agent |
| DELETE | /agents/:id | Destroy | Delete an agent |

## Preview Routes (controllers/preview.js)

| Method | Route | Action | Description |
|--------|-------|--------|-------------|
| GET | /preview/:agentId | Show | Show preview page for an agent |
| POST | /preview/:agentId | Create | Send question to agent, get AI response |

## Homepage (defined in server.js)

| Method | Route | Action | Description |
|--------|-------|--------|-------------|
| GET | / | Index | Homepage with login/signup links |

## 404 Catch-All (defined in server.js)

| Method | Route | Action | Description |
|--------|-------|--------|-------------|
| ALL | * | — | Render error page for unmatched routes |
