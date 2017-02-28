'use strict';

const Gulp = require('gulp');
const BrowserSync = require('browser-sync');

const bsync = BrowserSync.create();

Gulp.task('browser-sync', () => {
    return bsync.init({
        server: {
            baseDir: './'
        },
        port: 8080
    });
});

Gulp.task('watch', ['browser-sync'], () => {
    Gulp.watch([
    	'app/**/**/*',
    	'assets/**/**/*',
    ]).on('change', bsync.reload);
});

Gulp.task('default', ['watch']);