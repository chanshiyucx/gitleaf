export default {
  queryPostCount: ({ owner, name }) => `
    query { 
      repository(owner:"${owner}", name: "${name}") {
        description
        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
        forks {
          totalCount
        }
      }
    }
  `
}
