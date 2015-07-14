module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['content/foundation/scss', 'content/style']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'content/style/app.css': 'content/foundation/scss/foundation.scss',
          'content/style/dashboard.css': 'content/style/dashboard.scss',
          'content/style/home.css': 'content/style/home.scss',
          'content/style/bw.css': 'content/style/bw.scss',
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: ['content/style/*.scss',
        'content/style/components/*.scss',
        'content/foundation/scss/*.scss',
        'content/foundation/scss/foundation/*.scss',
        'content/foundation/scss/foundation/components/*.scss'],
        tasks: ['sass']
      },
      js : {
        files: 'content/js/**/*',
        tasks: ['concat', 'uglify']
      }
    },

    concat: {
      options: {
        separator: ''
      },
      lib: {
        src: [
          'content/js/lib/*.js',
          'content/foundation/js/foundation/foundation.js',
          'content/foundation/js/foundation/foundation.topbar.js',
          'content/foundation/js/foundation/foundation.dropdown.js',
          'content/foundation/js/foundation/foundation.reveal.js'
        ],
        dest: 'content/dis/lib.js'
      },
      templates: {
        src: 'content/templates/*.html',
        dest: 'content/dis/templates.html'
      },
      dashboard: {
          src: [
            'content/js/utils.js',
            'content/js/ko.*.js',
            'content/js/apiClient.js',
            'content/js/sortable.js',
            'content/js/segment2.js',
            'content/js/dashboard.js',
            'content/js/tempdata.js',
            'content/js/pubsub.js',
            'content/js/keypress.js',
            'content/js/notifier.js',
            'content/js/widgeteditor.js',
            'content/js/controlpanel.js',
            'content/js/tooltipcontent.js'
          ],
          dest: 'content/dis/dashboard.js'
      },
      charts: {
        src: [
          'content/js/models/*.js',
          'content/js/charts/*.js'
        ],
        dest: 'content/dis/charts.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        preserveComments: false
      },
      dist: {
        files: {
          'content/dis/<%= pkg.name %>.min.js': ['<%= concat.dashboard.dest %>','<%= concat.charts.dest %>']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('buildcss', ['sass']);
  grunt.registerTask('buildjs', ['concat', 'uglify']);
  grunt.registerTask('default', ['buildcss', 'buildjs']);
}