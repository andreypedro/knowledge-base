import { BaseEntity } from "../core/BaseEntity";
import { ITopic } from "./ITopic";

export class Topic extends BaseEntity implements ITopic {
  public name: string;
  public content: string;
  public version: number;
  public parentTopicId?: string | null = null;

  constructor(
    name: string,
    content: string,
    version = 1,
    parentTopicId?: string | null,
    id?: string,
    updatedAt?: Date
  ) {
    super(id);
    this.name = name;
    this.content = content;
    this.version = version;
    this.parentTopicId = parentTopicId;
    this.updatedAt = updatedAt ?? new Date();
  }
}
