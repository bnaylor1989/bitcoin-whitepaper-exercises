"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
  "The power of a gun can kill",
  "and the power of fire can burn",
  "the power of wind can chill",
  "and the power of a mind can learn",
  "the power of anger can rage",
  "inside until it tears u apart",
  "but the power of a smile",
  "especially yours can heal a frozen heart",
];

var Blockchain = {
  blocks: [],
};

// Genesis block
Blockchain.blocks.push({
  index: 0,
  hash: "000000",
  data: "",
  timestamp: Date.now(),
});

function printBlockchain(blockchain) {
  for (let block of blockchain) {
    console.log(JSON.stringify(block, null, 4));
  }
}

function verifyChain(chain) {
  for (let block of chain) {
    if (!verifyblock(block)) {
      console.log(`Block at index ${block.index} is invalid`);
      return false;
    }
  }
  return true;
}

function verifyblock(block) {
  // regardless of block, `index` must be an integer >= `0`
  if (block.index < 0) {
    console.log(`Block index cannot be less than 0`);
    return false;
  }

  //   * for the genesis block only, the hash must be `"000000"`
  if (block.index === 0) {
    if (block.hash !== "000000") {
      console.log(`Genesis block hash does not equal 000000`);
      return false;
    }
  } else {
    // if any block except genesis block

    // `hash` must not be "000000"
    if (block.hash === "000000") {
      console.log(`Block hash is invalid`);
      return false;
    }

    // `data` must be non-empty
    if (block.data.length === 0) {
      console.log(`Block data is empty`);
      return false;
    }

    // `prevHash` must be non-empty
    if (block.prevHash.length === 0) {
      console.log(`Block prevHash is empty`);
      return false;
    }

    // the current blocks prevHash field must must the hash of the previous block.
    if (block.prevHash !== Blockchain.blocks[block.index - 1].hash) {
      console.log(
        `Block prevHash ${
          block.prevHash
        } does not match the hash of the previous block ${
          Blockchain.blocks[block.index - 1].hash
        }`
      );
      return false;
    }

    //   * the `hash` must match what recomputing the hash with `blockHash(..)` produces
    return true;
  }
  return true;
}

function createBlock(text) {
  const block = {
    index: Blockchain.blocks.length,
    prevHash: Blockchain.blocks[Blockchain.blocks.length - 1].hash,
    data: text,
    timestamp: Date.now(),
  };
  block.hash = blockHash(block);
  return block;
}
// **********************************

function blockHash(bl) {
  return crypto.createHash("sha256").update(JSON.stringify(bl)).digest("hex");
}

for (let line of poem) {
  Blockchain.blocks.push(createBlock(line));
}

printBlockchain(Blockchain.blocks);

console.log(`Blockchain is valid: ${verifyChain(Blockchain.blocks)}`);
