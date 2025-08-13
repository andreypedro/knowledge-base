import { db } from "../config/db";
import { ITopic } from "../models/ITopic";
import { Topic } from "../models/Topic";
import { TopicFactory } from "../factories/TopicFactory";
import { NotFoundError } from "../core/errors/NotFoundError";
import { TopicNode } from "../composites/TopicNode";
import { shortestPath } from "../utils/graph.utils";

export class TopicService {
  private readonly collection: ITopic[] = db.data?.topics ?? [];

  async create(
    payload: Omit<ITopic, "id" | "createdAt" | "updatedAt" | "version">,
    creatorUserId: string
  ): Promise<ITopic> {
    if (payload.parentTopicId) {
      const parent = await this.getLatestVersion(payload.parentTopicId);
      if (!parent) throw new NotFoundError("Parent topic not found");
    }

    const topic = TopicFactory.create({
      ...payload,
      version: 0,
    });
    const record: ITopic = {
      ...topic,
    };

    this.collection.push(record);
    return record;
  }

  public async getLatestVersion(topicId: string): Promise<ITopic | null> {
    const versions = this.collection
      .filter((t) => t.id === topicId)
      .sort((a, b) => b.version - a.version);
    return versions[0] ?? null;
  }

  async getById(id: string, version?: number): Promise<ITopic> {
    let topic: ITopic | undefined;
    if (version !== undefined) {
      topic = this.collection.find((t) => t.id === id && t.version === version);
    } else {
      topic = this.collection
        .filter((t) => t.id === id)
        .sort((a, b) => b.version - a.version)[0];
    }
    if (!topic) throw new NotFoundError("Topic not found");
    return topic;
  }

  async update(
    id: string,
    payload: Partial<
      Omit<ITopic, "id" | "createdAt" | "updatedAt" | "version">
    >,
    updaterUserId: string
  ): Promise<ITopic> {
    const latest = await this.getLatestVersion(id);
    if (!latest) throw new NotFoundError("Topic not found");

    if (
      payload.parentTopicId &&
      payload.parentTopicId !== latest.parentTopicId
    ) {
      const newParent = await this.getLatestVersion(payload.parentTopicId);
      if (!newParent) throw new NotFoundError("New parent topic not found");
    }

    const merged = {
      ...latest,
      ...payload,
    };

    const newVersion = TopicFactory.create({
      name: merged.name,
      content: merged.content,
      parentTopicId: merged.parentTopicId,
      version: latest.version,
    });

    const record: ITopic = {
      ...newVersion,
      id,
    };

    this.collection.push(record);
    return record;
  }

  async delete(id: string): Promise<void> {
    const exists = this.collection.some((t) => t.id === id);
    if (!exists) throw new NotFoundError("Topic not found");
    for (let i = this.collection.length - 1; i >= 0; i--) {
      if (this.collection[i].id === id) {
        this.collection.splice(i, 1);
      }
    }
  }

  async getTree(rootId: string): Promise<TopicNode> {
    const all = this.collection;

    const latestMap = new Map<string, ITopic>();
    all
      .sort((a, b) => a.version - b.version) // asc
      .forEach((t) => latestMap.set(t.id, t));

    if (!latestMap.has(rootId)) throw new NotFoundError("Root topic not found");

    const nodeMap = new Map<string, TopicNode>();
    latestMap.forEach((t) => {
      const node = new TopicNode(
        new Topic(
          t.name,
          t.content,
          t.version,
          t.parentTopicId,
          t.id,
          t.createdAt
        )
      );
      nodeMap.set(t.id, node);
    });

    let rootNode: TopicNode | undefined;

    nodeMap.forEach((node) => {
      const parentId = node.topic.parentTopicId;
      if (!parentId) {
        if (node.topic.id === rootId) rootNode = node;
        return;
      }
      const parentNode = nodeMap.get(parentId);
      parentNode?.addChild(node);
    });

    if (!rootNode) throw new NotFoundError("Root node could not be resolved");
    return rootNode;
  }

  async getShortestPath(fromId: string, toId: string): Promise<string[]> {
    const fromExists = this.collection.some((t) => t.id === fromId);
    const toExists = this.collection.some((t) => t.id === toId);

    if (!fromExists) throw new NotFoundError("Source topic not found");
    if (!toExists) throw new NotFoundError("Destination topic not found");

    return shortestPath(fromId, toId, async () => {
      const all = this.collection;
      const latest = new Map<string, ITopic>();
      all
        .sort((a, b) => a.version - b.version)
        .forEach((t) => latest.set(t.id, t));
      return Array.from(latest.values());
    });
  }
}

export const topicService = new TopicService();
