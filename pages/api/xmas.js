import axios from "axios";


const imageIpfs = "ipfs://bafybeigmbk6mbhfzuvfewzn5x2p4tmyc4ffenx3avflhr7qxjb6mh5iisi"

const metaJson = (score) => {
  return {
    title: "NFTPort Read API Christmas '22",
    type: "object",
    properties: {
      name: "NFTPort Read API Christmas '22",
      description: "Gift from Read API team",
      "file_url": "ipfs://bafybeigmbk6mbhfzuvfewzn5x2p4tmyc4ffenx3avflhr7qxjb6mh5iisi",
      attributes: [
        {
          "trait_type": "Score",
          "display_type": "number",
          "value": score
        }
      ]
    }
  }
}

const uploadMetaUrl = "https://api.nftport.xyz/v0/metadata"
const auth = { headers: { 'Authorization': 'process.env.NFTPORT_KEY' } }

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log("POST request received");
    if (req.headers['secret'] === process.env.WEBHOOK_KEY) {
      console.log("Webhook key is valid");
      let answer = req.body['answer']
      let points = Math.round(answer['point']['tp'] * 3600 / answer['completeSecond'])
      let meta = metaJson(points)

      axios.post(uploadMetaUrl, meta, auth).then(res => {
        let ipfs = res.data['metadata_uri']

        axios.post("https://api.nftport.xyz/v0/mints/customizable", {
          chain: "goerli",
          metadata_uri: ipfs,
          contract_address: "0x6ebd10ab3b39d8e2ce52f253b56b758aa830365b",
          mint_to_address: "0xfE011b3a7d2E394D1207e68b25f4012C0012044C"
        }, auth).then(res => {
          console.log("Mint:", res.data);

        })
      })


      res.status(200).json({ message: 'OK' });
    } else {
      res.status(403);
    }
  } else {
    res.status(415);
  }
}