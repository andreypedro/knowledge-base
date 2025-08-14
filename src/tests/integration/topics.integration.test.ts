import request from "supertest";
import app from "../../server";
import { db } from "../../config/db";
import { UserRole, IUser } from "../../models/IUser";

async function createUserAndGetToken(
  email: string,
  password: string,
  role: UserRole
) {
  const user: IUser = {
    id: Math.random().toString(36).substring(2),
    name: email.split("@")[0],
    email,
    password,
    role,
    createdAt: new Date(),
  };

  db.data.users.push(user);

  const res = await request(app).post("/auth/login").send({ email, password });

  return res.body.token;
}

describe("Integration: Topic permissions flow", () => {
  let adminToken: string;
  let viewerToken: string;
  let topicId: string;

  beforeAll(async () => {
    adminToken = await createUserAndGetToken(
      "admin_test@example.com",
      "adminpass",
      UserRole.ADMIN
    );
    viewerToken = await createUserAndGetToken(
      "viewer_test@example.com",
      "viewerpass",
      UserRole.VIEWER
    );
  });

  it("Admin can create topic", async () => {
    const res = await request(app)
      .post("/topics")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Integration Topic",
        content: "Test",
        parentTopicId: null,
      });

    expect(res.status).toBe(201);
    topicId = res.body.id;
  });

  it("Viewer cannot delete topic", async () => {
    const res = await request(app)
      .delete(`/topics/${topicId}`)
      .set("Authorization", `Bearer ${viewerToken}`);
    expect(res.status).toBe(403);
  });

  it("Viewer can retrieve topic", async () => {
    const res = await request(app)
      .get(`/topics/${topicId}`)
      .set("Authorization", `Bearer ${viewerToken}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Integration Topic");
  });

  it("Admin can delete topic", async () => {
    const res = await request(app)
      .delete(`/topics/${topicId}`)
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(204);
  });
});
