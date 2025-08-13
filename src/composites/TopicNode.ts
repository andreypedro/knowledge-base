import { Topic } from "../models/Topic";

export class TopicNode {
  constructor(public topic: Topic) {}
  private children: TopicNode[] = [];
  addChild(child: TopicNode) {
    this.children.push(child);
  }
  getChildren(): TopicNode[] {
    return this.children;
  }

  toTree(): any {
    const { topic, children } = this;
    return {
      id: topic.id,
      name: topic.name,
      content: topic.content,
      version: topic.version,
      children: children.map((child) => child.toTree()),
    };
  }
}
