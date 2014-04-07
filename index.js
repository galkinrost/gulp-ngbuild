var through = require('through2');
var gutil = require('gulp-util');
var ngbuild = require('ngbuild');
var path = require('path');

var Writable = require('stream').Writable;
var CustomWritable = function () {
    Writable.call(this);
}

require('util').inherits(CustomWritable, Writable);

CustomWritable.prototype._write = function (chunk, encoding, done) {
    this.emit('data', chunk);
    done();
}


module.exports = function () {
    return through.obj(function (file, enc, done) {
        var self = this;

        if (file.isNull()) {
            this.push(file);
            return done();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-ng-build', 'Streaming not supported'));
            return done();
        }

        try {
            var contents = [];

            var readable = ngbuild.getReadable({
                content: file.contents,
                src: path.relative(__dirname, file.path)
            });

            readable.on('end', function () {
                file.contents = Buffer.concat(contents);
                self.push(file);
                done();
            });

            var writable = new CustomWritable();

            writable.on('data', function (chunk) {
                contents.push(chunk);
            });

            readable.pipe(writable);

        } catch (err) {
            this.emit('error', new gutil.PluginError('gulp-ngmin', err));
        }
    });
};