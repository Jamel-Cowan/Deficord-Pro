const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Deficord", function () {

  describe("Deployment", function () {
    it("Sets the name & Symbol", async () => {
      //Deploy Contract
      const Deficord = await ethers.getContractFactory("Deficord")
      deficord = await Deficord.deploy("Deficord", "DC")

      // Fetch name
      let result = await deficord.name()
      // Check name 
      expect(result).to.equal("Deficord")
      
      // Fetch symbol
      result = await deficord.symbol()
      // Check symbol
      expect(result).to.equal("DC")
    })
  })
})
