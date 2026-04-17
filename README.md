## What I did

- Added unit and integration tests using Jest & Supertest
- Identified bugs and documented them in BUGS.md
- Fixed a validation bug in update API
- Implemented PATCH /tasks/:id/assign endpoint

## Design Decisions

- Used PATCH for partial update
- Added validation for assignee
- Returned 404 for invalid task ID

## What I’d do next

- Add database instead of in-memory store
- Add authentication
- Improve validation coverage