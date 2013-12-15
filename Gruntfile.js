module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-sweet.js');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sweetjs: {
      options: {
        sourceMap: true,
        nodeSourceMapSupport: true,
        modules: ['./lib/macros']
      },
      tests: {
        src: 'tests/**/*.sjs'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['tests/**/*.js']
      }
    }
  });
  grunt.registerTask('default', ['sweetjs', 'mochaTest']);
};
