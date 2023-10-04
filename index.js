
// farjanur152956
// 9CCP8t8r3L8HMEmG

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  'mongodb+srv://farjanur152956:9CCP8t8r3L8HMEmG@cluster0.ry4vt7x.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectToDatabase();

const database = client.db('usersDB');
const userCollection = database.collection('users');

app.get('/users', async(req, res) =>{
  const cursor = userCollection.find()
  const result = await cursor.toArray();
  res.send(result);
})

app.get('/users/:id', async(req, res) => {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)}
  const user = await userCollection.findOne(query)
  res.send(user);
})

app.post('/users', async (req, res) => {
  const user = req.body;
  console.log('New user:', user);

  try {
    const result = await userCollection.insertOne(user);
    res.json(result);
  } catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/users/:id', async(req, res) =>{
  const id = req.params.id;
  const updatedUser = req.body;
  console.log(id, updatedUser);

  const filter = {_id: new ObjectId(id)}
  const options = {upsert: true}
})


app.delete('/users/:id', async(req, res) =>{
  const id = req.params.id;
  console.log('please delete from database', id);
  const query = { _id: new ObjectId(id)}
  const result = await userCollection.deleteOne(query);
  res.send(result)
})


app.get('/', (req, res) => {
  res.send('Simple CRUD is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
