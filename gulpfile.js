// Load Gulp
var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    browserify = require('gulp-browserify'),
    plugins = require('gulp-load-plugins')(),
    order = require('gulp-order'),
    minifyHtml = require("gulp-minify-html"),
    stylish = require('jshint-stylish'),
    ngHtml2Js = require("gulp-ng-html2js");

//Image Minification
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var ignore = require('gulp-ignore');

gulp.task('build-css', function() {
    return gulp.src('./app/source/less/all.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function(err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer(
            {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
                cascade: false
            }
        ))
        //.pipe(plugins.cssmin())
        .pipe(gulp.dest('build/css'))
        .on('error', gutil.log);
});

gulp.task('imagemin', function() {
    return gulp.src('./app/source/images/**')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/images'));
});

var app_entry = ['./app/source/js/app.js'];

gulp.task('build-js', function() {
    
  return gulp.src( app_entry )
    .pipe(browserify())
    //.pipe(plugins.uglify())
    .pipe(plugins.concat('scripts.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('lint', function() {
    return gulp.src('./app/source/js/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('copy-fonts', function() {
   return gulp.src(['./node_modules/bootstrap/dist/fonts/**/*.*','./node_modules/font-awesome/fonts/**/*.*'])
   .pipe(gulp.dest('build/fonts'));
});


gulp.task('default', ['lint', 'build-js', 'build-css', 'imagemin', 'copy-fonts'], function() {
    gulp.watch('./app/source/js/**/*.js', ['lint', 'build-js']);
    gulp.watch('./app/source/less/**/*.less', ['build-css']);
    gulp.watch('./app/source/view/**/*.html', ['build-js']);
});
