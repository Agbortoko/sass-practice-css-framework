const {src, dest, watch, series} = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const purgecss = require('gulp-purgecss'); // Purges css that you don't use (removes all the rules you don't use and makes distribution css smaller)
const sass = require('gulp-sass')(require('sass'));

function buildStyles()
{
    let processors = [
        // Autoprefixing
        autoprefixer({overrideBrowserslist: "last 3 versions"})
    ]

    return src('sass/**/*.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(purgecss({content: ['*.html']}))
        .pipe(dest('dist'))
}

function watchTask()
{
    watch(['sass/**/*.scss', '*.html'], buildStyles)
}

exports.default = series(buildStyles, watchTask)