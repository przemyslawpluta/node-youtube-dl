youtube = require 'youtube-dl'

# call youtube module
youtube.info process.argv[2], (err, info) ->
    throw err if err
    console.log 'title: ' + info.title
    console.log 'url: ' + info.url
    console.log 'thumbnail: ' + info.thumbnail
    console.log 'description: ' + info.description
