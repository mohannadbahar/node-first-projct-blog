const express = require('express');
const sequelize = require('./config/database');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');

dotenv.config();

const app = express();
app.use(express.json());

sequelize.sync()
    .then(() => console.log('Database connected and synchronized'))
    .catch(err => console.log('Error: ' + err));

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
