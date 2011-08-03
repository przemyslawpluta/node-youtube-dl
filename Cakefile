{spawn, exec} = require('child_process')

task 'build', 'Build project from src/*.coffee to lib/*.js', ->
  exec 'coffee -o lib -c src', (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr

task 'watch', 'Build and watch for changes', ->
  child = spawn 'coffee', ['-w', '-o', 'lib', '-c', 'src']
  child.stdout.on 'data', (data) ->
    console.log data.toString().replace /\s+$/, ''
  child.stderr.on 'data', (data) ->
    console.log data.toString()
