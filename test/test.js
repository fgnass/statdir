var statdir = require('..')
  , File = statdir.File
  , should = require('should')

describe('statdir', function() {

  it('should collect stats', function(done) {
    statdir(__dirname + '/fixture', function(err, files) {
      files.should.have.length(2)
      var names = files.map(function(f) {
        f.should.have.property('path')
        f.should.have.property('name')
        f.should.have.property('stat')
        return f.name
      })
      names.should.contain('foo')
      names.should.contain('bar')
      done()
    })
  })

  it('should fail for non-existent dirs', function(done) {
    statdir(__dirname + '/foo', function(err, files) {
      should.exist(err)
      err.code.should.equal('ENOENT')
      done()
    })
  })

  it('should compare stats', function(done) {
    statdir(__dirname + '/fixture', function(err, stats) {
      statdir.diff(undefined, stats).should.eql({ added: stats })
      var fake = stats.map(function(f) { return new File(f.path, f.name, f.stat) } )
      fake[0].name += 'baz'
      fake[0].path += 'baz'
      fake[1].stat = { mtime: new Date() }
      var diff = statdir.diff(stats, fake)
      diff.added.should.have.length(1)
      diff.removed.should.have.length(1)
      diff.changed.should.have.length(1)
      done()
    })
  })

})