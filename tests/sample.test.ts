import { expect, test, vi } from 'vitest';
import {
  client_setAuthorization,
  client_setBaseUrl,
  client_setFetch,
  getRepositories,
  getRepositoriesByWorkspace,
} from '../src/index.js';

test('configures Cloud request URL and Authorization header', async () => {
  const fetchMock = vi.fn<(request: Request) => Promise<Response>>(
    async () =>
      new Response(JSON.stringify({ values: [] }), {
        headers: { 'Content-Type': 'application/json' },
      }),
  );
  client_setBaseUrl('https://example.test/2.0/');
  client_setAuthorization('Bearer token');
  client_setFetch(fetchMock as typeof globalThis.fetch);

  await getRepositories();

  const request = fetchMock.mock.calls.at(0)?.at(0);
  if (!request) throw new Error('Expected a request');
  expect(request.url).toBe('https://example.test/2.0/repositories');
  expect(request.headers.get('Authorization')).toBe('Bearer token');
});

test('serializes generated workspace path parameters', async () => {
  const fetchMock = vi.fn<(request: Request) => Promise<Response>>(
    async () => new Response(JSON.stringify({ values: [] })),
  );
  client_setBaseUrl('https://example.test/2.0');
  client_setFetch(fetchMock as typeof globalThis.fetch);

  await getRepositoriesByWorkspace({ path: { workspace: 'acme' } });

  const request = fetchMock.mock.calls.at(0)?.at(0);
  if (!request) throw new Error('Expected a request');
  expect(request.url).toBe('https://example.test/2.0/repositories/acme');
});
