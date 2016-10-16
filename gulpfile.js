'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browsersync = require('browser-sync').create();

gulp.task('sass', () => {
    gulp.src('./scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browsersync.reload({stream:true}));
});

gulp.task('jade', () => {
    gulp.src('./*.jade')
        .pipe(jade({
            pretty: true
        }).on('error', () => {}))
        .pipe(gulp.dest('./'))
        .pipe(browsersync.reload({stream:true}));
});

gulp.task('watch', () => {
    browsersync.init({
        server: {
            baseDir: '.'
        }
    })
    gulp.watch('./scss/*.scss', ['sass']);
    gulp.watch('./*.jade', ['jade']);
})

gulp.task('default', ['sass', 'jade', 'watch']);