// ==========================================================================
// Gulp build script
// ==========================================================================

const fs = require('fs');
const path = require('path');
const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const log = require('fancy-log');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const prefix = require('gulp-autoprefixer');

const root = __dirname;

const paths = {
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
const tasks = {
    less: [],
    js: [],
    images: ['images'],
};

// Try and load JSON
const loadJSON = path => {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch (err) {
        return {};
    }
};

// Fetch bundles from JSON
const bundles = loadJSON(path.join(root, 'bundles.json'));

// Clean out /dist
gulp.task('clean', done => {
    del(Object.values(paths.dist).map(dir => path.join(dir, '**/*')));
    done();
});

const build = {
    js: files => {
        Object.keys(files).forEach(key => {
            const name = `js:${key}`;
            tasks.js.push(name);

            gulp.task(name, () =>
                gulp
                    .src(bundles.js[key])
                    .on('error', log)
                    .pipe(concat(key))
                    .pipe(
                        babel({
                            sourceType: 'script',
                            babelrc: false,
                            presets: [
                                '@babel/env',
                                [
                                    'minify',
                                    {
                                        builtIns: false, // Temporary fix for https://github.com/babel/minify/issues/904
                                    },
                                ],
                            ],
                        }),
                    )
                    .pipe(
                        uglify().on('error', error => {
                            log(key, error);
                        }),
                    )
                    .pipe(gulp.dest(paths.dist.js)),
            );
        });
    },
    less: files => {
        Object.keys(files).forEach(key => {
            const name = `less:${key}`;
            tasks.less.push(name);

            gulp.task(name, () =>
                gulp
                    .src(bundles.less[key])
                    .on('error', log)
                    .pipe(less())
                    .pipe(concat(key))
                    .pipe(prefix({ cascade: false }))
                    .pipe(
                        cleancss({
                            keepSpecialComments: 0,
                        }),
                    )
                    .pipe(gulp.dest(paths.dist.css)),
            );
        });
    },
    images: () => {
        gulp.task(tasks.images[0], () =>
            gulp
                .src(paths.src.images)
                .on('error', log)
                .pipe(
                    imagemin([
                        imagemin.gifsicle({ interlaced: true }),
                        imagemin.jpegtran({ progressive: true }),
                        imagemin.optipng({ optimizationLevel: 5 }),
                        imagemin.svgo({
                            plugins: [{ removeDesc: true }],
                        }),
                    ]),
                )
                .pipe(gulp.dest(paths.dist.images)),
        );
    },
};

// Core files
build.js(bundles.js);
build.less(bundles.less);
build.images();

// Watch for file changes
gulp.task('watch', done => {
    gulp.watch(paths.src.less, gulp.series(tasks.less));
    gulp.watch(paths.src.images, gulp.series(tasks.images));
    gulp.watch(paths.src.js, gulp.series(tasks.js));
    done();
});

// Default gulp task
gulp.task('default', gulp.series('clean', tasks.js, tasks.less, tasks.images, 'watch'));
