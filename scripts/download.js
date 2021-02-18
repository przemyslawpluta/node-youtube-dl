require('../lib/downloader')()
  .then(message => console.log(message))
  .catch(err => console.error(err.message || err))
