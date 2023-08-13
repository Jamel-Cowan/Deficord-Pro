const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Deficord", function () {
  let deployer, user
  let deficord


  const NAME = "Deficord"
  const SYMBOL = "DC"

  beforeEach(async () => {
    // Setup accounts
    [deployer, user] = await ethers.getSigners()
  

    //Deploy Contract
    const Deficord = await ethers.getContractFactory("Deficord")
    deficord = await Deficord.deploy(NAME, SYMBOL)

    // 1 Ether
    // 1 Wei has 18 zeros

    // Create a channel
    const transaction = await deficord.connect(deployer).createChannel("General", tokens(1))
    await transaction.wait()
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
    it("Sets the owner", async () => {
      // Fetch owner
      let result = await deficord.owner()
      // Check address
      expect(result).to.equal(deployer.address)
    })
  })

  describe("Creating channels", () => {
    it('Returns total channels', async () => {
      const result = await deficord.totalChannels()
      expect(result).to.be.equal(1)
    })
    it('Returns channel attributes', async () => {
      const channel = await deficord.getChannel(1)
      expect(channel.id).to.be.equal(1)
      expect(channel.name).to.be.equal("General")
      expect(channel.cost).to.be.equal(tokens(1))
    })
  }) 

  describe("Joining Channels", () => {
    const ID = 1
    const AMOUNT = ethers.utils.parseUnits("1", 'ether')

    beforeEach(async () => {
      const transaction = await deficord.connect(user).mint(ID, { value: AMOUNT })
      await transaction.wait()
    })
    it('Joins the user', async () => {
      const result = await deficord.hasJoined(ID, user.address)
      expect(result).to.be.equal(true)
    })
    it('Increases total supply', async () => {
      const result = await deficord.totalSupply()
      expect(result).to.be.equal(ID)
    })
    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(deficord.address)
      expect(result).to.be.equal(AMOUNT)
    })
  })

  describe("Withdrawing", () => {
    const ID = 1
    const AMOUNT = ethers.utils.parseUnits("10", 'ether')
    let balanceBefore

    beforeEach(async () => {
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      let transaction = await deficord.connect(user).mint(ID, { value: AMOUNT})
      await transaction.wait()

      transaction = await deficord.connect(deployer).withdraw()
      await transaction.wait()


  })

it('Updates the owner balance', async () => {
  const balanceAfter = await ethers.provider.getBalance(deployer.address)
  expect(balanceAfter).to.be.greaterThan(balanceBefore)
})
it('Updates the contract balance', async () => {
  const result = await ethers.provider.getBalance(deficord.address)
  expect(result).to.equal(0)
})

  })

})
