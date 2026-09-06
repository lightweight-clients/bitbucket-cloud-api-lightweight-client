import { client } from './client.gen.js';

export const client_setBaseUrl = (baseUrl: string): void => {
  client.setConfig({ baseUrl: baseUrl.replace(/\/+$/, '') });
};

export const client_setAuthorization = (authorization?: string): void => {
  const headers = new Headers(
    client.getConfig().headers as HeadersInit | undefined,
  );
  if (authorization === undefined) headers.delete('Authorization');
  else headers.set('Authorization', authorization);
  client.setConfig({ headers });
};

export const client_setFetch = (customFetch: typeof globalThis.fetch): void => {
  client.setConfig({ fetch: customFetch });
};

export { client };
