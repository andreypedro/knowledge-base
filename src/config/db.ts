import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { ITopic } from "../models/ITopic";
import { IResource } from "../models/IResource";
import { IUser } from "../models/IUser";
import { mockData } from "../data/mockData";

export type Schema = {
  topics: ITopic[] | [];
  resources: IResource[] | [];
  users: IUser[] | [];
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
