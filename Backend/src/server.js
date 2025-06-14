/* An endpoint orders a string's characters alphabetically */
// I would use express for this but since it was not mentioned whether it's allowed or not, I'll stick to vanilla
const http = require('http');


const server = http.createServer((req, res) => {

  if(req.method === 'POST' && req.url === '/webhook') {
    let chunks = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      const jsonBuffer = Buffer.concat(chunks);
      const jsonObjStr = jsonBuffer.toString();
      const jsonObj = JSON.parse(jsonObjStr);

      // Coverting Logic
      // I'm assuming the result can lowercase
      const string = jsonObj.data;
      const stringChars = string.split('');
      const stringCharsSorted = stringChars.sort((a, b) => a > b ? 1 : b > a ? -1 : 0);
      const response = JSON.stringify({ word: stringCharsSorted });

      res.writeHead(200, 'Converted Successfully', {"content-type":"application/json"});
      res.end(response);
    });
  } else {
    res.end('Not Found');
  }
})


server.listen(3000, () => {
  console.log('Server Running On Port 3000')
});
