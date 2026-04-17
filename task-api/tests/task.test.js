const request = require("supertest");
const app = require("../src/app");


it("should get all tasks", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
});



it("should filter tasks by status",async()=>{

    await request(app).post("/tasks").send({ title: "Test", status: "high" });

    const res=await request(app).get("/tasks?status=todo");

    expect(res.statusCode).toBe(200);
});

it("should return paginated tasks",async()=>{
    
    const res=await request(app).get("/tasks?page=1&limit=1");
    expect(res.statusCode).toBe(200);
})

it("should return stats",async()=>{

    const res=await request(app).get("/tasks/stats");
    expect(res.statusCode).toBe(200);
})

it("should handle invalid query",async()=>{

    const res=await request(app).get("/tasks?page=abc&limit=xyz");
    expect(res.statusCode).toBe(200);
})

it("should create a new task",async()=>{

    const res=await request(app).post("/tasks").send({title:"New Task",priority:"high"});

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("New Task");
})

it("should fail if the title is missing",async()=>{

    const res=await request(app).post("/tasks").send({priority:"high"});

    expect(res.statusCode).toBe(400);
})

it("should update a task",async()=>{

    const create=await request(app).post("/tasks").send({title:"Task to update",priority:"medium"});

    const id=create.body.id;

    const res=await request(app).put(`/tasks/${id}`).send({title:"Updated task"});

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated task");
})

it("should delete a task",async()=>{

    const create=await request(app).post("/tasks").send({title:"Task to delete",priority:"medium"});

    const id=create.body.id;

    const res=await request(app).delete(`/tasks/${id}`);

    expect(res.statusCode).toBe(204);
})

it("should mark task as complete",async()=>{

    const create=await request(app).post("/tasks").send({title:"Task to complete",priority:"medium"});

    const id=create.body.id;

    const res=await request(app).patch(`/tasks/${id}/complete`);

    expect(res.statusCode).toBe(200);
})

it("should return 404 for invalid delete id",async()=>{

    const res=await request(app).delete("/tasks/1234");
    expect(res.statusCode).toBe(404);
})

it("should return 404 when completing invalid task",async()=>{

    const res=await request(app).patch("/tasks/1234/complete");
    expect(res.statusCode).toBe(404);
})

it("should fail when updating with empty data",async()=>{

    const create=await request(app).post("/tasks").send({title:"Test",priority:"medium"});

    const id=create.body.id;

    const res=await request(app).put(`/tasks/${id}`).send({});

    expect(res.statusCode).toBe(400);
})

it("should handle invalid pagination values",async()=>{

    const res=await request(app).get("/tasks?page=-1&limit=0");
    expect(res.statusCode).toBe(200);
})

it("should assign a task",async()=>{
    
    const create=await request(app).post("/tasks").send({title:"Assign me",priority:"medium"});

    const id=create.body.id;

    const res=await request(app).patch(`/tasks/${id}/assign`).send({assignee:"Mohit"});

    expect(res.statusCode).toBe(200);
    expect(res.body.assignee).toBe("Mohit");
})

it("should return 404 when task not found",async()=>{

    const res=await request(app).patch("/tasks/1234/assign").send({assignee:"Mohit"});

    expect(res.statusCode).toBe(404);
})

it("should fail if assignee is empty",async()=>{

    const create=await request(app).post("/tasks").send({title:"test",priority:"high"});

    const id=create.body.id;

    const res=await request(app).patch(`/tasks/${id}/assign`).send({assignee:""});

    expect(res.statusCode).toBe(400);
})