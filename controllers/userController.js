const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).send({ message: 'User created.' });
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.send({ token });
    } catch (err) {
        res.status(400).send(err);
    }
};
