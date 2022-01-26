const fs = require('fs');
const { Transform } = require('stream');
const ACCESS_LOG = './access.log';
const ip = [
    '89.123.1.41',
    '34.48.240.111'
]

let w = '127.0.0.1 - - [30/Jan/2021:11:11:20 -0300] "POST /foo HTTP/1.1" 200 0 "-" "curl/7.47.0" 89.123.1.41 - - [30/Jan/2021:11:11:20 -0300] "POST /foo HTTP/1.1" 200 0 "-" "curl/7.47.0" 127.0.0.1 - - [30/Jan/2021:11:11:20 -0300] "POST /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"'

console.log(w.match(/89.123.1.41[^]*/g))

const readStream = fs.createReadStream(ACCESS_LOG, 'utf-8')
ip.forEach(element => {
    const writeSteam = fs.createWriteStream(`${element}_requests.log`, {
        encoding: 'utf-8',
        flags: 'a',
    })

    let regex = new RegExp(`^${element}[^]*\n`, 'g');
    console.log(element)
    console.log(regex)

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            const transformedData = chunk.toString().match(regex);
            console.log(transformedData);
            this.push(transformedData);
            callback();
        }
    })
    readStream.pipe(transformStream).pipe(process.stdout);
});