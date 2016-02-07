/**
 *  Shizzle Dizzle
 *  Web Starter Kit
 *  Generated on Jan-2016.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

'use strict';

import Table from 'cli-table';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import del from 'del';


const $ = gulpLoadPlugins();

// [!] Gulp BrowserSync Opts
const BROWSERSYNC_PORT = 9000;
const BROWSERSYNC_UI = 9001;
const BROWSERSYNC_DEBUG = 9002;
const BROWSERSYNC_PROXY = false;

// [!] Gulp Path Folders
const ROOT_PATH = './';
const SRC_PATH = '_src/';
const DEV_PATH = '../_dev';
const BUILD_PATH = '../build/';
const DIST_PATH = '../_dist';

// [!] Gulp Tasks Listing
gulp.task('default', () => {

  let table = new Table({
  head: [`${$.util.colors.yellow('Tasks')}`,
         `${$.util.colors.green('Description')}`]
  });

  table.push(
    { 'gulp serve': 'dizzle the browsersync, sass processor and eslint report (live-reload)' },
    { 'gulp watch': 'Watch dizzle files without server (manually reload)' },
    { 'gulp dist': 'Yo! Groove it (minify and uglify, gzip) and fire it up!' },
    { 'gulp serve:dist': 'Shizzle Dizzle, the whole thing, check the Grand Finale (run gulp dist first)' },
    { 'gulp clean': 'In case you are lazy to clean the dist folder' }
  );

  $.util.log($.util.colors.yellow('\n\n\nShizzle Dizzle Folks!\n'));
  console.log(table.toString());
});
gulp.task('help',['default']);

// [!] Global Functions
var log = (txt) => $.util.colors.yellow(txt);
var header = (txt) => $.util.log($.util.colors.yellow(txt));

// [!] Gulp Styles
gulp.task('styles', () => {

  header('Running Styles Task');

  let opts = {
    sass: {
      precision: 10
    },
    autoprefixer: {
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }
  };
  let fn = {
    notify(error) {
      $.util.beep(1);
      return {
        message: `Look in the console for details.\n[${log('Line')}] <%= error.line %>\n[${log('Error')}]\n<%= error.message %>`,
        title: "An error occurred while compiling Sass",
        wait: true
      }
    }
  };

  return gulp.src(`${SRC_PATH}/styles/**/*.scss`)
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass(opts.sass).on('error', $.notify.onError(fn.notify.bind(error))))
    .pipe($.autoprefixer(opts.autoprefixer))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(`${BUILD_PATH}/css`))
    .pipe(browserSync.stream());
});

// [!] Gulp Scripts
gulp.task('scripts', () => {

  header('Runing Script Task');

  let opts = {
    babel: {
      presets: ['es2015']
    },
    uglify: {
      compress: true
    },
    reload: {
      stream: true,
      once: true
    }
  };
  let fn = {
    notify(error) {
      $.util.beep(1);
      return {
        message: `Look in the console for details.\n[${log('FileName')}] <%= error.fileName %>\n[${log('Position')}] line <%= error.loc.line %>\n[${log('Syntax Error')}]\n<%= error.codeFrame %>`,
        title: "An error occurred while compiling JavaScript",
        wait: true
      };
    },
  };

  return gulp.src(`${SRC_PATH}/scripts/*.js`)
    .pipe($.sourcemaps.init())
    .pipe($.babel(opts.babel)).on('error', $.notify.onError(fn.notify.bind(error)))
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError())
    .pipe($.concat('main.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(`${BUILD_PATH}/js`))
    .pipe(browserSync.reload(opts.reload));
});

// [!] Gulp Vendors
gulp.task('vendors', () => {

  header('Running Vendors Script Task');

  let opts = {
    reload: {
      stream: true,
      once: true
    }
  };

  return gulp.src(`${SRC_PATH}/scripts/vendors/**/*.js`)
    .pipe($.concat('vendors.js'))
    .pipe(gulp.dest(`${BUILD_PATH}/js`))
    .pipe(browserSync.reload(opts.reload));
});

// [!] Gulp Images
gulp.task('images', () => {

  header('Running Images Task');

  let opts = {
   imagemin: {
     progressive: true,
     interlaced: true,
     // don't remove IDs from SVGs, they are often used
     // as hooks for embedding and styling
     svgoPlugins: [{cleanupIDs: false}]
   }
 };

  return gulp.src(`${DIST_PATH}/img/**/*`)
    .pipe($.if($.if.isFile, $.cache($.imagemin(opts.imagemin).on('error',(err) => {
      console.log(err);
      this.end();
    }))))
    .pipe(gulp.dest(`${DIST_PATH}/img`));
});

// [!] Gulp Serve
gulp.task('serve', ['styles', 'scripts'], () => {

  let opts = {
   browserSync: {
     port: BROWSERSYNC_PORT,
     ui: {
       port: BROWSERSYNC_UI,
       weinre: {
         port: BROWSERSYNC_DEBUG
       }
     },
     injectChanges: true,
     logFileChanges: true,
     logLevel: 'info',
     logPrefix: 'SD',
     notify: true
   }
 };

  if (typeof BROWSERSYNC_PROXY === 'string') {
    opts.browserSync.proxy = BROWSERSYNC_PROXY;
 } else {
   opts.browserSync.server = {
     baseDir: '../'
   };
 }

  browserSync(opts.browserSync);

  gulp.watch([
    '../*.html',
    '../*.php',
    '../pages/**/*.html',
    '../pages/**/*.php',
    `${BUILD_PATH}/img/**/*`,
    `${BUILD_PATH}/fonts/**/*`
  ]).on('change', browserSync.reload);

  gulp.watch([`${SRC_PATH}/styles/**/*.scss`],['styles']);
  gulp.watch([`${SRC_PATH}/scripts/**/*.js`], ['scripts']);
  gulp.watch([`${SRC_PATH}/vendors/**/*.js`], ['vendors']);

});
gulp.task('serve:dist', () => {

  header('Serve Dist');

  let opts = {
   browserSync: {
     port: BROWSERSYNC_PORT,
     ui: {
       port: BROWSERSYNC_UI,
       weinre: {
         port: BROWSERSYNC_DEBUG
       }
     },
     notify: false
   }
 };

  if (typeof BROWSERSYNC_PROXY === 'string') {
    opts.browserSync.proxy = BROWSERSYNC_PROXY;
  } else {
    opts.browserSync.server = {
      baseDir: [DIST_PATH]
    };
  }

  browserSync(opts.browserSync);
});

// [!] Gulp Watch
gulp.task('watch', () => {

  header('Watching files without refreshing');

  gulp.watch([`${SRC_PATH}/styles/**/*.scss`],['styles']);
  gulp.watch([`${SRC_PATH}/scripts/**/*.js`], ['scripts']);
  gulp.watch([`${SRC_PATH}/vendors/**/*.js`], ['vendors']);
});

// [!] Gulp Cleaner
gulp.task('clean',() => {

  header('Cleaning /dist folder');

  return del([DIST_PATH], {force: true})
    .then(paths => { console.log('Deleted files and folders:\n', paths.join('\n')); });
});

gulp.task('clean:files', () => {

  header('Cleaning files');

  return del([`${DIST_PATH}/build/css/*.css`,
              `${DIST_PATH}/build/js/*.js`,
              `!${DIST_PATH}/build/js/bundle.min.js`,
              `!${DIST_PATH}/build/css/main.min.css`],{force: true})
    .then(paths => { console.log('Deleted files and folders:\n', paths.join('\n')); });
});

// [!] Gulp Copy Dist
gulp.task('copy', () => {

  header('Copying files to dist');
  header('Optimizing CSS and JS...');

  return gulp.src(['../**/*.html',
                   '../**/*.php',
                   `${BUILD_PATH}/**`,
                   `!${DEV_PATH}/**`], {base: "../"})
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe(gulp.dest(DIST_PATH));
});

// [!] Gulp Html
gulp.task('html', () => {

  header('Optimizing Pages');

  let opts = {
    htmlmin: {
      collapseWhitespace: true,
      removeComments: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    }
  };

  return gulp.src(`${DIST_PATH}/**/*.html`)
    .pipe($.useref())
    .pipe($.if('*.html', $.htmlmin(opts.htmlmin)))
    .pipe(gulp.dest(DIST_PATH));
});

// [!] Gulp Size (gzip)
gulp.task('gzip', () => {

  let opts = {
    size: {
      title: 'build',
      showFiles: true,
      gzip: true
    },
    notify: {
      onLast: true,
      title: 'Yo! Shizzle Dizzle',
      message: () => 'Dist Completed'
    }
  };

  return gulp.src(`${DIST_PATH}/**/*`)
    .pipe($.size(opts.size))
    .pipe(gulp.dest(DIST_PATH))
    .pipe($.notify(opts.notify));
});

// [!] Gulp Dist
gulp.task('dist',() => runSequence('clean',['styles','scripts','vendors'],'copy','images','html','clean:files','gzip'));

