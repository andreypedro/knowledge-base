import { ITopic } from "../models/ITopic";
import { Topic } from "../models/Topic";

export class TopicFactory {
  static create(
    payload: Omit<ITopic, "id" | "createdAt" | "updatedAt">
  ): ITopic {
    const version = payload ? payload.version + 1 : 1;
    return new Topic(
      payload.name,
      payload.content,
      version,
      payload.parentTopicId
    );
  }
}
