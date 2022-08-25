import crypto from "crypto";
import client from "./axiosHelper.js";
import "dotenv/config";

const partnerId = process.env.PARTNER_ID;
const partnerSecretKey = process.env.PARTNER_SECRET_KEY;
const time = Math.round(Date.now() / 1000);
const concatenated_string = partnerId + time + partnerSecretKey;
const accessKey = crypto
  .createHash("sha1")
  .update(concatenated_string)
  .digest("hex");

const getJwtTokenRequest = async () => {
  console.log("Buscando o token...");
  try {
    const response = await client.post("/authorization", {
      partnerId,
      time,
      accessKey,
    });
    console.log("Token adquirido com sucesso! \n");
    return response.data.data.token;
  } catch (err) {
    console.error(err.code);
    const status = err.response.status;
    const statusText = err.response.statusText;
    console.table({
      status,
      statusText,
    });
  }
};

export default getJwtTokenRequest;
