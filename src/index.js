import React from 'react';
import ReactDOM from 'react-dom';

// here we define the components.
// now in Header we can destructure {message} so we don't need to use props.headerMessage.

// now the Header component is more readable and re-usable and we'll use it to compose the App component, to also make that easier to read and more reusable

const Header = ( { message } ) => {
  return (
      <h2>
          {message}
      </h2>
  );
};

Header.propTypes = {
  message: React.PropTypes.string
};

const App = () => {
  return (
      <div>
        <Header message="Naming Contests" />
        <div>
          ...
        </div>
      </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);