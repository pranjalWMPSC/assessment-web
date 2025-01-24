// ...existing code...

const getPrerenderParamsForInstructions = async () => {
  // Define your logic to fetch the parameters for prerendering instructions
  return [
    { id: '1' },
    { id: '2' },
    // ...other parameters for instructions
  ];
};

const getPrerenderParamsForBatches = async () => {
  // Define your logic to fetch the parameters for prerendering batches
  return [
    { tpEmail: 'example1@example.com' },
    { tpEmail: 'example2@example.com' },
    // ...other parameters for batches
  ];
};

// ...existing code...

module.exports = {
  // ...existing exports...
  getPrerenderParamsForInstructions,
  getPrerenderParamsForBatches,
  // ...existing exports...
};
