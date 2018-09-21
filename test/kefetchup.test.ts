import KeFetchUp from "../src/kefetchup"

/**
 * Dummy test
 */
describe("Dummy test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("KeFetchUp is instantiable", () => {
    expect(new KeFetchUp()).toBeInstanceOf(KeFetchUp)
  })
})
