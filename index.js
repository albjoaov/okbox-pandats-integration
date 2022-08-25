import getJwtTokenRequest from "./src/client/getJwtTokenRequest.js";
import df from "./src/csv/csvHelper.js";
import createLeadRequest from "./src/client/createLeadRequest.js";
import formatLead from "./src/validation/formatLead.js";

const jwtToken = await getJwtTokenRequest();
let integradosSucesso = 0;
let integradosFalha = 0;

for (let i = 0; i < df.rows; i++) {
  let lead = df[i];
  // lead = formatLead(lead);
  try {
    const response = await createLeadRequest(lead, jwtToken);
    // console.log("X-RateLimit-Limit", response.headers["x-ratelimit-limit"]);
    // console.log(
    //   "X-RateLimit-Remaining",
    //   response.headers["x-ratelimit-remaining"]
    // );
    if (response.status === 201) {
      console.log(`Sucesso na integração do lead ${i + 1} de ${lead.email}`);
      integradosSucesso = integradosSucesso + 1;
    }
  } catch (error) {
    console.log(`Falha ao integrar lead ${i + 1} de ${lead.email} \n\n`);
    integradosFalha = integradosFalha + 1;
    continue;
  }
}

console.log(`==== Conclusão ====`);
console.log(`${integradosSucesso} leads foram integrados com sucesso!`);
console.log(`${integradosFalha} leads falharam!`);
