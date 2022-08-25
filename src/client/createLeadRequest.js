import client from "./axiosHelper.js";

const createLeadRequest = async (body, jwtToken) => {
  try {
    const response = await client.post("/leads", body, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    return response;
  } catch (err) {
    const payload = err.config.data;
    const status = err.response.status;
    const statusText = err.response.statusText;
    console.table({
      status,
      statusText,
      payload,
    });
    throw err;
  }
};

export default createLeadRequest;
