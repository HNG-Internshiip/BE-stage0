// controllers/classifyController.js
const { fetchGender } = require("../services/genderizeService");
const { processGenderData } = require("../utils/processGenderData");

module.exports = async (req, res) => {
  const { name } = req.query;

  if (name === undefined || name === "") {
    return res.status(400).json({ status: "error", message: "Missing or empty name parameter" });
  }

  if (typeof name !== "string") {
    return res.status(422).json({ status: "error", message: "name must be a string" });
  }

  try {
    const raw = await fetchGender(name);
    const result = processGenderData(name, raw);
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.error(err);
    const status = err.isUpstream ? 502 : 500;
    const message = err.isUpstream ? "Upstream API returned an unexpected response" : "Internal server error";
    return res.status(status).json({ status: "error", message });
  }
};