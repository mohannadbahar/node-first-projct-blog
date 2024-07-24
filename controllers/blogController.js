const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.create({ title, content, authorId: req.user.id });
        res.status(201).send(blog);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({ include: { model: User, as: 'author', attributes: ['username'] } });
        res.send(blogs);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.update(req.body, { where: { id } });
        res.send(blog);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        await Blog.destroy({ where: { id } });
        res.send({ message: 'Blog deleted.' });
    } catch (err) {
        res.status(400).send(err);
    }
};
