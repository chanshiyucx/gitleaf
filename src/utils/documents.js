export default {
  queryArchivesCount: ({ username, repository }) => `
    query { 
      repository(owner:"${username}", name: "${repository}") {
        issues(states:OPEN) {
          totalCount
        }
      }
    }
  `,
  queryMoodCount: ({ username, repository }) => `
    query { 
      repository(owner:"${username}", name: "${repository}") {
        issues(states:CLOSED, labels: Mood) {
          totalCount
        }
      }
    }
  `,
  queryFilterArchivesCount: ({ username, repository, label, milestone }) => `
    {
      search(type: ISSUE, query: "
        user:${username} 
        repo:${repository} 
        state:open
        ${milestone ? 'milestone:' + milestone : ''}  
        ${label ? 'label:' + label : ''} 
      ") {
        issueCount
      }
    }
  `
}
