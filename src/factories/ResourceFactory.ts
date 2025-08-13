import { IResource } from "../models/IResource";
import { Resource } from "../models/Resource";

export class ResourceFactory {
  static create(
    payload: Omit<IResource, "id" | "createdAt" | "updatedAt">
  ): Resource {
    const { topicId, url, description, type } = payload;

    return new Resource(topicId, url, description, type);
  }
}
