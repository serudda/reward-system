import fetch from "node-fetch";

const issueName = process.env.ISSUE_NUMBER;
const issueDescription = process.ISSUE_DESCRIPTION;
const reward = process.env.REWARD;
const username = "username_de_discord";

console.log("issueName", issueName);
console.log("issueDescription", issueDescription);
console.log("reward", reward);

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
const data = {
  username: "GitHub Action",
  content: `El pull request #${issueName} ha sido mergeado en Develop. 
  Descripcion: ${issueDescription}
  Se otorgan ${reward} puntos a ${username}.`,
};

fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
})
  .then(() => console.log("Mensaje enviado correctamente."))
  .catch((error) => console.error("Error al enviar mensaje:", error));
