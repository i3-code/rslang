const baseUrl = 'https://react-rslang.herokuapp.com';

const urls = {
  base: baseUrl,
  auth: {
    signup: `${baseUrl}/users`,
    login: `${baseUrl}/signin`,
    whoAmI: `${baseUrl}/users/whoAmI`,
  },
  words: {
    all: `${baseUrl}/words`,
    byId: (wordId) => (userId) => `${baseUrl}/users/${userId}/words/${wordId}`,
  },
  aggregatedWords: {
    all: (userId) => `${baseUrl}/users/${userId}/aggregatedWords`,
    byId: (wordId) => (userId) => `${baseUrl}/users/${userId}/aggregatedWords/${wordId}`,
  },
  user: {
    statistics: (userId) => `${baseUrl}/users/${userId}/statistics`,
  }
};

export default urls;
