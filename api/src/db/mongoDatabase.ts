// deno-lint-ignore-file no-explicit-any
import { DataBase } from "./db.ts";
import MongoDb from "../helper/mongodb.ts";
import { Bson } from "../../deps.ts";
import { Todo, TodoUpdate } from "../model/todoModel.ts";
import { isValidMongoId } from "../helper/validation.ts";

export class MongoDatabase implements DataBase {
  public mongoDb: any;

  async initDb(collectionName: string) {
    const mongoDbInstance = await MongoDb.getInstance();
    this.mongoDb = mongoDbInstance.getDataBase.collection(collectionName);
  }

  async getAll() {
    return await this.mongoDb.find().toArray();
  }

  async get(id: string) {
    return await this.mongoDb.findOne({ _id: new Bson.ObjectId(id) });
  }

  async insertOne(todo: Todo) {
    return await this.mongoDb.insertOne(todo);
  }

  async updateOne(id: string, todo: TodoUpdate) {
    return await this.mongoDb.updateOne(
      {
        _id: new Bson.ObjectId(id),
      },
      {
        $set: todo,
      }
    );
  }

  async deleteOne(id: string) {
    return await this.mongoDb.deleteOne({ _id: new Bson.ObjectId(id) });
  }

  async getTodoOrder() {
    return await this.mongoDb
      .aggregate([
        {
          $project: {
            results: {
              $reduce: {
                input: "$data",
                initialValue: [],
                in: {
                  collapsed: {
                    $concatArrays: ["$$value.collapsed", "$$this"],
                  },
                  firstValues: {
                    $concatArrays: [
                      "$$value.firstValues",
                      {
                        $slice: ["$$this", 1],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          $lookup: {
            from: "todo",
            localField: "results.collapsed._id",
            foreignField: "_id",
            as: "results.data",
          },
        },
        {
          $project: {
            results: {
              collapsed: 0,
            },
          },
        },
      ])
      .toArray();
  }

  async updateTodoOrders(todoDorder: any) {
    //delete all before inserting
    this.mongoDb.deleteMany({});
    return await this.mongoDb.insertOne(todoDorder);
  }

  validateId(id: string) {
    return isValidMongoId(id);
  }
}
