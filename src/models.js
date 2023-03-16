import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({ title: String, description: String });
const Post = mongoose.model('Post', postSchema);

export default Post;
