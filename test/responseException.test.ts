import 'isomorphic-fetch';
import { ResponseException } from '../src';

describe('ResponseException', () => {
  it('creates ResponseException instance', () => {
    let e = new ResponseException('My error message', 403);
    expect(e).toBeInstanceOf(ResponseException);
  });

  it('stringifies error', () => {
    let e = new ResponseException('My error message', 403, new Response());
    expect(e).toHaveProperty('message');
    expect(e).toHaveProperty('name');
    expect(e.toString()).toBe('ResponseExcpetion: My error message');
  });
});
