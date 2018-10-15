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
const streamCombiner = require('stream-combiner');

const root = __dirname;
const pluginSuffix = '-ecommerce';

// Get a list of directories
const directories = (dir = root) => fs.readdirSync(dir).filter(file => fs.statSync(path.join(dir, file)).isDirectory());

// Get plugin folders
const plugins = directories()
    .filter(folder => folder.endsWith(pluginSuffix))
    .map(folder => ({
        name: folder.replace(pluginSuffix, ''),
        src: path.join(root, folder),
        dest: path.join(root, folder),
    }));

// Relative paths
const paths = {
    src: {
        less: 'src/less/**/*.less',
        images: 'src/img/**/*',
        js: 'src/js/**/*.js',
    },

    // Output paths
    dist: {
        css: 'dist/css',
        js: 'dist/js',
        images: 'dist/img',
    },
};

// Allow multiple destinations
const dest = paths => streamCombiner(paths.map(path => gulp.dest(path)));

// Task arrays
const tasks = {
    less: [],
    js: [],
    images: [],
};

// Try and load JSON
const loadJSON = path => JSON.parse(fs.readFileSync(path));

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
                    .pipe(dest(plugins.map(plugin => path.join(plugin.dest, paths.dist.js)))),
            );
        });
    },
    less: files => {
        plugins.forEach(plugin => {
            Object.keys(files).forEach(key => {
                const name = `less:${plugin.name}:${key}`;
                tasks.less.push(name);

                gulp.task(name, () =>
                    gulp
                        .src(path.join(plugin.src, bundles.less[key]))
                        .on('error', log)
                        .pipe(less())
                        .pipe(concat(key))
                        .pipe(prefix({ cascade: false }))
                        .pipe(
                            cleancss({
                                keepSpecialComments: 0,
                            }),
                        )
                        .pipe(gulp.dest(path.join(plugin.dest, paths.dist.css))),
                );
            });
        });
    },
    images: () => {
        const folders = plugins.slice(0);

        folders.unshift({
            name: 'global',
            src: root,
        });

        folders.forEach(plugin => {
            const name = `images:${plugin.name}`;
            tasks.images.push(name);

            let output;

            if (plugin.name === 'global') {
                output = dest(plugins.map(plugin => path.join(plugin.dest, paths.dist.images)));
            } else {
                output = gulp.dest(path.join(plugin.dest, paths.dist.images));
            }

            gulp.task(name, () =>
                gulp
                    .src(path.join(plugin.src, paths.src.images))
                    .on('error', log)
                    .pipe(
                        imagemin([
                            imagemin.gifsicle({ interlaced: true }),
                            imagemin.jpegtran({ progressive: true }),
                            imagemin.optipng({ optimizationLevel: 5 }),
                            imagemin.svgo({
                                plugins: [
                                    {
                                        removeDesc: true,
                                        removeViewBox: false,
                                    },
                                ],
                            }),
                        ]),
                    )
                    .pipe(output),
            );
        });
    },
};

// Core files
build.js(bundles.js);
build.less(bundles.less);
build.images();

// Watch for file changes
gulp.task('watch', done => {
    // gulp.watch(paths.src.less, gulp.series(tasks.less));
    // gulp.watch(paths.src.images, gulp.series(tasks.images));
    // gulp.watch(paths.src.js, gulp.series(tasks.js));
    done();
});

// Default gulp task
gulp.task('default', gulp.series('clean', gulp.parallel(tasks.js, tasks.less, tasks.images), 'watch'));
