import { handleStatus } from '../src';

describe('handleStatus test', () => {
  it('handles known status', () => {
    let e = handleStatus(500);
    expect(e).toBe('ServerError');
  });

  it('handles unknown status', () => {
    let e = handleStatus(692);
    expect(e).toBe('UnknownError');
  });

  it('handles empty status', () => {
    let e = handleStatus();
    expect(e).toBe('UnknownError');
  });
});
