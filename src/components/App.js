import React from 'react';
import Header from './Header';
import ContestPreview from './ContestPreview';

class App extends React.Component {
  state = {
    pageHeader: 'Naming Contests'
  };
  componentDidMount() {
    // timers, listensers
    console.log('did mount');
    debugger;
  }
  componentWillUnmount() {
    // clean timers, listeners
    console.log('will unmount');
    debugger;
  }
  render() {
    return (
      <div>
        <Header message={this.state.pageHeader} />
        <div>
          ...
        </div>
      </div>
    );
  }
}

// check out the Chrome Console now.  We can change the title like this.
// $r.setState( {pageHeader: "Blah"} )

export default App;