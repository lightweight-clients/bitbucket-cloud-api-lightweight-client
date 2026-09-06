# Bitbucket Cloud API Lightweight Client

Typed, dependency-free client generated from Bitbucket Cloud OpenAPI 3.0 schema.

```ts
import { client_setAuthorization, getRepositoriesByWorkspace } from '@lightweight-clients/bitbucket-cloud-api-lightweight-client';

client_setAuthorization('Bearer token');
const result = await getRepositoriesByWorkspace({ path: { workspace: 'my-workspace' } });
```

Use `client_setBaseUrl` for test servers. Request functions accept generated `Options` with `path`, `query`, `headers`, and `body`. Successful calls return response data, request, and response; set `throwOnError: true` to throw on non-2xx responses.

Schema source: [lightweight-clients/schemas](https://github.com/lightweight-clients/schemas).
