import fetch from "node-fetch";

const issueName = process.env.ISSUE_NUMBER;
const issueAssignee = process.env.ISSUE_ASSIGNEE;
const issueReward = process.env.ISSUE_REWARD;

console.log("issueName", issueName);
console.log("issueAssignee", issueAssignee);
console.log("issueReward", issueReward);

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
const data = {
  username: "El Banco",
  content: `El pull request #${issueName} ha sido mergeado en Develop. 
  Se otorgan ${issueReward} puntos a ${issueAssignee}.`,
};

fetch(webhookUrl, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
})
  .then(() => console.log("Mensaje enviado correctamente."))
  .catch((error) => console.error("Error al enviar mensaje:", error));
