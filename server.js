const axios = require("axios").create({
  httpsAgent: new require("https").Agent({ rejectUnauthorized: false }),
});
const express = require("express");
const app = express();
app.use(express.json());
const port = 80;

app.get("/", async (req, res) => {
  res.json({
    Api: "1.0",
    Engineer: "Luis Nt",
    Now: new Date(),
    uses: {
      head: "url: https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena",
      query: "/proxy?url=https://e-svt.herokuapp.com",
      body: " { url : https://e-svt.herokuapp.com } ",
    },
  });
});

app.get("/proxy", async (req, res) => {
  const { headers: head, query, body } = req;
  const url = head["url"] || query["url"] || body["url"];

  const { status, statusText, headers, data } = await axios.get(url);
  res.json({
    head,
    status,
    statusText,
    data,
  });
});

app.listen(port, () => {
  console.log(`App proxy listening on port ${port}`);
});
