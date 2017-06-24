require('events').EventEmitter.prototype._maxListeners = 75;
const gulp = require('gulp');
const path = require('path');
const argv = require('yargs').argv;
const del = require('del');
const merge = require('merge2');
const $ = require('gulp-load-plugins')();

const getOptions = () => {
  const env = argv.env || argv.e || 'local';
  const target = env.toString().toLowerCase();
  const validTarget = target === 'local' || target === 'staging' || target === 'production';
  let source;

  if (validTarget) {
      source = {
        target,
        root: __dirname,
        dest: path.join(__dirname, `dist/${target}`),
      };
  } else {
    source = {
      msg: 'Usage: gulp task --env (or -e) [local | staging | production]',
      error: 'Invalid env parameter'
    };
  }

  return source;
};

const options = getOptions();

if (options.error) {
  $.util.log($.util.colors.red(options.error));
  $.util.log($.util.colors.green(options.msg));
  throw new Error(options.error);
}

gulp.task('clean', (done) => {
  let src;

  if (options.partial) {
    src = options.widgets.map(widget => path.join(options.dest, widget));
  } else {
    src = options.dest;
  }

  del(src).then(() => done());
});

gulp.task('make-html', () => {
  return gulp.src('index.html', { base: './' })
  .pipe($.htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(options.dest));
});

gulp.task('watch:html', () => {
  const glob = options.widgets.map(widget => path.join(widget, '*.html'));
  return gulp.watch(glob, ['make-html']);
});

gulp.task('copy-images', () =>
  gulp.src('assets/images/**', { base: './' })
  .pipe($.imagemin())
  .pipe(gulp.dest(options.dest)));

gulp.task('copy-audios', () =>
  gulp.src('assets/audios/**', { base: './' })
  .pipe(gulp.dest(options.dest)));

gulp.task('copy-vendor', () =>
  gulp.src('vendor/*.js', { base: './' }).pipe(gulp.dest(options.dest)));

gulp.task('copy-fonts', () =>
  gulp.src('fonts/*', { base: './' }).pipe(gulp.dest(options.dest)));

gulp.task('make-css', () =>
  gulp.src(['css/*.css'])
    .pipe($.cssnano({ discardUnused: { fontFace: false } }))
    .pipe($.concat('prototype.min.css'))
    .pipe(gulp.dest(path.join(options.dest, 'css'))));

gulp.task('watch:less', () => {
  const glob = options.widgets.map(widget => path.join(widget, 'less/*.less'));
  return gulp.watch(glob, ['make-css'])
});

gulp.task('make-js', () =>
  gulp.src('js/*.js')
    .pipe($.if(options.target !== 'local', $.uglify()))
    .pipe($.concat('app.js'))
    .pipe($.optimizeJs())
    .pipe(gulp.dest(path.join(options.dest, 'js'))));

gulp.task('watch:js', () => {
  const glob = options.widgets.map(widget => path.join(widget, 'js/*.js'));
  return gulp.watch(glob, ['make-js']);
});

gulp.task('clean-stage', () => {
  const root = '/home/victory/webapps/lindencolombia/demo/6051';
  const deleteCommand = 'rm -R *';
  const streams = merge();
  const GulpSSH = $.ssh;
  const config = {
    host: 'web611.webfaction.com',
    port: 22,
    username: 'victory',
    password: 'victoryServer~!@'
  };

  const ssh = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config,
  });

  if (options.partial) {
    for (let i = 0; i < options.widgets.length; i++) {
      const dir = path.join(root, options.widgets[i]);
      streams.add(ssh.shell([`cd ${dir}`, deleteCommand]));
    }
  } else {
    streams.add(ssh.shell([`cd ${root}`, deleteCommand]));
  }

  return streams;
});

gulp.task('upload-webfaction', () => {
  const root = '/home/victory/webapps/lindencolombia/demo/6051';
  const streams = merge();
  const GulpSSH = $.ssh;
  const config = {
    host: 'web611.webfaction.com',
    port: 22,
    username: 'victory',
    password: 'victoryServer~!@'
  };

  const ssh = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config,
  });

  if (options.partial) {
    for (let i = 0; i < options.widgets.length; i++) {
      const src = path.join('dist/staging', options.widgets[i], '**');
      const dest = path.join(root, options.widgets[i]);
      streams.add(gulp.src(src).pipe(ssh.dest(dest)));
    }
  } else {
    streams.add(gulp.src('dist/staging/**').pipe(ssh.dest(root)));
  }

  return streams;
});

gulp.task('deploy-staging', $.sync(gulp).sync([
  'clean-stage',
  ['upload-webfaction'],
  ['notify-deploy']]
));

gulp.task('deploy-internal', $.sync(gulp).sync([
  'clean-stage',
  ['upload-webfaction']]
));

gulp.task('notify-deploy', $.sync(gulp).sync(['create-notification', 'send-notification']));

gulp.task('build', $.sync(gulp).sync([
  'clean',
  ['make-html', 'copy-images', 'copy-audios', 'copy-vendor', 'copy-fonts', 'make-css', 'make-js']
]));

gulp.task('default', ['build']);
