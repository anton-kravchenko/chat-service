const http = require('http');
const axios = require('axios');
const crypto = require('crypto');

const cookieDomain = process.env.COOKIE_DOMAIN || '127.0.0.1';
const app_url = process.env.APP_URL || 'http://127.0.0.1:54177/';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const cookieName = process.env.COOKIE_NAME || 'check';

const port = 8125;
const authRedirectUrl = `https://github.com/login/oauth/authorize?scope=user:email&client_id=42be6a173dc52c0af0bf`;

function shaSignature(text) {
  return crypto
    .createHmac('sha256', client_secret)
    .update(text)
    .digest('base64');
}

function parseGetParams(str = '') {
  return str.split('&').reduce((res, pair) => {
    const parts = pair.split('=');
    res[parts[0]] = parts[1] || true;
    return res;
  }, {});
}

function validCookies(cookie = '') {
  const cookies = cookie.split(/\s*;\s*/);
  const check = cookies.find((c) => c.startsWith(cookieName));
  if (!check) {
    console.log(
      '@ No check cookies',
      check,
      'cookieName=',
      cookieName,
      'cookies',
      cookies,
    );
    return false;
  }

  const parts = check.slice(cookieName.length + 1).split('^');
  if (parts.length !== 2) {
    console.log('@ No parts', parts);
    return false;
  }

  if (shaSignature(parts[1]) !== parts[0]) {
    console.log('@ SHA is different', parts, shaSignature(parts[1]));
    return false;
  }

  const userData = parts[1].split('|');
  if (userData.length !== 3) {
    console.log('@ wrong user data', userData);
    return false;
  }

  if (Number(userData[2]) < new Date().getTime()) {
    console.log('@ bad date ', Number(userData[3]), new Date().getTime());
  }
  return Number(userData[2]) > new Date().getTime();
}

function fetchUserData(session_code) {
  const body = {
    client_id,
    client_secret,
    code: session_code,
    accept: 'json',
  };

  return axios
    .post('https://github.com/login/oauth/access_token', body, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((resp) => {
      if (resp.status >= 400) {
        throw new Error('Failed to obtain access_token ' + resp.status);
      }
      return resp;
    })
    .then((resp) => {
      const params = new URLSearchParams(resp.data);

      const access_token = params.get('access_token');
      const scopes = params.get('scope');
      const token_type = params.get('token_type');
      const expires_in = 60 * 60 * 1000;

      return axios
        .get('https://api.github.com/user', {
          headers: {
            Authorization: `token ${access_token}`,
          },
        })
        .then(({ data }) => {
          console.log(JSON.stringify(data));
          return [data, access_token, expires_in];
        })
        .catch((e) => {
          console.log('error', e);
        });
    });
}

http
  .createServer(function (request, response) {
    console.log('--> req', request.url, request.headers.cookie);

    if (request.url.startsWith('/callback')) {
      const params = parseGetParams(request.url.split('/callback?')[1]);

      fetchUserData(params.code)
        .then(([data, access_token, expiration]) => {
          const expires = new Date().getTime() + Number(expiration);
          const body = `${data.login}|${data.url}|${expires}`;
          const hash = shaSignature(body);
          const resp = hash + '^' + body;

          response
            .writeHead(301, {
              Location: app_url,
              'Set-Cookie': `${cookieName}=${resp}; domain=${cookieDomain}; HttpOnly; Max-Age=${
                Number(expiration) / 1000
              };`,
            })
            .end();
        })
        .catch((e) =>
          response
            .writeHead(500, {
              'Content-Length': Buffer.byteLength(e.message),
              'Content-Type': 'text/plain',
            })
            .end(e.message),
        );
    } else if (validCookies(request.headers.cookie)) {
      response.writeHead(200).end();
    } else {
      response.writeHead(302, { Location: authRedirectUrl }).end();
    }
  })
  .listen(port, () => console.log(`Server started on port: ${port}`));
