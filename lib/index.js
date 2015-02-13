var fs = require('fs')
  , path = require('path')
  , diff = require('./diff')
  , File = require('./File')

/**
 * Asynchronously stat all files in the given directory and return an array
 * of statdir.File objects.
 */
module.exports = exports = function(dir, cb) {
  fs.readdir(dir, function(err, files) {
    if (err) return cb(err)
    if (!files.length) return cb(null, files)
    var stats = []
    files.forEach(function(name) {
      var file = path.join(dir, name)
      fs.stat(file, function(err, stat) {
        stats.push(new File(file, name, stat, err))
        if (stats.length == files.length) cb(null, stats)
      })
    })
  })
}

exports.diff = diff
exports.File = File
