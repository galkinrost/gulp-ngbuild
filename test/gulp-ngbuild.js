var gutil = require('gulp-util');
var ngbuild = require('../index');
var File = require('vinyl');
var should = require('should');
var fs = require('fs');

it('should run a file through ngmin', function (cb) {
    var stream = ngbuild();

    var file = new File({
        path: 'app/simple_app.js',
        contents: new Buffer(fs.readFileSync('app/simple_app.js'))
    });

    stream.on('data', function (data) {
        var result = "angular.module('App.controllers', []);\n" +
            "angular.module('App', ['App.controllers']);\n";

        data.contents.toString().should.be.equal(result);
        cb();
    });

    stream.write(file);
});

