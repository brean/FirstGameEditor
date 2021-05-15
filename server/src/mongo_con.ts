import { MongoClient } from 'mongodb';


function initMongo() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect();
  return client;
}

export { initMongo };
