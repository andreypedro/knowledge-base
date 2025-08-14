import { db } from "../config/db";
import { IResource } from "../models/IResource";
import { Resource } from "../models/Resource";
import { ResourceFactory } from "../factories/ResourceFactory";
import { TopicService } from "./TopicService";
import { NotFoundError } from "../core/errors/NotFoundError";

export class ResourceService {
  private readonly collection: IResource[] = db.data?.resources ?? [];
  private readonly topicService = new TopicService();

  async create(
    payload: Omit<IResource, "id" | "createdAt" | "updatedAt">
  ): Promise<IResource> {
    const topicExists = await this.topicService.getLatestVersion(
      payload.topicId
    );
    if (!topicExists) throw new NotFoundError("Topic not found");

    // URL validation
    if (!/^https?:\/\/.+/.test(payload.url)) {
      throw new Error("Invalid URL format");
    }

    const resource = ResourceFactory.create(payload);
    const record: IResource = {
      ...resource,
    };
    this.collection.push(record);
    return record;
  }

  async getById(id: string): Promise<IResource> {
    const res = this.collection.find((r: IResource) => r.id === id);
    if (!res) throw new NotFoundError("Resource not found");
    return res;
  }

  async listByTopic(topicId: string): Promise<IResource[]> {
    return this.collection.filter((r: IResource) => r.topicId === topicId);
  }

  async delete(id: string): Promise<void> {
    const exists = this.collection.some((t) => t.id === id);
    if (!exists) throw new NotFoundError("Resource not found");
    this.collection.splice(
      this.collection.findIndex((t) => t.id === id),
      1
    );
  }
}

export const resourceService = new ResourceService();
