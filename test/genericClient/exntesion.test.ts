import { TestAPIClient, fetchHandler } from '../common';
import { JsonAPIClient, TextAPIClient, GenericAPIClient, ResponseException } from '../../src';

describe('GenericAPIClient', () => {
  it('allows handler overloads', async () => {
    const clients = [new TestAPIClient('', {}), new JsonAPIClient(), new TextAPIClient()];

    for (const client of clients) {
      client.fetchHandler = fetchHandler;

      // Check whether the client has overriden the responseHandler...
      expect((client as any).responseHandler).not.toEqual((new GenericAPIClient() as any).responseHandler);
      // ...and hasn't overriden the request method.
      expect((client as any).request).toEqual((new GenericAPIClient() as any).request);

      try {
        // Should throw here sometimes
        const result = await client.get('https://sad', { method: 'get' }, true);

        if (typeof result === 'object') {
          expect(result).toMatchObject(await (await fetchHandler('/test')).json());
        } else if (typeof result === 'string') {
          expect(result).toMatchObject(await (await fetchHandler('/test')).text());
        }
      } catch (e) {
        if (e instanceof ResponseException) {
          expect(e.status).toBe(403);
        }
      }
    }
  });

  it('handles wrong aliases', async () => {
    expect((await new TestAPIClient().trace('/test')).method).toBe('GET');
  });
});
