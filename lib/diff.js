/**
 * Compare two results previously returned statdir(). It takes the given
 * Files and puts each one into either the `added`, `removed` or `changed`
 * array of the returned object.
 */
module.exports = function(old, cur) {
  if (!old) return { added: cur, removed: [], changed: [] }

  var oldIndex = index(old)
    , curIndex = index(cur)

  return {
    added: cur.filter(function(f) { return !(f in oldIndex) }),
    removed: old.filter(function(f) { return !(f in curIndex) }),
    changed: cur.filter(function(f) {
      var o = oldIndex[f]
      return o && f.isDifferent(o)
    })
  }
}

function index(stats) {
  var idx = {}
  if (stats) stats.forEach(function(s) { idx[s.path] = s })
  return idx
}
