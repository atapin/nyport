export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log("POST request received");
    if (req.headers['secret'] === process.env.WEBHOOK_KEY) {
      console.log("Webhook key is valid");
      req.body['answer']['answers'].forEach(a => {
        console.log("Answer: ", a);
      });
      res.status(200).json({ message: 'OK' });
    } else {
      res.status(403);
    }
  } else {
    res.status(415);
  }
}