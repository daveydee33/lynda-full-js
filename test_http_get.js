// using http for a GET request
import https from 'https';

//console.log(http.STATUS_CODES[200]); // prints specific element of array

https.get('https://www.lynda.com', res => {
    console.log('Response status code: ', res.statusCode);
    console.log(res.statusMessage);

    console.log('--- Headers ---');
    console.log(res.headers);
    console.log('---------------');

    res.on('data', chunk => {
        console.log(chunk.toString());
    });
});


