import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { ITopics } from "../models/ITopic";
import { IResources } from "../models/IResource";
import { IUsers } from "../models/IUser";

type Schema = {
  topics: ITopics[];
  resources: IResources[];
  users: IUsers[];
};

const adapter = new FileSync<Schema>("data.json");
