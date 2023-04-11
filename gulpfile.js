const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const csso = require("postcss-csso");
const del = require("del");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");

//Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
      ]))
    .pipe(rename("style.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

//html

const html = () => {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
}

exports.html = html;

//Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

  exports.scripts = scripts;

//Images

const optimizeImages = () => {
  return gulp.src(["source/img/**/*.{png,jpg,svg}","!source/img/sprite.svg"])
    .pipe(imagemin([
      imagemin.mozjpeg({progressive:true}),
      imagemin.optipng({optimizationLevel:1}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
}

exports.images = optimizeImages;

const copySprite = () => {
  return gulp.src("source/img/**/*sprite.svg")
    .pipe(gulp.dest("build/img/"))
}

exports.copySprite = copySprite;

const copyImages = (done) => {
  gulp.src(["source/img/**/*.{png,jpg,svg,gif}","!source/img/sprite.svg"])
  .pipe(gulp.dest("build/img"))
  done();
}

exports.copyImages = copyImages;


//Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff,woff2}",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports. copy = copy;

//Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    browser: "firefox",
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;


// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles)).on("change", sync.reload);
  gulp.watch("source/js/script.js");
  gulp.watch("source/css/**/*.css");
  gulp.watch("source/*.html").on("change", sync.reload);
}

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    copySprite
  ),
);

exports.build = build;

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    copySprite
  ),
  gulp.series(
    server,
    watcher
  ));
