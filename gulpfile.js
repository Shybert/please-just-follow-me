const fs = require('fs'),
  gulp = require('gulp'),
  clean = require('gulp-clean'),
  include = require('gulp-include'),
  rename = require('gulp-rename'),
  zip = require('gulp-zip')

gulp.task('clean', function() {
  return gulp.src('dist', { read: false, allowEmpty: true }).pipe(clean())
})

gulp.task(
  'build',
  gulp.series('clean', function() {
    return Promise.all([
      gulp
        .src('index.js')
        .pipe(include())
        .on('error', console.log)
        .pipe(gulp.dest('dist')),

      gulp.src('partials/*.html').pipe(gulp.dest('dist/partials')),

      gulp.src('module.json').pipe(gulp.dest('dist')),

      gulp.src('LICENSE').pipe(gulp.dest('dist')),

      gulp.src('README.md').pipe(gulp.dest('dist'))
    ])
  })
)

gulp.task('release', function() {
  let moduleInfo = JSON.parse(fs.readFileSync('module.json')),
    moduleId = moduleInfo.id,
    moduleVersion = moduleInfo.version,
    zipFileName = `${moduleId}-v${moduleVersion}.zip`

  console.log(`Packaging ${zipFileName}`)

  return gulp
    .src('dist/**/*', { base: 'dist/' })
    .pipe(rename(path => (path.dirname = `${moduleId}/${path.dirname}`)))
    .pipe(zip(zipFileName))
    .pipe(gulp.dest('.'))
})

gulp.task('default', gulp.series('build', 'release'))
