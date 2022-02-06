// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract WavePortal {
  uint totalWaves;
  //event to store messages
  event newWave (address indexed from, uint timestamp, string message);
  struct Wave {
    address from;
    uint timestamp;
    string message;
  }
  
  //array of the struct Waves to store all the waves sent
  Wave[] allWaves;

  mapping (address => uint) public noWavesSentby;
  constructor () {
    console.log("Wave contract deployed"); //curtosy of hardhat, now easier to debug
  }

  function wave(string memory _message) public{
    totalWaves += 1;
    noWavesSentby[msg.sender] += 1;
    allWaves.push(Wave(msg.sender, block.timestamp,_message));
    console.log("%s waved with message %s", msg.sender, _message);
  }

  function getAllWaves() public view returns (Wave[] memory) {
        return allWaves;
    }

  function getTotalWaves() public view returns(uint) {
    console.log("We have total %d waves", totalWaves);
    return totalWaves;
  }

}