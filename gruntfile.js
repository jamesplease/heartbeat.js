module.exports = function( grunt ) {

  require( 'load-grunt-tasks' )( grunt );

  grunt.initConfig({

    jshint: {
      options: {
        '-W093': true,
        "es3": true
      },
      main: {
        src: 'heartbeat.js'
      }
    },

    uglify: {
      main: {
        options: {
          sourceMap: true
        },
        dest: 'heartbeat.min.js',
        src:  'heartbeat.js'
      }
    }

  });

  grunt.registerTask( 'default', ['jshint', 'uglify'] );

};