const gulp = require("gulp");
// minify images
const imagemin = require("gulp-imagemin");
// minify js
const uglify = require("gulp-uglify");
// compile scss to css
const sass = require("gulp-sass");

const concat = require("gulp-concat");
// css auto prefixer
const autoprefixer = require("gulp-autoprefixer");
// auto browser reload
const browserSync = require("browser-sync").create();

/*

Gulp TOP lavel functions
1. gulp.task -> Define task.
2. gulp.src -> Point to files to use inputs folder.
3. gulp.dest -> Destinations folder Points to folder to output.
4. gulp.watch -> watch files and folder to changes

*/

// user massege for this repo

gulp.task("message", async function() {
	return console.log("wellcome to this quick repository...");
});

// copy all html files
gulp.task("html", async function() {
	gulp.src("src/*.html").pipe(gulp.dest("build"));
});

// optimize all images
gulp.task("image", async function() {
	gulp.src("src/images/*")
		.pipe(imagemin())
		.pipe(gulp.dest("build/images"));
});

// minify all js file and concat all in a single file

gulp.task("script", async function() {
	gulp.src("src/js/*.js")
		.pipe(concat("main.min.js"))
		.pipe(uglify())
		.pipe(gulp.dest("build/js"));
});

// compile scss file

gulp.task("scss", async function() {
	gulp.src("src/scss/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(
			autoprefixer({
				cascade: false
			})
		)
		.pipe(gulp.dest("build/css"));
});

gulp.task("default", gulp.series("html", "image", "script", "scss"));

gulp.task("watch", async function() {
	browserSync.init({
		server: {
			baseDir: "./build",
			index: "/index.html"
		}
	});
	gulp.watch("src/*.html", gulp.series("html")).on(
		"change",
		browserSync.reload
	);
	gulp.watch("src/images/*", gulp.series("image")).on(
		"change",
		browserSync.reload
	);
	gulp.watch("src/js/*.js", gulp.series("script")).on(
		"change",
		browserSync.reload
	);
	gulp.watch("src/scss/**/*.scss", gulp.series("scss")).on(
		"change",
		browserSync.reload
	);
});
