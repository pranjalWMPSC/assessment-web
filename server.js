const express = require('express');
const { getPrerenderParamsForInstructions, getPrerenderParamsForBatches } = require('./server-routing-config');
// ...existing imports...

const app = express();

// ...existing middleware...

// Prerendering middleware
app.use((req, res, next) => {
  if (req.path.startsWith('/instructions/')) {
    getPrerenderParamsForInstructions().then(params => {
      req.prerenderParams = params;
      next();
    }).catch(next);
  } else if (req.path.startsWith('/batches/')) {
    getPrerenderParamsForBatches().then(params => {
      req.prerenderParams = params;
      next();
    }).catch(next);
  } else {
    next();
  }
});

// ...existing routes...

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ...existing code...

module.exports = app;
