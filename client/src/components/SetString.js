import React from "react";
import styled from "styled-components";

const StatusButton = styled.div`
  color: ${props => (props.status === "pending" ? "ornage" : "green")};
`;

export default class SetString extends React.Component {
  state = { stackId: null, status: "" };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.setValue(e.target.value);
    }
  };

  setValue = value => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.MyStringStore;

    const stackId = contract.methods["set"].cacheSend(value, {
      from: drizzleState.accounts[0]
    });
    console.log(stackId);
    this.setState({ stackId });
  };

  getTxStatus = () => {
    //get transaction states
    const { transactions, transactionStack } = this.props.drizzleState;

    const txHash = transactionStack[this.state.stackId];
    if (!txHash) {
      return null;
    }
    const transaction = transactions[txHash];
    console.log(transaction);
    return (
      <div>
        <StatusButton status={transaction.status}>{`Transaction status: ${
          transaction.status
        }`}</StatusButton>
        {transaction.status === "success" && (
          <div>
            <p>Transaction Information:</p>
            <p>{`TxHash: ${transaction.receipt.transactionHash}`}</p>
            <p>{`Block Hash: ${transaction.receipt.blockHash}`}</p>
            <p>{`Block #: ${transaction.receipt.blockNumber}`}</p>
            <p>{`# of confirmations: ${transaction.confirmations.length}`}</p>
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <div>{this.getTxStatus()}</div>
      </div>
    );
  }
}
