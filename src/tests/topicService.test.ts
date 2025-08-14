import { topicService } from "../services/TopicService";
import { ITopic } from "../models/ITopic";

describe("TopicService", () => {
  it("should create a topic with version 1", async () => {
    const payload = {
      name: "Test Topic",
      content: "Test content",
      parentTopicId: null,
    };
    const topic = await topicService.create(payload);
    expect(topic).toHaveProperty("id");
    expect(topic.name).toBe("Test Topic");
    expect(topic.version).toBe(1);
  });

  it("should create a new version when topic is updated", async () => {
    const payload = {
      name: "Test Topic",
      content: "Updated content",
      parentTopicId: null,
    };

    const topicCreated = await topicService.create(payload);

    const topic = await topicService.update(topicCreated.id, payload);
    expect(topic).toHaveProperty("id");
    expect(topic.name).toBe("Test Topic");
    expect(topic.version).toBe(2);
  });

  it("should return a topic by id", async () => {
    const payload = {
      name: "Test Topic",
      content: "Test content",
      parentTopicId: null,
    };

    const topicCreated = await topicService.create(payload);

    const topic = await topicService.getById(topicCreated.id);
    expect(topic).toHaveProperty("id");
    expect(topic?.name).toBe("Test Topic");
  });

  it("should get the latest version of a topic", async () => {
    const payload = {
      name: "Test Topic",
      content: "Updated content",
      parentTopicId: null,
    };

    const topicCreated = await topicService.create(payload);

    const topic = await topicService.getLatestVersion(topicCreated.id);
    expect(topic).toHaveProperty("id");
    expect(topic?.name).toBe("Test Topic");
  });

  // TEST TOPIC TREE
  it("should get the topic tree", async () => {
    const payload = {
      name: "Test Topic",
      content: "Test content",
      parentTopicId: null,
    };

    const topicCreated = await topicService.create(payload);

    const tree = await topicService.getTree(topicCreated.id);

    expect(tree.topic.name).toBe("Test Topic");
    expect(tree.topic.content).toBe("Test content");
    expect(tree.topic.version).toBe(1);
    expect(tree.topic.parentTopicId).toBeNull();
  });

  // TESTE TOPIC SHORTEST PATH
  it("should get the shortest path between two topics", async () => {
    const payload1 = {
      name: "Test Topic 1",
      content: "Test content 1",
      parentTopicId: null,
    };

    const topic1 = await topicService.create(payload1);

    const payload2 = {
      name: "Test Topic 2",
      content: "Test content 2",
      parentTopicId: topic1.id,
    };

    const topic2 = await topicService.create(payload2);

    const shortestPath = await topicService.getShortestPath(
      topic1.id,
      topic2.id
    );

    expect(Array.isArray(shortestPath)).toBe(true);
    expect(shortestPath.length).toBeGreaterThan(0);
  });
});
