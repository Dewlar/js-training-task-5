let project_folder = "build";
let source_folder = "src";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    img: project_folder + "/images/",
    js: project_folder + "/js/",
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: [source_folder + "/scss/style.scss", "!" + source_folder + "/_*.scss"],
    img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
    js: source_folder + "/js/**/*.js",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
    js: source_folder + "/js/**/*.js",
  },
  clean: "./" + project_folder + "/",
};

let { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  del = require("del"),
  fileinclude = require("gulp-file-include"),
  uglefy = require("gulp-uglify-es").default,
  clean_css = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  scss = require("gulp-sass")(require("sass"));

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/",
    },
    port: 3000,
    notify: false,
  });
}

function html(params) {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function images(params) {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function js(params) {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
    
    .pipe(
      uglefy()
    )
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function css(params) {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())

    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.js], js);
}

function clean(params) {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.js = js;
exports.images = images;
exports.css = css;
exports.watch = watch;
exports.default = watch;
exports.build = build;
exports.html = html;
