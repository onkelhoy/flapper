import path from 'path';

export const request = async (url, config = {}) => {
  const token = window.localStorage.getItem('flapper-token');

  const { method = 'post', body = {}, ...rest} = config;
  try {
    const conf = {
      method,
      mode: 'cors',
      credentials: 'same-origin',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({...body, token }),
      ...rest
    };

    if (method === 'get') delete conf.body;
    else console.log(conf.body);

    const res = await fetch(path.join('/api', url), conf);
    const json = await res.json();

    return json;
  }
  catch (error) {
    console.error(error);
    return { error, };
  }
}