const baseUrl = 'https://travel-app-rs.herokuapp.com';

const urls = {
  auth: {
    signup: `${baseUrl}/signup`,
    login: `${baseUrl}/users/login`,
    whoAmI: `${baseUrl}/whoAmI`,
  },
  countries: {
    all: `${baseUrl}/countries`,
    byCode: (code) => `${baseUrl}/countries/${code}`,
  },
  scores: {
    all: `${baseUrl}/scores`,
    byId: (id) => `${baseUrl}/scores/${id}`,
  },
};

export default urls;
