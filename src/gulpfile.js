const gulp = require("gulp");
const ts = require("gulp-typescript");
const sass = require("gulp-sass");
sass.compiler = require('node-sass');
const tsProject = ts.createProject("tsconfig.json");

function compileTs() {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest("../"));
}

function buildCss() {
    return gulp.src(["**/*.css", "!node_modules/**"], { base: "." })
        .pipe(gulp.dest("../"));

}

function buildSass() {
    return gulp.src(["**/*.scss", "!node_modules/**"], { base: "." })
        .pipe(sass())
        .pipe(gulp.dest("../"));
}

function buildHtml() {
    return gulp.src(["**/*.html", "!node_modules/**"], { base: "." })
        .pipe(gulp.dest("../"));
}

const tsTask = gulp.series(
    compileTs);

const sassTask = gulp.series(
    buildSass
);

const cssTask = gulp.series(
    buildCss
);

const htmlTask = gulp.series(
    buildHtml
);

const build = gulp.series(
    //lintTs,
    compileTs,
    buildCss,
    buildSass,
    buildHtml,
)

function watch() {
    gulp.watch("**/*.ts", tsTask);
    gulp.watch("**/*.tsx", tsTask);
    gulp.watch("**/*.js", tsTask);
    gulp.watch("**/*.scss", sassTask);
    gulp.watch("**/*.css", cssTask);
    gulp.watch("**/*.html", htmlTask);
}

exports.default = build;
exports.build = build;
exports.b = build;

exports.ts = compileTs;
exports.css = buildCss;

exports.watch = gulp.series(build, watch);