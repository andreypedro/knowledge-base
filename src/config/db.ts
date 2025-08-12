import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

type Schema = {
  topics: ITopics[];
  resources: IResources[];
  users: IUsers[];
};

const adapter = new FileSync<Schema>("data.json");
