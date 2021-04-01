// app.js
const http = require("http");

const puppeteer = require("puppeteer");

// Create an instance of the http server to handle HTTP requests
let app = http.createServer(async (req, res) => {
  // Set a response type of plain text for the response
  res.writeHead(200, { "Content-Type": "text/plain" });

  let cardData;
  let url = "http:\/\/cz.uclbrt.com\/apiLogin\/?data=O0NYYPGhXj33i4ZrOwu18SEFWvXitUyPbnTV8FnhDYPJpRCprgOQc6OUVt4pxyt0ebG38i38OH1piUqo33JWWfK12y7dHLwiKmOlRqb59%2BnPQJVV0VlHsHfHYxvKrWnathwohZvs8NGYKIODSo1yiICvkvtrw1qVRna2LTSSHMS5BaLlmEuxhuIqc8%2FHrTIVg1AdYMwwPw%2Bl22OEshbS6%2BMETWZ9gHKy4YtS8%2FF649f02Jf7slaiAa%2Fi%2BVmEIAo6rhHJHrDDDTdNt%2Fk52%2BF5CnG4hrNscNgqtmacOmuCvyab%2FilaK4j92Gr4mfyiYQD8XhU%2FDFig%2BNjV%2BSmEh8hCsQ%3D%3D";

  const browser = await puppeteer.launch({
    // headless: false, devtools: true,
    headless: true,
  });
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on("request", (interceptedRequest) => {
    interceptedRequest.continue();
  });
  page.on("response", async (response) => {
    if (response.url() == "http://cz.uclbrt.com/Wap/Room/getQrcode") {
      console.log("XHR response received");
      console.log(await response.json());
      console.log("Url: " + response.url());
      cardData = await response.json();
    }
  });

  await page.goto(url);

  await page.close();
  await browser.close();

  // Send back a response and end the connection
  res.end(JSON.stringify(cardData));
});

// Start the server on port 3000
app.listen(3000, "localhost");
console.log("Node server running on port 3000");
