const gulp        = require('gulp')
const browserify  = require('browserify')
const watchify    = require('watchify')
const babelify    = require('babelify')
const sass        = require('gulp-sass')
const source      = require('vinyl-source-stream')
const runSequence = require('run-sequence')
const pm2         = require('pm2')

var watching = false

/* Build Functions */
gulp.task('build:redux', function () {
    return makeBundle(watching)
})

gulp.task('build:sass', function () {
    return gulp.src('./styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'))
})

gulp.task('build:assets', function () {
    return gulp.src('./assets/**/*')
        .pipe(gulp.dest('./dist/assets/'))
})


/* Watch Functions */
gulp.task('watching', function() {
    watching = true
})

gulp.task('watch:sass', function () {   
    return gulp.watch('./styles/**/*.scss', ['build:sass'])
})

gulp.task('watch:assets', function () {
    return gulp.watch('./assets/**/*', ['build:assets'])
})


/* Start server */
gulp.task('start:server', function(cb) {
    pm2.connect(function(err) {
      if (err) {
        console.error(err);
        process.exit(2);
      }
      
      pm2.start({
        script    : 'server.js'
      }, function(err, apps) {
        pm2.disconnect();   // Disconnects from PM2
        if (err) throw err
        cb()
      });
    });
})


/* Stop server */
gulp.task('stop:server', function(cb) {
    pm2.connect(function(err) {
      if (err) {
        console.error(err);
        process.exit(2);
      }
      
      pm2.stop("all", function(err, apps) {
        pm2.disconnect();   // Disconnects from PM2
        //if (err) throw err
        cb()
      });
    });
})

/* Gulp Tasks */
gulp.task('default', function(cb) {
    runSequence(['build:redux', 'build:sass', 'build:assets'], 'stop:server', 'start:server', cb )
})

gulp.task('watch', function(cb) {
    runSequence(['watching', 'build:redux', 'build:sass', 'build:assets'], 'stop:server', 'start:server', ['watch:sass', 'watch:assets'], cb)
})


/* Browserify and Watchify functions */
function makeBundle(watching) {
    var props = {
        entries: ['app.js', 'modules/reducers.js'],
        transform: [babelify],
        extensions: ['.js', '.jsx'],
        debug: true,
        cache: {},
        packageCache: {}
    }
    if (watching)
        props.plugin = [watchify]

    var bundler = browserify(props)

    function rebundle() {
        var stream = bundler.bundle()
        return stream.on('error', function(err) {
            console.log(err.message)
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'))
    }

    bundler.on('update', function() {
        rebundle()
        console.log('Rebundling bundle of abundant bundt...')
    })

    return rebundle()
}
