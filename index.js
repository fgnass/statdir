var fs = require('fs')
  , path = require('path')

module.exports = function(dir, cb) {
  fs.readdir(dir, function(err, files) {
    if (err) return cb(err)
    var stats = []
    files.forEach(function(name) {
      var file = path.join(dir, name)
      fs.stat(file, function(err, stat) {
        stats.push({ file: file, name: name, stat: stat, err: err })
        if (stats.length == files.length) cb(null, stats)
      })
    })
  })
}