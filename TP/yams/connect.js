"use strict";

import { MongoClient } from "mongodb" ;

const DB_COLLECTION="patries";
const DB_NAME="game";
const DB_URI="mongodb://localhost:27017";

export const client = new MongoClient(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const run = async () => {
  try {
    const connect = await client.connect();
    const collection = await client.db(DB_NAME).collection(DB_COLLECTION);
    console.log("Connected successfully to server");

    return collection;

  } catch (e) {
    console.error('Bad connect ...', e);
    client.close();
  }
};