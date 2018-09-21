import KeFetchUpJsonClient from "../src/kefetchup"

/**
 * Dummy test
 */
describe("Dummy test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("KeFetchUp is instantiable", () => {
    expect(new KeFetchUpJsonClient()).toBeInstanceOf(KeFetchUpJsonClient)
  })
})

describe('Fetch test', () => {
  it('should do request', async () => {
    let fetch = (url: string | Request, fetchConfig?: RequestInit): Promise<Response|any> => {
      return new Promise((resolve, reject) => {
        resolve({})
      })
    }
    let API = new KeFetchUpJsonClient('https://kazanexpress.ru/api', fetch, {
      headers: {
        authorization: 'Basic a2F6YW5leHByZXNzLWN1c3RvbWVyOmN1c3RvbWVyU2VjcmV0S2V5'
      }
    })

    let resp = await API.request('main/root-categories')
    console.log(resp)
    expect(!!resp).toBeTruthy()
  })
})
