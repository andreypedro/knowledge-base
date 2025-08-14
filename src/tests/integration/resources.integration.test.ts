import request from "supertest";
import app from "../../server";
import { db } from "../../config/db";
import { ResourceService } from "../../services/ResourceService";
import { TopicService } from "../../services/TopicService";
import { AuthService } from "../../services/AuthService";

describe("ResourceController Integration Tests", () => {
  let topic: any;
  let token: string;

  beforeAll(async () => {
    const authService = new AuthService();
    token = await authService.authenticate("admin@example.com", "admin");

    const topicService = new TopicService();
    topic = await topicService.create({
      name: "Integration Test Topic",
      content: "Test Content",
      parentTopicId: null,
    });
  });

  it("should create a resource", async () => {
    const payload = {
      url: "https://example.com",
      topicId: topic.id,
      description: "Test resource",
      type: "article",
    };

    const response = await request(app)
      .post("/resources")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .expect(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.description).toBe("Test resource");
    expect(response.body.url).toBe("https://example.com");
    expect(response.body.topicId).toBe(topic.id);
  });

  it("should get a resource by id", async () => {
    const resourceService = new ResourceService();
    const resource = await resourceService.create({
      url: "https://example.com/2",
      topicId: topic.id,
      description: "Another resource",
      type: "article",
    });

    const response = await request(app)
      .get(`/resources/${resource.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.id).toBe(resource.id);
    expect(response.body.description).toBe("Another resource");
  });

  it("should list resources by topic", async () => {
    const response = await request(app)
      .get(`/topics/${topic.id}/resources`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    response.body.forEach((r: any) => expect(r.topicId).toBe(topic.id));
  });

  it("should delete a resource", async () => {
    const resourceService = new ResourceService();
    const resource = await resourceService.create({
      url: "https://delete.com",
      topicId: topic.id,
      description: "To be deleted",
      type: "article",
    });

    await request(app)
      .delete(`/resources/${resource.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    await expect(resourceService.getById(resource.id)).rejects.toThrow(
      "Resource not found"
    );
  });
});
