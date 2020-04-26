import React, { Component } from 'react';

class Charttable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    }
  }

  render() {
    console.log(this.state.data)
    return (

    )
  }
}

export default Charttable;