export interface IResources {
  id: string;
  topicId: string;
  url: string;
  description: string;
  type: "video" | "article" | "pdf";
  createdAt: Date;
  updatedAt: Date;
}
