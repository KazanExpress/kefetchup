import { GenericAPIClient } from '../../src';

describe('GenericAPIClient', () => {
  describe('handleStatus', () => {
    it('handles known status', () => {
      let e = GenericAPIClient.handleStatus(500);
      expect(e).toBe('ServerError');
    });

    it('handles unknown status', () => {
      let e = GenericAPIClient.handleStatus(692);
      expect(e).toBe('UnknownError');
    });

    it('handles empty status', () => {
      let e = GenericAPIClient.handleStatus();
      expect(e).toBe('UnknownError');
    });
  });
});
