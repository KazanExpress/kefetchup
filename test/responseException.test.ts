import 'isomorphic-fetch';
import { ResponseError } from '../src';

describe('ResponseError', () => {
  it('creates ResponseError instance', () => {
    let e = new ResponseError('My error message', 403);
    expect(e).toBeInstanceOf(ResponseError);
  });

  it('stringifies error', () => {
    let e = new ResponseError('My error message', 403, new Response());
    expect(e).toHaveProperty('message');
    expect(e).toHaveProperty('name');
    expect(e.toString()).toBe('ResponseError: My error message');
  });
});
