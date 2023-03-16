import { Post } from './models.js';

const getPost = (_req, res) => {
  return Post.find()
    .then((posts) => res.status(200).json({ posts }))
    .catch((error) => res.status(500).json({ error }));
};

const createPost = (req, res, _next) => {
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
};

const updatePost = (req, res, _next) => {
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
};

const deletePost = (req, res, _next) => {
  const id = req.params.id;

  return Post.findByIdAndDelete(id)
    .then((post) =>
      post
        ? res.status(201).json({ message: 'Post deleted' })
        : res.status(404).json({ message: 'Post not found.' })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { getPost, createPost, updatePost, deletePost };
