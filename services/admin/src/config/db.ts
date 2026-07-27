import { MongoClient, Db } from "mongodb";

let client: MongoClient;
let db: Db;

export const connectDb = async (): Promise<Db> => {
  if (db) return db;

  client = new MongoClient(process.env.MONGO_URI!, {
    serverSelectionTimeoutMS: 5000,
    family: 4, // Force IPv4
  });
  await client.connect();

 db = client.db(process.env.DB_NAME);

console.log("Admin service connected to mongodb");
console.log("DATABASE:", db.databaseName);

const collections = await db.listCollections().toArray();
console.log(
  "COLLECTIONS:",
  collections.map((c) => c.name)
);

  return db;
};
