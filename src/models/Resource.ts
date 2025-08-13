import { BaseEntity } from "../core/BaseEntity";
import { IResource, ResourceType } from "./IResource";

export class Resource extends BaseEntity implements IResource {
  public topicId: string;
  public url: string;
  public description: string;
  public type: ResourceType;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(
    topicId: string,
    url: string,
    description: string,
    type: ResourceType,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super(id);
    this.topicId = topicId;
    this.url = url;
    this.description = description;
    this.type = type;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
