const https = require("https");
const crypto = require("crypto");

const PARTNER_ID = "70925";
const PARTNER_SECRET_KEY =
  "1bfea6220379a49f0351e36c540a7b74e4b8a947bd3778ff83579f96ee4792e2";
const TIME = Math.round(Date.now() / 1000);
const concatenated_string = PARTNER_ID + TIME + PARTNER_SECRET_KEY;
const accessKey = crypto
  .createHash("sha1")
  .update(concatenated_string)
  .digest("hex");

const objectData = {
  email: "testeapi@gmail.com",
  firstName: "teste",
  lastName: "api",
  phone: "81997125665",
};
const data = JSON.stringify(objectData);

const options = {
  hostname: "vctrade.pandats-api.io",
  port: 443,
  path: "/api/v3/leads",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessKey}`,
  },
};

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.write(data);
req.end();
