// services/genderizeService.js
const GENDERIZE_URL = "https://api.genderize.io";

async function fetchGender(name) {
  const res = await fetch(`${GENDERIZE_URL}/?name=${encodeURIComponent(name)}`);

  if (!res.ok) {
    const err = new Error("Upstream API error");
    err.isUpstream = true;
    throw err;
  }

  return res.json();
}

module.exports = { fetchGender };