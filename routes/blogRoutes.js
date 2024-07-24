const express = require('express');
const { auth, isAdmin } = require('../middleware/auth');
const { createBlog, getBlogs, updateBlog, deleteBlog } = require('../controllers/blogController');
const router = express.Router();

router.post('/', auth, isAdmin, createBlog);
router.get('/', getBlogs);
router.put('/:id', auth, isAdmin, updateBlog);
router.delete('/:id', auth, isAdmin, deleteBlog);

module.exports = router;
