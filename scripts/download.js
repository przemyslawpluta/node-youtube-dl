var downloader = require('../lib/downloader')

downloader().then((message) => {
  console.log(message);
}).catch((err) => {
  console.error(err)
});
