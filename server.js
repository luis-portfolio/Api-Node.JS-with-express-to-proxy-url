const httpsAgent = new require("https").Agent({ rejectUnauthorized: false });
const axios = require("axios").create({ httpsAgent });
const express = require("express");
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const SAMPLE_URL = "https://swapi.dev/api/people/1"

app.get("/", async (req, res) => {
  res.json({
    Api: "1.0.7",
    Engineer: "Luis Nt",
    Now: new Date(),
    uses: {
      head: `url: ${SAMPLE_URL}`,
      query: `/proxy?url=${SAMPLE_URL}`,
      body: ` { url : ${SAMPLE_URL} } `,
    },
  });
});

app.get("/proxy", async (req, res) => {
  const { headers: head, query, body } = req;
  const url = head["url"] || query["url"] || body["url"];
  const { status, statusText, data } = await axios.get(url);
  res.json({status, statusText, data })
});

const PORT = process.env.PORT || "8080";

app.listen(PORT, () => {
  console.log('App proxy listening on port', PORT);
});

