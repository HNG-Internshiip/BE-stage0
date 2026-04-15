const express = require('express');
const serverless = require('serverless-http');

const cors = require('../middleware/cors');
const classifyRoutes = require('../routes/classify');

const app = express();

// middleware
app.use(cors);

// routes
app.use('/api', classifyRoutes);

// health check
app.get('/', (req, res) => {
	res.json({ message: 'API working 🚀' });
});

if (require.main === module) {
  app.listen(3000, () => console.log('Running locally on 3000'));
}

module.exports = serverless(app);