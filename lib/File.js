var fs = require('fs')
  , Stats = fs.Stats

module.exports = File

function File(path, name, stat, err) {
  if (!stat) {
    stat = new Stats()
    stat.error = err
  }
  this.path = path
  this.name = name
  this.stat = stat
}

File.prototype.isDifferent = function(file) {
  return !file || +this.stat.mtime != +file.stat.mtime
}

File.prototype.toString = function() {
  return this.path
}
