import React from 'react';
import Header from './Header';
import ContestPreview from './ContestPreview';

class App extends React.Component {
  state = {
    pageHeader: 'Naming Contests'
  };
  componentDidMount() {
    // timers, listensers
  }
  componentWillUnmount() {
    // clean timers, listeners
  }
  render() {
    return (
      <div>
        <Header message={this.state.pageHeader} />
        <div>
          <p><b>Using the 'spread' operator to display just the first object in the array (first element)</b></p>
          <ContestPreview {...this.props.contests[0]} />
          ...
          <p><b>Now using 'map' for loop through the array</b></p>
          {/* using 'map' to loop through the array */}
          {this.props.contests.map(contest => 
            <ContestPreview {...contest} />
          )}
        </div>
      </div>
    );
  }
}
// Note here that we're using the spread operator (...).
// Also note that for testing, we're just passing 1 object (the first object in the array)
// ? -> Need to review and understand the 'spread' operator, and 'map' for arrays



// check out the Chrome Console now.  We can change the title like this.
// $r.setState( {pageHeader: "Blah"} )

export default App;