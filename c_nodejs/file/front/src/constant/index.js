export const constant = {
  // Bearer key
  AUTHORIZATION_KEY: 'Bearer abc',

  // リクエストURL
  URL: {
    development: ``,
    production: `http://${process.env.SERVER_IP}:${process.env.BACKEND_PORT}/api/v1`
  },

  LANG: [
    'html',
    'css',
    'javascript',
    'python',
    'php',
    'go',
    'java',
    'c',
    'rust',
    'perl',
    'bash'
  ]
};
