import dave, {nodeEnv, myName, logstars} from './dave';
// we have to use the destructure {} to import a non-default export.
// we do this to import something specific that is not labeled 'default' in the file we're importing.

// then we can use them
console.log(dave);
console.log(nodeEnv);
console.log(dave, nodeEnv);

console.log(myName);

logstars("blah");

