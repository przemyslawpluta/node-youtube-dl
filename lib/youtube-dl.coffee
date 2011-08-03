# module dependencies
spawn = require('child_process').spawn
fs    = require 'fs'
path  = require 'path'


# arguments we dont want users to use with youtube-dl
# because they will break this module
badArgs = [
  '-h', '--help'
  '-v', '--version'
  '-U', '--update'
  '-q', '--quiet'
  '-s', '--simulate'
  '-g', '--get-url'
  '-e', '--get-title'
  '--get-thumbnail'
  '--get-description'
  '--get-filename'
  '--no-progress'
  '--console-title'
]

# helps parse options used in youtube-dl command
parseOpts = (args = []) ->
  for arg in badArgs
    if (pos = hasArg args, arg) isnt -1
      args.splice pos, 1
  args

# returns position if argument is found in array
hasArg = (arr, arg) ->
  for a, i in arr
    if (a.indexOf arg) is 0
      return i
  return -1


# check that youtube-dl file exists
file = path.normalize __dirname + '/../bin/youtube-dl'
fs.stat file, (err, stats) ->
  if err
    require __dirname + '/../scripts/download'
    fs.stat file, (err, stat) ->
      if err
        throw new Error 'youtube-dl file does not exist. tried to download it but failed.'


# command to be called
cmd = file


# main download function
module.exports.download = (url, dest, stateChange, download, callback, args) ->
  # setup settings
  args = parseOpts args
  args.push url

  # call youtube-dl
  youtubedl = spawn cmd, args, { cwd: dest }
  
  err = video = size = state = false
  regex = /(\d+\.\d)% of (\d+\.\d+\w) at\s+([^\s]+) ETA ((\d|-)+:(\d|-)+)/

  youtubedl.stdout.on 'data', (data) ->
    data = data.toString()

    # check if video is uploading so script can start
    # calling the download progress function
    if state is 'Downloading video'
      if result = regex.exec data
        if size is false
          stateChange state,
            video: video
            size:  size = result[2]
        download
          percent: result[1]
          speed:   result[3]
          eta:     result[4]

    # about to start downloading video
    else if (pos = data.indexOf '[download] ') is 0
      state = 'Downloading video'
      
    # check if this is any other state
    else if (pos = data.indexOf ']') isnt -1
      state = data.substring pos + 2, data.length - 1

      # get video name
      if (pos = state.indexOf ':') isnt -1
        video = state.substring 0, pos
        state = state.substring pos + 2
      stateChange state, video
  
  youtubedl.stderr.on 'data', (data) ->
    data = data.toString()
    err = data.substring 7, data.length - 1
  
  youtubedl.on 'exit', (code) ->
    callback err


# gets info from a video
module.exports.info = (url, callback, args) ->
  # setup settings
  args = parseOpts args
  args = [
    '--get-url'
    '--get-title'
    '--get-thumbnail'
    '--get-description'
  ].concat args
  args.push url

  # call youtube-dl
  youtubedl = spawn cmd, args, spawnOptions

  err = info = false
  
  youtubedl.stdout.on 'data', (data) ->
    data = data.toString().split "\n"
    info =
      title:       data[0]
      url:         data[1]
      thumbnail:   data[2]
      description: data[3]

  youtubedl.stderr.on 'data', (data) ->
    data = data.toString()
    err = data.substring 7, data.length - 1
  
  youtubedl.on 'exit', (code) ->
    callback err, info
