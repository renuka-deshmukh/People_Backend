const express = require('express')
const cors = require('cors');
const peopleRoute = require('./routes/peopleRoute');
require("dotenv").config()


const app = express()
const PORT = process.env.PORT || 7000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/people', peopleRoute)
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))