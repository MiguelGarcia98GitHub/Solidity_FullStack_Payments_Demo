import { ethers } from "ethers";

const Buy = ({ state }) => {
  const buyChai = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;

    const amount = { value: ethers.utils.parseEther("0.01") }; // also parses default wei / gwei to actual ether, for demonstration we use this as hardcoded value but could be dinamically changed by the user from the client

    const transaction = await contract.buyChai(name, message, amount);
    console.log(name, message);
  };

  return (
    <>
      <form onSubmit={buyChai}>
        <div>
          <input id="name" placeholder="name" />
        </div>
        <div>
          <input id="message" placeholder="message" />
        </div>
        <div>
          <strong>
            Price for a package of Chai is 0.001 eth (+ whatever are currently
            the network fees) <br /> (using Goerli test network, testnet
            ethereum for demonstration purposes)
          </strong>
          <br />
          We recommend using the Metamask wallet for trying the pay package
          functionality{" "}
          <strong>
            {" "}
            (also reload the page once you have done a transaction, to see it
            below){" "}
          </strong>
          <br />
          (you can get some free test eth for this testnet in the following
          faucet just mining about 5-10 minutes:)
          <br />
          https://goerli-faucet.pk910.de/
        </div>
        <button>Pay a a package of Chai</button>
      </form>
    </>
  );
};

export default Buy;
