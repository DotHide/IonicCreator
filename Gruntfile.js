module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    yeoman: {
      app: 'app',
      dist: 'www'
    },

    shell: {
      ionic: {
        command: 'ionic serve -w chrome'
      }
    },

    concurrent: {
      serve: {
        tasks: [],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    parallel: {
      ionic: {
        tasks: [{
          stream: true,
          cmd: 'ionic',
          args: ['serve', '-w', 'chrome']
        }, {
          grunt: true,
          args: ['watch']
        }]
      }
    },

    watch: {
      index: {
        files: ['<%= yeoman.app %>/index.html'],
        tasks: ['copy']
      }
    },

    copy: {
      app: {
        expand: true,
        cwd: '<%= yeoman.app %>',
        dest: '<%= yeoman.dist %>',
        src: [
          '**/*'
        ]
      }
    }
  });

  // Default Task, can run it just use grunt
  grunt.registerTask('serve', function() {
    // grunt.config('concurrent.serve.tasks', ['shell:ionic', 'watch']);
    grunt.task.run([
      'copy',
      // 'concurrent:serve',
      'parallel:ionic'
    ]);
  });

};
