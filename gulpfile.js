var gulp = require("gulp");
var ts = require("gulp-typescript");
var nodemon = require("gulp-nodemon")
var tsProject = ts.createProject("tsconfig.json");

function compileTypescript() {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
}

function start() {
  nodemon({
    script: 'dist/app.js',
    watch: ["server/"],
    ext: 'js,ts,tsx,json,jsx',
    tasks: ['compileTypescript']
  })
}

exports.default = compileTypescript
exports.compileTypescript = compileTypescript
exports.start = gulp.series(compileTypescript, start)
