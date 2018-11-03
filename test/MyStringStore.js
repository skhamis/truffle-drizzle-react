const MyStringStore = artifacts.require("MyStringStore");

contract("MyStringStore", accounts => {
  it("should store the strong 'Hey there!'", async () => {
    const myStringStore = await MyStringStore.deployed();

    //Set myString to "Hey there!"
    await myStringStore.set("Hey there!", { from: accounts[0] });

    // Retrieve the set string
    const storedString = await myStringStore.myString.call();

    assert.equal(storedString, "Hey there!", "The string was not stored");
  });
});
