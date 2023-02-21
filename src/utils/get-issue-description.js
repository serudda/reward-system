import { Octokit } from "@octokit/rest";

async function run() {
  try {
    const octokit = new Octokit({
      auth: process.env.PROJECT_TOKEN,
    });

    const issue_number = process.env.GITHUB_HEAD_REF.split("RS-").pop();
    const owner = process.env.GITHUB_REPOSITORY.split("/")[0];
    const repo = process.env.GITHUB_REPOSITORY.split("/")[1];

    const { data } = await octokit.request(
      `GET /repos/${owner}/${repo}/issues/${issue_number}`,
      {
        owner,
        repo,
        issue_number,
      }
    );

    console.log(`Reward del issue: ${data.title}`);
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
