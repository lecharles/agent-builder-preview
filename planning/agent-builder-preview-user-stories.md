# Agent Builder & Preview — User Stories

## MVP User Stories

| Status | # | User Story For | As a... | I want to... | So that I can... |
|--------|---|---------------|---------|-------------|-----------------|
| Completed | 1 | Authentication | Guest | Sign up with a username, password, and agent language preference | Access the app |
| Completed | 2 | Authentication | Guest | Sign in with my credentials | Access my agents and skills |
| Completed | 3 | Authentication | User | Sign out | Keep my session secure |
| Completed | 4 | Skills CRUD | User | See all skills I've created | Manage them |
| Completed | 5 | Skills CRUD | User | Create a new skill with a name and description | Use it in my agents |
| Deferred | 6 | Skills CRUD | User | Have the app auto-generate an AI summary when I create a skill | Get a polished description without writing it myself |
| Completed | 7 | Skills CRUD | User | View the details of a single skill | Review its content |
| Completed | 8 | Skills CRUD | User | Edit a skill I created | Keep it up to date |
| Completed | 9 | Skills CRUD | User | Delete a skill I created | Remove skills I no longer need |
| Completed | 10 | Agents CRUD | User | See all agents I've created | Manage them |
| Completed | 11 | Agents CRUD | User | Create a new agent by giving it a name, selecting skills, choosing a personality, and adding custom personality notes | Build a configured agent |
| Deferred | 12 | Agents CRUD | User | Have the app auto-generate the agent's job description from loaded skills | Understand what the agent does without writing it myself |
| Completed | 13 | Agents CRUD | User | Edit an agent I created | Update its configuration |
| Completed | 14 | Agents CRUD | User | Delete an agent I created | Remove agents I no longer need |
| Completed | 15 | Agents CRUD | User | Toggle an agent's status on or off | Control which agents are active |
| Completed | 16 | Preview | User | Preview an agent by asking it a question and receiving a response in my selected language | Test my agent before deploying |
| Completed | 17 | Preview | User | Toggle a dev/admin view during preview to see the assembled system prompt | Understand how the agent is configured behind the scenes |
| Completed | 18 | Authorization | Guest | Be blocked from accessing any CRUD pages | — |
| Completed | 19 | Authorization | User | Only see edit/delete options on skills and agents I created | Not accidentally modify someone else's data |

## Stretch Goal User Stories

| Status | # | User Story For | As a... | I want to... | So that I can... |
|--------|---|---------------|---------|-------------|-----------------|
| Deferred | 20 | Preview | User | Have a multi-turn chat conversation with my agent during preview | Test longer interactions |
| Deferred | 21 | Preview | User | Have my agent search the web when answering questions | Get answers grounded in current information |
| Deferred | 22 | Settings | User | Add new languages beyond the default options | Use the app in more languages |

---

### Status Key
- **Completed** — Done and tested
- **Deferred** — Moved to roadmap / stretch goals
