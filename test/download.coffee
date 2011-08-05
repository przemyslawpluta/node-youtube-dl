youtube = require 'youtube-dl'


# call youtube script
youtube.download process.argv[2], './', ((state, data) ->
    console.log 'state: ' + state
    if data
      console.log 'data: ' + data
  ), ((data) ->
    process.stdout.write "Downloading: #{data.percent}%, #{data.speed}, #{data.eta}\r"
  ), ((err) ->
    if err
      console.log 'error: ' + err
  )
