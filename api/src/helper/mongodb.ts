import { MongoClient } from "../../deps.ts";

class MongoDatabase {
  public client: MongoClient;
  private static instance: MongoDatabase;
  public url: string;
  public dbName: string;

  constructor() {
    const MONGO_URL = Deno.env.get("MONGO_URL") || "mongodb://localhost:27017";
    console.log("connecting to mongo");
    this.dbName = "todos";
    this.url = MONGO_URL;
    this.client = {} as MongoClient;
  }

  async connect() {
    const clientInstance = new MongoClient();
    // Connecting to a Local Database
    await clientInstance.connect(this.url);
    this.client = clientInstance;
  }

  get getDataBase() {
    return this.client.database(this.dbName);
  }

  static async getInstance(): Promise<MongoDatabase> {
    if (MongoDatabase.instance) {
      return MongoDatabase.instance;
    }

    MongoDatabase.instance = new MongoDatabase();
    await MongoDatabase.instance.connect();

    return MongoDatabase.instance;
  }
}

export default MongoDatabase;
