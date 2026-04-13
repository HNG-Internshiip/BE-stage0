// utils/processGenderData.js
function processGenderData(name, payload) {
  const { gender, probability, count } = payload;

  if (!gender || count === 0) {
    return {
      status: 200,
      body: { status: "error", message: "No prediction available for the provided name" },
    };
  }

  const sample_size = count;
  const is_confident = probability >= 0.7 && sample_size >= 100;
  const processed_at = new Date().toISOString();

  return {
    status: 200,
    body: {
      status: "success",
      data: {
        name: name.toLowerCase(),
        gender,
        probability,
        sample_size,
        is_confident,
        processed_at,
      },
    },
  };
}

module.exports = { processGenderData };