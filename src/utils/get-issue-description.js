import { Octokit } from "@octokit/rest";

async function run() {
  try {
    const octokit = new Octokit({
      auth: process.env.PROJECT_TOKEN,
    });

    console.log(`Token: ${process.env.PROJECT_TOKEN}`);
    console.log(`Número del issue: ${process.env.ISSUE_NUMBER}`);
    console.log(
      `Número del issue2: ${process.env.GITHUB_HEAD_REF.split("/").pop()}`
    );
    console.log(`Repositorio Completo: ${process.env.GITHUB_REPOSITORY}`);
    console.log(`Owner: ${process.env.GITHUB_REPOSITORY.split("/")[0]}`);
    console.log(`Repositorio: ${process.env.GITHUB_REPOSITORY.split("/")[1]}`);

    const { data } = await octokit.issues.get({
      owner: process.env.GITHUB_REPOSITORY.split("/")[0],
      repo: process.env.GITHUB_REPOSITORY.split("/")[1],
      issue_number: process.env.ISSUE_NUMBER,
    });

    console.log(`Descripción del issue: ${data.body}`);

    const output = {
      description: data.body,
    };
    console.log(JSON.stringify(output));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

run();
