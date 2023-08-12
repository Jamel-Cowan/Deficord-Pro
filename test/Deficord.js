const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Deficord", function () {
  let deficord

  const NAME = "Deficord"
  const SYMBOL = "DC"

  beforeEach(async () => {
    //Deploy Contract
    const Deficord = await ethers.getContractFactory("Deficord")
    deficord = await Deficord.deploy(NAME, SYMBOL)
  })

  describe("Deployment", function () {
    it("Sets the name", async () => {
      // Fetch name
      let result = await deficord.name()
      // Check name 
      expect(result).to.equal(NAME)
    })

    it("Sets the Symbol", async () => {
      // Fetch symbol
      let result = await deficord.symbol()
      // Check symbol
      expect(result).to.equal(SYMBOL)
    })
  })
})
