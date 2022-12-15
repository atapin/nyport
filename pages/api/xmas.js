export default function handler(req, res) {
  if (req.method === 'POST' && req.headers['secret'] == process.env.WEBHOOK_KEY) {
    console.log("POST request received");
    req.body['answer']['answers'].forEach(a => {
      console.log("Answer: ", a);
    });
    res.status(200).json({ message: 'OK' });
  } else {
    res.status(415);
  }
}