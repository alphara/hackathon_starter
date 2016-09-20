import React from 'react';
import ReactDOM from 'react-dom';
import Radium, {StyleRoot} from 'radium';
import 'whatwg-fetch';


const MainBox = Radium(React.createClass({

  getInitialState: function () {
    return {
      data: 'Loading...',
      color: 'red',
    };
  },

  fetchData: function () {
    const self = this;
    fetch(`/data`)
      .then((response) => {
        console.log('response:', response);
        return response.json();
      }).then((json) => {
        console.log('json: ', json);
        self.setState({
          data: json.data,
          color: json.color,
        });
      }).catch((ex) => {
        console.error('fetchData error: ', ex);
      });
  },

  componentDidMount: function() {
    this.fetchData();
  },

  componentWillUnmount: function() {
  },

  render: function() {
    return (
      <StyleRoot>
        <div>
          <div style={[{color: this.state.color}, {fontWeight: 'bold'}]}>
            {this.state.data}
          </div>
        </div>
      </StyleRoot>
    );
  }

}));


ReactDOM.render(
  <MainBox />,
  document.getElementById('content')
);

