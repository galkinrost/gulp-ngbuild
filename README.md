GULP-NGBUILD
=========

Installation
----------
```sh
npm install gulp-ngbuild
```
Usage
----------
```javascript
var gulp = require("gulp");
var ngbuild = require("gulp-ngbuild");

gulp.task("ngbuild", function () {
    gulp.src("app/app.js")
        .pipe(ngbuild())
        .pipe(gulp.dest("app_build"));
});

gulp.task("watch", function () {
    gulp.watch(["app/**/*"],["ngbuild"]);
});
```
