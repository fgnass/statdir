## statdir

Asynchronously collect the `fs.Stats` for all files in a directory.
The function is non-recursive.

[![Build Status](https://travis-ci.org/fgnass/statdir.png?branch=master)](https://travis-ci.org/fgnass/statdir)
### Usage

```js
  var statdir = require('statdir')
  statdir(__dirname, function(err, files) {
    console.log(files)
  })
```

The callback receives an array of `File` with the following properties:

* `name` The file's basename
* `path` The file's absolute path
* `stat` fs.Stats instance

If a `fs.stat()` call fails the `stat` instance will have an `error` property.
File objects have a `toString()` method that returns the absolute path.

### Comparing snapshots

You can call `statdir.diff()` to compare two directory snapshots. The function
returns an object with all `added`, `removed` and `changed` files.

```js
  var statdir = require('statdir')
  var dir = '/some/directory'

  statdir(dir, function(err, stats1) {

    // wait 10s and take another snapshot ...
    setTimeout(function() {

      statdir(dir, function(err, stats2) {

        // compare the two arrays:
        var diff = statdir.diff(stat1, stat2)

        console.log(diff.added)
        console.log(diff.removed)
        console.log(diff.changed)
      })

    }, 10000)
  })
```

### The MIT License (MIT)

Copyright (c) 2013-2015 Felix Gnass

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
