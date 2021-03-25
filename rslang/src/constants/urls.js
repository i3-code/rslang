const baseUrl = 'https://react-rslang.herokuapp.com';

const urls = {
  auth: {
    signup: `${baseUrl}/users`,
    login: `${baseUrl}/signin`,
    whoAmI: `${baseUrl}/users/whoAmI`,
  },
};

export default urls;
