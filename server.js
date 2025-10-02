const express = require('express');
const cors = require('cors');

require('dotenv').config();

const libroRoutes = require('./routes/libroRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/libros', libroRoutes);

app.get('/', (req, res) => {
    res.json({
        mensaje:"API BIBLIOTECA - CRUD"
    })
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);    
});