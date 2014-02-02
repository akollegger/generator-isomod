// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {
  // Show elapsed time at the end
  require('time-grunt')(grunt);
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        expand: true,
        flatten: true,
        sourceMap: true,
        src: ['src/*.coffee', 'src/*.coffee.md'],
        dest: 'build/',
        ext: '.js'
      },
    },
    coffeelint: {
      app: ['src/*.coffee'],
      options: {
        'no_trailing_whitespace': {
          'level': 'ignore'
        },
        'max_line_length': {
          'value': 120
        }
      }
    },
    mochaTest: {
      all: {
        options: {
          ui: 'bdd',
          require: ['coffee-script', 'should'],
          reporter:'spec',
        },
        src: ['test/**/*.coffee']
      } 
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      test: {
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'mochaTest']
      },
      test: {
        files: '<%%= jshint.test.src %>',
        tasks: ['jshint:test', 'mochaTest']
      }
    },
    requirejs: {
      compile: {
        options: {
          // All paths will be relative to this baseUrl
          baseUrl: "build",
          // Tells r.js that you want everything in one file
          out: "dist/<%%= pkg.name %>.js",
          // Set paths for modules (optional, just less typing)
          paths: {
            almond: '../bower_components/almond/almond'
          },
          // This lines tells r.js to include "almond" and the module assembly into the final file
          // specified in out property above
          include: ['almond', '<%%= pkg.name %>-module'],
          // Adds compatibility for AMD, CommonJS and Browser globals
          wrap: {
            startFile: 'src/_start.js',
            endFile: 'src/_end.js'
          },
          // No minification will be done. Switch to uglify for that.
          // optimize: 'uglify2',
          optimize: 'none',
          // Remove Comments
          preserveLicenseComments: false,
          // Add source maps to the original modules
          generateSourceMaps: true
        }
      }
    },
    clean: {
      build: ['dist', 'build', 'docs']
    },
    sync: {
      options: {
        include: ['name', 'version', 'main', 'dependencies']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['coffeelint', 'coffee', 'jshint', 'requirejs', 'mochaTest']);

};