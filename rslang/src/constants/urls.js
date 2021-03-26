const baseUrl = 'https://react-rslang.herokuapp.com';

const urls = {
  base: baseUrl,
  auth: {
    signup: `${baseUrl}/users`,
    login: `${baseUrl}/signin`,
    whoAmI: `${baseUrl}/users/whoAmI`,
  },
  words: `${baseUrl}/words`,
};

export default urls;
