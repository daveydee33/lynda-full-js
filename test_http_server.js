// using http for a SERVER
import http from 'http';

const server = http.createServer();

server.listen(8080);

server.on('request', (req,res) => {
    res.write('Hello HTTP!\n');
    setTimeout(() => {
        res.write('I can stream\n');
        res.end();
    }, 3000);
});

// use curl, or open browser and access http://localhost:8080
// It will print the first line, and then after 3 seconds it will print the second line.
