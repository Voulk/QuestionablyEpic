import React, { Component } from 'react';
import axios from 'axios';

const API = 'https://www.warcraftlogs.com:443/v1/report/fights/';
const START = '?start='
const END = '&end='
const API2 = '?api_key=92fc5d4ae86447df22a8c0917c1404dc'

class Fetcher extends Component {

  constructor(props) {
    console.log('yo')
    super(props);
    this.state = {
      url: props.url,
      data: null,
      isLoading: false,
      error: null,
    };
    console.log(this.state)
  }
  componentDidMount() {
    this.setState({
      isLoading: true });
    axios.get(this.state.url)
      .then(result => this.setState({
        data: result.data,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }
  render() {
    console.log(this.props.children(this.state));
    return this.props.children(this.state);
  }
}

const RenderPropApproach = (props, { data, isLoading, error }) =>
  (<Fetcher url={props.url}>

    { ({ data, isLoading, error }) => {
      if (!data) {
        return <p>No data yet ... </p>;
      }

      if (error) {
        return <p>{error.message}</p>;
      }

      if (isLoading) {
        return <p>Loading ...</p>;
      }

      return (
        <ul>
          {data.fights.map(fight =>
            (<li key={fight.id}>
              <a>{fight.start_time},{fight.end_time}</a>
            </li>)
          )}
        </ul>
      );
    }}
  </Fetcher>)


export default RenderPropApproach;