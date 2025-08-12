export interface ITopics {
  id: string;
  name: string;
  content: string;
  version: number;
  parentTopicId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
