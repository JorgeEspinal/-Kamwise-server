import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: String,
    description: String,
  },
  { timestamps: true }
);

export const Post = mongoose.model('Post', postSchema);
