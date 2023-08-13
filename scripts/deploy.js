const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  //Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "Deficord"
  const SYMBOL = "DC"
  // Deployment goes here
  const Deficord = await ethers.getContractFactory("Deficord")
  const deficord = await Deficord.deploy(NAME, SYMBOL)
  await deficord.deployed()

  console.log(`Deployed Deficord Contract at: ${deficord.address}\n`)

  // Create 3 channels
  const CHANNEL_NAMES = ["general", "tokens", "nfts"]
  const COSTS = [tokens(1), tokens(0), tokens(0.25)]

  for (var i = 0; i < 3; i++){
  // Code goes here... channel creation
    const transaction = await deficord.connect(deployer).createChannel(CHANNEL_NAMES[i], COSTS[i])
    await transaction.wait()

    console.log(`Created text channel #${CHANNEL_NAMES[i]}`)

  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});