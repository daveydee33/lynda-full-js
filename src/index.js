import React from 'react';
import ReactDOM from 'react-dom';

// here we define the component.
// prop will be the object properties if we need to pass it some variables and use them in the component
const App = (props) => {
  return (
      <div className="text-center">
        <h2>
            {props.headerMessage}
        </h2>
        <span>{props.headerDesc}</span>
        <span>{props.headerBlah}</span>
      </div>
  );
};

// Prop validations.  This is doing the validation
// Here we can set the property name and the type as a key:value pair.
// if using 'isRequired' then a value must be passed, or we can use the defaults, see 'defaultProps'
App.propTypes = {
  headerMessage: React.PropTypes.string.isRequired,
  headerDesc: React.PropTypes.string,
  headerBlah: React.PropTypes.string,
};

// Here we can define default values if not passed.
App.defaultProps = {
  headerBlah: 'some default text if not passed below...',
};

ReactDOM.render(
    <App headerMessage="React Components!" headerDesc="This is a description..." />,   // Will get an error if we pass something other than string, because we use the validation in propTypes
    document.getElementById('root')
);