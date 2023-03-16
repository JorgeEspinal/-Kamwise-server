import express from 'express';
import mongoose from 'mongoose';
const app = express();
const url = `mongodb+srv://test:Q6XVkuxvOgfF4tDd@cluster0.tqwpbbv.mongodb.net/?retryWrites=true&w=majority`;
const port = 3000;

const { Schema } = mongoose;

const postSchema = new Schema({ title: String, description: String });
const Post = mongoose.model('Post', postSchema);

mongoose
  .connect(url, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log('Connected');
  })
  .catch((error) => {
    console.log('ERROR MONGODB');
    console.log(error);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

app.get('/', (req, res) => {
  return Post.find()
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => res.status(500).json({ error }));
});

app.post('/', (req, res, _next) => {
  const data = req.body;
  const post = new Post({ ...data });

  post
    .save()
    .then((dataSave) => {
      res.status(201).json(dataSave);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

app.put('/:id', (req, res, _next) => {
  const id = req.params.id;

  return Post.findById(id)
    .then((post) => {
      if (post) {
        post.set({ ...req.body });

        return post
          .save()
          .then((dataSave) => res.status(201).json(dataSave))
          .catch((error) => res.status(500).json({ error }));
      } else res.status(404).json({ message: 'Post not found' });
    })
    .catch((error) => res.status(500).json({ error }));
});

app.delete('/:id', (req, res, _next) => {
  const id = req.params.id;

  return Post.findByIdAndDelete(id)
    .then((post) =>
      post
        ? res.status(201).json({ message: 'Post deleted' })
        : res.status(404).json({ message: 'Post not found.' })
    )
    .catch((error) => res.status(500).json({ error }));
});

app.use((_req, res, _next) => {
  const error = new Error('Not found resource');

  return res.status(404).json({ message: error.message });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
