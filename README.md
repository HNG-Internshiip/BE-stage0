# Genderize Classifier API

A REST API that integrates with [Genderize.io](https://genderize.io) to classify names by gender and return a structured, processed response.

## Stack
- Node.js
- Express.js
- Deployed on Vercel

## Project Structure

```
├── server.js                       # Entry point
├── vercel.json                     # Vercel deployment config
├── package.json
├── middleware/
│   └── cors.js                     # CORS headers
├── routes/
│   └── classify.js                 # Route definitions
├── controllers/
│   └── classifyController.js       # Request validation & response
├── services/
│   └── genderizeService.js         # Genderize API integration
└── utils/
    └── processGenderData.js        # Data transformation logic
```

## Endpoint

### `GET /api/classify?name={name}`

Classifies a name by gender using the Genderize API.

**Query Parameters**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | The name to classify |

**Success Response (200)**
```json
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-01T12:00:00.000Z"
  }
}
```

**Error Responses**
| Status | Reason |
|--------|--------|
| 400 | Missing or empty `name` parameter |
| 422 | `name` is not a string |
| 200 (error body) | No prediction available for the provided name |
| 500 | Internal server error |
| 502 | Upstream Genderize API failure |

All errors follow this structure:
```json
{ "status": "error", "message": "<error message>" }
```

## Confidence Logic

`is_confident` is `true` only when **both** conditions are met:
- `probability >= 0.7`
- `sample_size >= 100`

## Run Locally

```bash
# Install dependencies
npm install

# Start the server
npm start

# Server runs on http://localhost:3000
```

## Test the Endpoint

```bash
# Happy path
curl "http://localhost:3000/api/classify?name=john"

# Missing parameter
curl "http://localhost:3000/api/classify"

# Empty parameter
curl "http://localhost:3000/api/classify?name="

# Unknown name (edge case)
curl "http://localhost:3000/api/classify?name=xyzxyz123"
```

## Deployment (Vercel)

1. Push this repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Vercel auto-detects the `vercel.json` config — no extra setup needed
4. Your live base URL will be `https://your-project.vercel.app`