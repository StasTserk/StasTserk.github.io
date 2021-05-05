const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

function compileTs() {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest("../"));
}

function buildCss() {
    return gulp.src("**/*.css", { base: "." })
        .pipe(gulp.dest("../"));
    // return gulp.src("styles/**/*.scss")
    //     .pipe(sass())
    //     .pipe(gulp.dest("dist/styles"));
}

function buildHtml() {
    return gulp.src(["**/*.html"], { base: "." })
        .pipe(gulp.dest("../"));
}

const tsTask = gulp.series(
    compileTs);

const sassTask = gulp.series(
    buildCss
);

const htmlTask = gulp.series(
    buildHtml
);

const build = gulp.series(
    //lintTs,
    compileTs,
    buildCss,
    buildHtml,
)

function watch() {
    gulp.watch("**/*.ts", tsTask);
    gulp.watch("**/*.scss", sassTask);
    gulp.watch("**/*.css", sassTask);
    gulp.watch("**/*.html", htmlTask);
}

exports.default = build;
exports.build = build;
exports.b = build;

exports.ts = compileTs;
exports.css = buildCss;

exports.watch = gulp.series(build, watch);