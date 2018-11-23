import { TestAPIClient, fetchHandler } from '../common';
import { JsonAPIClient, TextAPIClient, GenericAPIClient } from '../../src';
import { ResponseError } from '../../src/errors';

describe('GenericAPIClient', () => {
  it('allows handler overloads', async () => {
    const mixInGet = (Client: typeof GenericAPIClient) => class extends Client {
      public get = this.$alias('get');
    };

    const clients = [new TestAPIClient('', {}), new (mixInGet(JsonAPIClient))(), new (mixInGet(TextAPIClient))()];

    for (const client of clients) {
      client.$fetchHandler = fetchHandler;

      // Check whether the client has overriden the responseHandler...
      expect((client as any).$responseHandler).not.toEqual((new GenericAPIClient() as any).$responseHandler);
      // ...and hasn't overriden the request method.
      expect((client as any).$request).toEqual((new GenericAPIClient() as any).$request);

      try {
        // Should throw here sometimes
        const result = await client.get('https://sad', { method: 'GET' }, true);

        if (typeof result === 'object') {
          expect(result).toMatchObject(await (await fetchHandler('https://sad')).json());
        } else if (typeof result === 'string') {
          expect(result).toBe(await (await fetchHandler('https://sad')).text());
        }
      } catch (e) {
        if (e instanceof ResponseError) {
          expect(e.status).toBe(403);
        } else {
          expect(e).toBeFalsy();
        }
      }
    }
  });

  it('handles wrong aliases', async () => {
    expect((await new TestAPIClient().trace('/test')).method).toBe('GET');
  });
});
