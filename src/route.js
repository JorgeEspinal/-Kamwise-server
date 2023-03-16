import express from 'express';
import controller from './controller.js';

const router = express.Router();

router.get('/', controller.getPost);
router.post('/', controller.createPost);
router.put('/:id', controller.updatePost);
router.delete('/:id', controller.deletePost);

export default router;
