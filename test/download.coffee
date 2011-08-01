youtube = require '../lib/youtube-dl'


# call youtube script
youtube.download process.argv[2], './', ((state, data) ->
    console.log 'state: ' + state
    if data
      console.log 'data: ' + data
  ), ((data) ->
    console.log "Downloading: #{data.percent}%, #{data.speed}, #{data.eta}"
  ), ((err) ->
    if err
      console.log 'error: ' + err
  )
