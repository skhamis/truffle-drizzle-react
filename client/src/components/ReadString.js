import React from "react";

export default class ReadString extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.MyStringStore;

    // tell drizzle to watch the specified method
    const dataKey = contract.methods["myString"].cacheCall();

    this.setState({ dataKey });
  }

  render() {
    const { MyStringStore } = this.props.drizzleState.contracts;
    const myString = MyStringStore.myString[this.state.dataKey];

    return <div>String stored: {myString && myString.value}</div>;
  }
}
