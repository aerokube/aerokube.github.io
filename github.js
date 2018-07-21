const GithubGraphQLApi = require('node-github-graphql');
const fs = require('fs');
const {promisify} = require('util');

const github = new GithubGraphQLApi({
    token: process.env.GITHUB_TOKEN
});

const writeFile = promisify(fs.writeFile);

const TITLES = {
    selenoid: "Selenoid",
    moon: "Moon",
    cm: "CM",
    selenoid_ui: "Selenoid UI",
    ggr: "GGR",
    ggr_ui: "GGR UI",
    selenoid_grafana_example: "Selenoid + Grafana"
};

const QUERY = `
fragment release on Repository {
  name
  description
  homepageUrl
  owner {
    login
  }
  stargazers {
    totalCount
  }
  releases(last: 1) {
    nodes {
      url
      publishedAt
      tag {
        name
      }
    }
  }
}

query repos {
  selenoid: repository(owner: "aerokube", name: "selenoid") {
    ...release
  }
  moon: repository(owner: "aerokube", name: "moon") {
    ...release
  }
  cm: repository(owner: "aerokube", name: "cm") {
    ...release
  }
  selenoid_ui: repository(owner: "aerokube", name: "selenoid-ui") {
    ...release
  }
  ggr: repository(owner: "aerokube", name: "ggr") {
    ...release
  }
  ggr_ui: repository(owner: "aerokube", name: "ggr-ui") {
    ...release
  }
  
  selenoid_grafana_example: repository(owner: "aerokube", name: "selenoid-grafana-example") {
    ...release
  }
}
`;


(async function runBuildProcess() {
    console.log(`Grab GH releases...`);

    const res = await github.query(QUERY);
    const projects = Object.keys(res.data)
        .map(project => {
            const content = res.data[project];
            const release = content.releases.nodes[0];

            return {
                org: content.owner.login,
                name: content.name,
                description: content.description,
                stars: content.stargazers.totalCount,
                title: TITLES[project] || content.name,
                release: {
                    name: release.tag.name,
                    url: release.url,
                    publishedAt: release.publishedAt
                },
                documentation: content.homepageUrl
            }
        });

    console.log(`Parsed ${projects.length} projects!`);

    await writeFile("data/projects.json", JSON.stringify({projects: projects}, null, 2));
})();