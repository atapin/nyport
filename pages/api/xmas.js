// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// POST handler for /api/xmas (see pages/api/xmas.js)
export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log("POST request received", req.body, req.headers)
    res.status(200).json({ message: 'OK' })
  } else {
    res.status(415)
  }
}