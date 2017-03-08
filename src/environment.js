const env = {
  development: {
    BASE_URL: 'http://localhost:8080',
    // BASE_URL: 'https://climbon-prod.herokuapp.com'
  },
  production: {
    BASE_URL: 'https://climbon-prod.herokuapp.com'
  }
};
export const environment = env[process.env.NODE_ENV || 'development'];
