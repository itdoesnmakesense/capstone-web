module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['../app/**/*.js']
    },
    sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss',
          '../styles/animations.css': '../sass/animations.scss',
          '../styles/style_300.css': '../sass/style_300.scss',
          '../styles/style_600.css': '../sass/style_600.scss',
          '../styles/style_768.css': '../sass/style_768.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
    }
    }
  });
  

  // grunt.loadNpmTasks('grunt-serve');

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};