const express = require('express');
const cors = require('cors');

require("dotenv").config();
require('./config/db');

const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employee');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
