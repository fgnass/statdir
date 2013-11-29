var statdir = require('..')
  , should = require('should')

describe('statdir', function() {

  it('should collect stats', function(done) {
    statdir(__dirname + '/fixture', function(err, files) {
      files.should.have.length(2)
      var names = files.map(function(f) {
        f.should.have.property('file')
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

})