var gulp = require('gulp');
var rename = require('gulp-rename');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var consolidate = require('gulp-consolidate');
 
var fontName = 'lavaboom';
var options = {
    fontName: fontName,
    path: 'src/css-templates/_icons.css',
    targetPath: '../../dist/css/_icons.css',
    fontPath: '../fonts/icons/'
};

var optionsLess = {
    fontName: fontName,
    path: 'src/css-templates/_icons.less',
    targetPath: '../../dist/css/_icons.less',
    fontPath: '../fonts/icons/'
};

var optionsSCSS = {
    fontName: fontName,
    path: 'src/css-templates/_icons.scss',
    targetPath: '../../dist/css/_icons.scss',
    fontPath: '../fonts/icons/'
}
gulp.task('default', function(){
	debugger;
  gulp.src(['src/SVG/*.svg'])
    .pipe(iconfontCss(options))
    .pipe(iconfontCss(optionsLess))
    .pipe(iconfontCss(optionsSCSS))
    .pipe(iconfont({
    	fontName: fontName
    }))
    .on('codepoints', function(codepoints) {
    	// if you don't need sample.html, remove next 4 lines
    	process.stdout.write('bollocks');

    })
    .pipe(gulp.dest('dist/fonts/'));
})
.task('html', function(){
	gulp.src('src/html-templates/index.html')
		.pipe(consolidate('lodash', options))
		.pipe(rename({ basename:'index' }))
		.pipe(gulp.dest('dist/')); // set path to export your sample HTML
})
.task('test', function(){
  gulp.src(['src/SVG/*.svg'])
    .pipe(iconfont({ fontName: fontName }))
    .on('codepoints', function(codepoints) {
    	console.log('asd')
      var options = {
        glyphs: codepoints,
        fontName: fontName,
    	fontPath: '../fonts/icons/', // set path to font (from your CSS file if relative)
        className: 'icon' // set class name in your CSS
      };
      // gulp.src('templates/' + template + '.css')
      //   .pipe(consolidate('lodash', options))
      //   .pipe(rename({ basename:fontName }))
      //   .pipe(gulp.dest('dist/css/')); // set path to export your CSS

      // if you don't need sample.html, remove next 4 lines
      gulp.src('src/html-templates/index.html')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:'sample' }))
        .pipe(gulp.dest('dist/')); // set path to export your sample HTML
    })
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('iconfont', function() {
    gulp.src(['src/SVG/*.svg'])
        .pipe(iconfont({
            fontName: 'lavaboom'
        }))
        .on('codepoints', function(codepoints, options) {
    		process.stdout.write('bollocks');
            codepoints.forEach(function(glyph, idx, arr) {
                arr[idx].codepoint = glyph.codepoint.toString(16)
            });
            gulp.src('src/css-templates/_icons.scss')
                .pipe(consolidate('lodash', {
                    glyphs: codepoints,
                    fontName: options.fontName,
                    fontPath: '../fonts/icons'
                }))
                .pipe(gulp.dest('dist/sass'))
            ;
        })
        .pipe(gulp.dest('dist/fonts/'));
    ;
});
