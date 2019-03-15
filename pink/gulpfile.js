var gulp = require("gulp");
var del = require("del");
var plumber = require("gulp-plumber");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");
var minifyCss = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
const htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var pipeline = require("readable-stream").pipeline;
var server = require("browser-sync").create();

//очистка папки /build
gulp.task("clean", function() {
  return del("build");
});

//копирование fonts, img, js в папку /build
gulp.task("copy", function() {
  return gulp
    .src(["src/fonts/**", "src/img/**", "src/js/**"], {
      base: "src"
    })
    .pipe(gulp.dest("build"));
});

//преобразование и минификация less в css
gulp.task("css", function() {
  return gulp
    .src("./src/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(
      postcss([
        autoprefixer({
          browsers: ["last 2 versions"],
          cascade: false
        })
      ])
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(minifyCss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"));
});

//минификация html
gulp.task("minifyHtml", function() {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

//оптимизация размера изображений .png, .jpg, .svg
gulp.task("images", function() {
  return gulp
    .src("src/img/*.{png, jpg, jpeg, svg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.svgo()
      ])
    )
    .pipe(gulp.dest("build/img"));
});

//оптимизация размера изображений .webp
gulp.task("webp", function() {
  return gulp
    .src("src/img/*.{png, jpg, jpeg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
});

//svg-спрайт для иконок
gulp.task("sprite", function() {
  return gulp
    .src("src/img/sprite/**/*.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

//добавление спрайта и копирование html в папку /build
gulp.task("html", function() {
  return gulp
    .src("src/*.html")
    .pipe(posthtml([include()]))
    .pipe(gulp.dest("build"));
});

//минификация js
gulp.task("minifyJs", function() {
  return pipeline(gulp.src("js/*.js"), uglify(), gulp.dest("build"));
});

//сервер
gulp.task("server", function() {
  server.init({
    server: "build/"
  });

  gulp
    .watch("src/less/**/*.less")
    .on("change", gulp.series("css", server.reload));
  gulp.watch("src/*.html").on("change", gulp.series("html", server.reload));
});

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
