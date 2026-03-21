import { MongoClient, type Db } from 'mongodb';

declare global {
  // eslint-disable-next-line no-var
  var __bourqueMongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoUri() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not configured');
  }

  return uri;
}

export async function getDatabase() {
  const uri = getMongoUri();

  if (!global.__bourqueMongoClientPromise) {
    const client = new MongoClient(uri);
    global.__bourqueMongoClientPromise = client.connect();
  }

  const connectedClient = await global.__bourqueMongoClientPromise;
  return connectedClient.db(process.env.MONGODB_DB || 'bourque-solutions');
}

export async function insertAssessmentSubmission<T extends { createdAt: string }>(
  payload: T,
  db?: Db,
) {
  const database = db ?? (await getDatabase());
  return database.collection('assessment_submissions').insertOne(payload);
}
