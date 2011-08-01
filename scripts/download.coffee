# module dependencies
fs    = require 'fs'
path  = require 'path'
https = require 'https'
exec  = require('child_process').exec


# vars
folder = path.normalize __dirname + '/../bin'
filename = '/youtube-dl'
filepath = folder + filename
symlink = path.dirname(process.env._) + filename


# download youtube-dl
switch process.env.npm_lifecycle_event
  when 'preinstall', 'update'
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

        # remove symlink if it exists
        
        linkExists = (try
            fs.readlinkSync symlink
            true
          catch err
            false
        )
        if linkExists
          fs.unlinkSync symlink

        # write, chdmod, and symlink file when finished
        fs.writeFileSync filepath, content
        fs.chmodSync filepath, 0711
        fs.symlinkSync filepath, symlink

    ).on 'error', (err) ->
      throw err

  when 'preuninstall'
    # remove symlink
    fs.unlinkSync symlink
