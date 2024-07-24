const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
    try {
        const { description, blogId } = req.body;
        const comment = await Comment.create({ description, userId: req.user.id, blogId });
        res.status(201).send(comment);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.findAll({ where: { blogId }, include: { model: User, as: 'user', attributes: ['username'] } });
        res.send(comments);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.update(req.body, { where: { id } });
        res.send(comment);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await Comment.destroy({ where: { id } });
        res.send({ message: 'Comment deleted.' });
    } catch (err) {
        res.status(400).send(err);
    }
};
