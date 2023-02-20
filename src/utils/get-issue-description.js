import { Octokit } from "@octokit/rest";

async function run() {
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

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
