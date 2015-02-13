var test = require('tap').test

var statdir = require('..')
var File = statdir.File


test('should collect stats', function(t) {
  statdir(__dirname + '/fixture', function(err, files) {
    t.equal(files.length, 2)
    var names = files.map(function(f) {
      t.ok(f.path)
      t.ok(f.name)
      t.ok(f.stat)
      return f.name
    })
    t.ok(~names.indexOf('foo'))
    t.ok(~names.indexOf('bar'))
    t.end()
  })
})

test('should fail for non-existent dirs', function(t) {
  statdir(__dirname + '/foo', function(err, files) {
    t.ok(err)
    t.notOk(files)
    t.equal(err.code, 'ENOENT')
    t.end()
  })
})

test('should compare stats', function(t) {
  statdir(__dirname + '/fixture', function(err, stats) {
    t.error(err)
    t.equivalent(statdir.diff(undefined, stats), { added: stats, changed: [], removed: [] })
    var fake = stats.map(function(f) { return new File(f.path, f.name, f.stat) } )
    fake[0].name += 'baz'
    fake[0].path += 'baz'
    fake[1].stat = { mtime: new Date() }
    var diff = statdir.diff(stats, fake)
    t.equal(diff.added.length, 1)
    t.equal(diff.changed.length, 1)
    t.equal(diff.removed.length, 1)
    t.end()
  })
})
