# module dependencies
{spawn}        = require 'child_process'
{EventEmitter} = require 'events'
fs             = require 'fs'
path           = require 'path'


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
parseOpts = (args) ->
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


# rounds a number to n decimal places
round = (num, n) ->
  dec = Math.pow 10, n
  Math.round(num * dec + 0.1) / dec


# converts from bytes, kb, mb, and gb to bytes
toBytes = (s) ->
  speed = parseFloat(s.substring 0, s.length - 3)
  switch s.substr(-3, 1).toLowerCase()
    when 'b'
      speed
    when 'k'
      speed * 1024
    when 'm'
      speed * 1024 * 1024
    when 'g'
      speed * 1024 * 1024 * 1024


# converts bytes to human readable unit
# thank you Amir from StackOverflow
units = ' KMGTPEZYXWVU'
getHumanSize = (bytes) ->
  return 0 if bytes <= 0
  t2 = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 12)
  (Math.round(bytes * 100 / Math.pow(1024, t2)) / 100) +
    units.charAt(t2).replace(' ', '') + 'B'


# converts ms to human readable time
getHumanTime = (ms) ->
  x = ms / 1000
  ms %= 1000
  s = Math.round(x % 60)
  x /= 60
  m = Math.round(x % 60)
  x /= 60
  h = Math.round(x % 24)
  d = Math.round(x / 24)

  str = ''
  if d > 0
    str += "#{d} day#{if d > 1 then 's'}, "
    set = true
  if set or h > 0
    str += "#{h} hour#{if h > 1 then 's'}, "
    set = true
  if set or m > 0
    str += "#{m} minute#{if m > 1 then 's'}, "
    set = true
  if set or s > 0
    str += "#{s} second#{if s > 1 then 's'}, "
  "#{str}#{ms} ms"


# main download function
regex = /(\d+\.\d)% of (\d+\.\d+\w) at\s+([^\s]+) ETA ((\d|-)+:(\d|-)+)/
module.exports.download = (url, dest = './', args = []) ->
  # setup settings
  args = parseOpts args
  args.push url

  # call youtube-dl
  youtubedl = spawn file, args, { cwd: dest }
  speed = []
  start = Date.now()
  
  video = size = state = null
  emitter = new EventEmitter()

  youtubedl.stdout.on 'data', (data) ->
    data = data.toString()

    # check if video is uploading so script can start
    # calling the download progress function
    if state is 'download' and result = regex.exec data
      if not size
        emitter.emit state,
          video: video
          size:  size = result[2]

      if result[3] isnt '---b/s'
        speed.push toBytes result[3]
      emitter.emit 'progress',
        percent: result[1]
        speed:   result[3]
        eta:     result[4]

    # about to start downloading video
    else if (pos = data.indexOf '[download] ') is 0
      state = 'download'
      
    # check if this is any other state
    else if (pos = data.indexOf ']') isnt -1
      state = data.substring pos + 2, data.length - 1

      # get video name
      if (pos = state.indexOf ':') isnt -1
        video = state.substring 0, pos
        state = state.substring pos + 2
      emitter.emit state, video
  
  youtubedl.stderr.on 'data', (data) ->
    data = data.toString()
    console.log data
    err = data.substring 7, data.length - 1
    emitter.emit 'error', err
  
  youtubedl.on 'exit', (code) ->
    averageSpeed = 0
    for i in speed
      averageSpeed += i
    averageSpeed /= speed.length

    timeTaken = Date.now() - start

    emitter.emit 'end',
      timeTakenms: timeTaken
      timeTaken: getHumanTime timeTaken
      averageSpeedBytes: round averageSpeed, 2
      averageSpeed: getHumanSize(averageSpeed) + '/s'
  
  emitter


# gets info from a video
module.exports.info = (url, callback, args = []) ->
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
  youtubedl = spawn file, args

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
