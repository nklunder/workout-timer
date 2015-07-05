var gulp = require("gulp"),
  postcss = require("gulp-postcss"),
  cssnext = require("cssnext");

gulp.task("css", function() {
  var processors = [
    cssnext({
      "compress": false, //default
      "browsers": ["last 2 versions", "> 2%"]
    })
  ];

  return gulp.src("./src/css/main.css")
    .pipe(postcss(processors))
    .pipe(gulp.dest("./build/css"));
});
