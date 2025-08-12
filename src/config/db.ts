import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { ITopics } from "../models/ITopic";
import { IResources } from "../models/IResource";
import { IUsers } from "../models/IUser";
import { mockData } from "../data/mockData";

export type Schema = {
  topics: ITopics[] | [];
  resources: IResources[] | [];
  users: IUsers[] | [];
};

const defaultData: Schema = mockData;

const adapter = new JSONFile<Schema>("../data/db.json");
export const db = new Low<Schema>(adapter, defaultData);

export async function initDb() {
  await db.read();
  if (!db.data) {
    db.data = defaultData;
    await db.write();
  }
}
