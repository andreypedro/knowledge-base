import { resourceService } from "../services/ResourceService";
import { topicService } from "../services/TopicService";
import { ResourceType } from "../models/IResource";

describe("ResourceService", () => {
  let topic: any;

  beforeAll(async () => {
    topic = await topicService.create({
      name: "Topic for Resource",
      content: "Content",
      parentTopicId: null,
    });
  });

  it("should create a resource", async () => {
    const payload = {
      url: "https://example.com",
      topicId: topic.id,
      description: "Test resource",
      type: "article" as ResourceType,
    };
    const resource = await resourceService.create(payload);
    expect(resource).toHaveProperty("id");
    expect(resource.description).toBe("Test resource");
    expect(resource.url).toBe("https://example.com");
    expect(resource.topicId).toBe(topic.id);
  });

  it("should not create a resource with invalid URL", async () => {
    const payload = {
      url: "invalid-url",
      topicId: topic.id,
      description: "Test resource",
      type: "article" as ResourceType,
    };
    await expect(resourceService.create(payload)).rejects.toThrow(
      "Invalid URL format"
    );
  });

  it("should get a resource by id", async () => {
    const payload = {
      url: "https://example.com/2",
      topicId: topic.id,
      description: "Another resource",
      type: "article" as ResourceType,
    };
    const created = await resourceService.create(payload);
    const found = await resourceService.getById(created.id);
    expect(found.id).toBe(created.id);
    expect(found.description).toBe("Another resource");
  });

  it("should list resources by topic", async () => {
    const resources = await resourceService.listByTopic(topic.id);
    expect(Array.isArray(resources)).toBe(true);
    expect(resources.length).toBeGreaterThan(0);
    resources.forEach((r) => expect(r.topicId).toBe(topic.id));
  });

  it("should delete a resource", async () => {
    const payload = {
      url: "https://delete.com",
      topicId: topic.id,
      description: "To be deleted",
      type: "article" as ResourceType,
    };
    const created = await resourceService.create(payload);
    await resourceService.delete(created.id);
    await expect(resourceService.getById(created.id)).rejects.toThrow(
      "Resource not found"
    );
  });
});
