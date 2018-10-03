import 'isomorphic-fetch';
import { defaultFetch, defaultFetchHandlerResponseBody, defaultFetchHandlerResponseOptions } from '../src/defaultFetch';

describe('defaultFetch', () => {
  it('it returns the same promise regardless of arguments', async () => {
    let args: any[] = [
      ['test', {}],
      ['test2', { test: 'test' }],
      ['', undefined],
      [undefined, undefined],
      [undefined, {}]
    ];

    for (const argSet of args) {
      expect((await defaultFetch.apply(null, argSet)).json()).toBeInstanceOf(Promise);

      expect(await (await defaultFetch.apply(null, argSet)).json())
        .toMatchObject(defaultFetchHandlerResponseBody.apply(null, argSet));
    }
  });
});
