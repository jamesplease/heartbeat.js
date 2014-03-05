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
    },

    connect: {
      mocha: {
        options: {
          base: [ './', './src', 'tests' ],
          debug: true,
          open: true,
          keepalive: true
        }
      }
    },

    blanket_mocha : {    
      test: {
        src: ['tests/index.html'],                
        options: {    
          threshold: 70,
          globalThreshold: 70,
          log: true,
          logErrors: true
        }                
      }      
    }

  });

  grunt.registerTask( 'default', ['jshint', 'blanket_mocha', 'uglify'] );

};