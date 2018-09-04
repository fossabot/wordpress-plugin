// ==========================================================================
// Gulp build script
// ==========================================================================
/*global require, __dirname*/
/*jshint -W079 */

'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var run = require('run-sequence');
var prefix = require('gulp-autoprefixer');

var root = __dirname;

var paths = {
    src: {
        less: path.join(root, 'src/less/**/*.less'),
        js: path.join(root, 'src/js/**/*.js'),
        images: path.join(root, 'src/img/**/*'),
    },

    // Output paths
    dist: {
        css: path.join(root, 'dist/css'),
        js: path.join(root, 'dist/js'),
        images: path.join(root, 'dist/img'),
    },
};

// Task arrays
var tasks = {
    less: [],
    js: [],
    images: ['images'],
};

// Fetch bundles from JSON
var bundles = loadJSON(path.join(root, 'bundles.json'));

// Load json
function loadJSON(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch (err) {
        return {};
    }
}

var build = {
    js: function(files) {
        for (var key in files) {
            (function(key) {
                var name = 'js-' + key;
                tasks.js.push(name);

                gulp.task(name, function() {
                    return gulp
                        .src(bundles.js[key])
                        .pipe(concat(key))
                        .pipe(uglify().on('error', function(e){
                            console.log(e);
                         }))
                        .pipe(gulp.dest(paths.dist.js));
                });
            })(key);
        }
    },
    less: function(files) {
        for (var key in files) {
            (function(key) {
                var name = 'less-' + key;
                tasks.less.push(name);

                gulp.task(name, function() {
                    return gulp
                        .src(bundles.less[key])
                        .pipe(less())
                        .on('error', gutil.log)
                        .pipe(concat(key))
                        .pipe(prefix({ cascade: false }))
                        .pipe(
                            cleancss({
                                keepSpecialComments: 0,
                            })
                        )
                        .pipe(gulp.dest(paths.dist.css));
                });
            })(key);
        }
    },
    images: function() {
        gulp.task(tasks.images[0], function() {
            return gulp
                .src(paths.src.images)
                .on('error', gutil.log)
                .pipe(
                    imagemin([
                        imagemin.gifsicle({ interlaced: true }),
                        imagemin.jpegtran({ progressive: true }),
                        imagemin.optipng({ optimizationLevel: 5 }),
                        imagemin.svgo({
                            plugins: [{ removeDesc: true }],
                        }),
                    ])
                )
                .pipe(gulp.dest(paths.dist.images));
        });
    },
};

// Core files
build.js(bundles.js);
build.less(bundles.less);
build.images();

// Watch for file changes
gulp.task('watch', function() {
    // Plyr core
    gulp.watch(paths.src.js, tasks.js);
    gulp.watch(paths.src.less, tasks.less);
    gulp.watch(paths.src.images, tasks.images);
});

// Default gulp task
gulp.task('default', function() {
    run(tasks.js, tasks.less, tasks.images, 'watch');
});
