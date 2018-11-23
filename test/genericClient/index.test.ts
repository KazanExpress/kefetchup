import { defaultFetch } from '../../src/defaultFetch';
import { GenericAPIClient, ResponseError } from '../../src';
import { fetchHandler } from '../common';

describe('GenericAPIClient', () => {
  it('works on its own', () => {
    const client = new GenericAPIClient();
    client.$fetchHandler = fetchHandler;

    expect(client).toHaveProperty('$responseHandler');
    expect(client).toHaveProperty('$errorHandler');

    expect((client as any).$responseHandler({ ok: true })).toMatchObject({ ok: true });

    try {
      (client as any).$responseHandler({});

      // DISCLAIMER: this should never happen.
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(ResponseError);
      expect(e.data).toMatchObject({});
    }

    const errors = [new Error('asd'), 'string', 1, undefined, null, {}, new ResponseError('test', 201, null)];

    for (const error of errors) {
      try {
        (client as any).$errorHandler(error);
      } catch (e) {
        expect(e).toBeInstanceOf(ResponseError);
        if (e.status !== -1) {
          expect(e).toBe(error);
        } else {
          expect(e.status).toBe(-1);

          if (typeof error === 'object') {
            expect(e.data).toBe(error);
          } else {
            expect(e.data).toEqual(error);
          }
        }
      }
    }

    (client as any).$requestFactory('', {}, fetchHandler).catch(e => {
      expect(e).toBeInstanceOf(ResponseError);
    });
  });

  it('falls back to defaultFetch', () => {
    window.fetch = undefined;
    expect(new GenericAPIClient().$fetchHandler).toBe(defaultFetch);
  });
});
