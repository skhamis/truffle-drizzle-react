pragma solidity ^0.4.24;

contract MyStringStore {
  string public myString = "Hello from Blockchain!";

  function set(string x) public {
    myString = x;
  }
}

