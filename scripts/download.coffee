# module dependencies
fs    = require 'fs'
path  = require 'path'
https = require 'https'
exec  = require('child_process').exec


# vars
folder = path.normalize __dirname + '/../bin'
filename = '/youtube-dl'
filepath = folder + filename


# download youtube-dl
https.get({
  host: 'raw.github.com',
  path: '/rg3/youtube-dl/master/youtube-dl'
}, (res) ->
  content = ''
  res.on 'data', (data) ->
    content += data

  res.on 'end', () ->
    # make bin folder if not exists
    if not path.existsSync folder
      fs.mkdirSync folder, 0744

    # write file when finished
    fs.writeFileSync filepath, content
    fs.chmodSync filepath, 0711

).on 'error', (err) ->
  throw err
