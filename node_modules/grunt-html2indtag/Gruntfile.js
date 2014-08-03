/*
 * grunt-html2indtag
 * https://github.com/ohtsuy1/grunt-html2indtag
 *
 * Copyright (c) 2014 Ohtsu Yuichiro
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    html2indtag: {
      dist: {
        expand: true,
        src: ['test/**.html'],
        //dest: 'tmp/',
        ext: '.xml'
      },
      options: {
        //見出しが目立ちにくい場合は、trueにすると記号が入る
        midashialert: true
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('default', ['html2indtag']);

};
