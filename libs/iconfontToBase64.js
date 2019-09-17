/**
 *  字体转base64
 */
const path = require('path');
const gulp = require('gulp');

const plugins = {
    inlineFonts: require('gulp-inline-fonts'),
    merge: require('merge-stream'),
    concat: require('gulp-concat'),
}


module.exports = (options) => {
    const {
        taskName = 'iconfontToBase64',
        src,
        dest,
        watch,
        taskHandler = () => {
          const fontStream = plugins.merge();
          return fontStream.add([gulp.src(path.join(src, '*.ttf'))
                    .pipe(plugins.inlineFonts({ name: 'symbols', weight: 'normal', formats: ['ttf'] })), gulp.src(path.join(src, '*.scss'))])
                    .pipe(plugins.concat('symbols.scss'))
                    .pipe(gulp.dest(dest));
        },
    } = options;

    return taskHandler()

    if (watch) {
        gulp.task(`${taskName}:watch`, [taskName], () => {
            gulp.watch(src, [taskName]);
        });
    }
};
