var fs = require("fs");
const crypto = require("crypto");


fs.readFileSync("./public.pem", "utf-8");

// Creating a function to encrypt string
function encryptString(plaintext, publicKeyFile) {
  // const publicKey = fs.readFileSync(publicKeyFile, "utf8");
  let publicKey = "-----BEGIN PUBLIC KEY-----\n" +
				"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqxqOJg0kqL4/xoNf0iDb\n"+
				"jz/oM7ujsXOd92vQDkwO/rCP9wwZY0AvrMhcc56X4LmIbsbc1EZQ5ryMrIDbyCgt\n"+
				"pgJJTQG/u/FBiwG2Yvqgx+9keVGZhBA+Oph34HFPWz4OEB+Py4QkaJPXALkjjh2Z\n"+
				"f7Lgpv5gO8gRyg/o9FwCOZyEGiUmVorwPvwT3oMeNPCHxzlpGzdqV1kfqNmbS4Zk\n"+
				"CiXGNhxxN0LJDnhaJJUl4bcnUjpcIxUlgSMX2CcooffIk3E1ROP051Xf/zmUWE6D\n"+
				"TcGetf6ni2s2irDCgeanylyjLTgM6xaOYWqtG0yUC5lyzO46yTmE1Q47XMM2h1KJ\n"+
				"swIDAQAB\n"+
				"-----END PUBLIC KEY-----";
  // publicEncrypt() method with its parameters
 
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(plaintext)
  );
  return encrypted;
}

let data =
  "id=98651082ab89c3f1b50f35caf794179f&token=e687bc93c89b9b59611de521a70ed4&communityNo=1316879946&time=1617252884&mobile=13316107997&areaCode=86&cardNo=EwNXzAmWrgPkoq67&cardType=0";
const encrypted = encryptString(data, "./public.pem");



let url = "http://cz.uclbrt.com/apiLogin/?data=" + encodeURIComponent(encrypted.toString("base64"));

console.log(url);

const puppeteer = require('puppeteer');

(async (url) => {
    const browser = await puppeteer.launch({ // headless: false, devtools: true,
      headless: true
    });
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', interceptedRequest => {
      interceptedRequest.continue();
    });
    page.on('response', async (response) => {
      if (response.url() == "http://cz.uclbrt.com/Wap/Room/getQrcode"){
            console.log('XHR response received'); 
            console.log(await response.json()); 
            console.log('Url: ' + response.url());
        } 
    });

    await page.goto(url);

    await page.close();
    await browser.close();
})(url);

