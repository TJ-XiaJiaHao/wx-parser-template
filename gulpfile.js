const gulp = require('gulp');
const path = require('path');

function run(options) {
  if (!options) {
    options = {};
  }
  if (Array.isArray(options)) {
    options = { tasks: options };
  }

  const { tasks } = options;
  if (Array.isArray(tasks)) {
    tasks.forEach((task) => {
      if (task.name) {
        const taskOptions = Object.assign({}, task);
        delete taskOptions.name;
        require(`./libs/${task.name}.js`)(taskOptions);
      }
    });
  }
}

gulp.task('default', () => {
	run(require('./gulpconfig.js'));
})
