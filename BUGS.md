Bug 1:
Title: Update API allows empty body

Location:
PUT /tasks/:id (routes/tasks.js)

Expected Behavior:
API should return 400 when request body is empty

Actual Behavior:
API updates the task even when body is empty

Reason:
validateUpdateTask does not properly check for empty input

fix:
I added the Object.keys(body).length==0 with this it will reject the empty object