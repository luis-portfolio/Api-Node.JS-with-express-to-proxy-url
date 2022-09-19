const httpsAgent = new require("https").Agent({ rejectUnauthorized: false });
const con = { httpsAgent };
const axios = require("axios").create(con);
const express = require("express");
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const SAMPLE_URL = "https://swapi.dev/api/people/1";

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
  const url = head["url"] || query["url"] || body["url"] || "https://swapi.dev/api/people/1";

  try {
  const response = await axios.get(url);
    const { status, statusText, data } = response;
    res.json({ status, statusText, data });
  } catch (error) {
    const response = error.toJSON()
    const status = response["status"];
    const statusText = response["message"];
    const data = response["data"];
    console.error({ response });
    res.json({ status, statusText, data });
  }
});

const PORT = process.env.PORT || "8080";

app.listen(PORT, () => {
  console.log("App proxy listening on port", PORT);
});
