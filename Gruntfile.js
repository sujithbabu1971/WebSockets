module.exports = function(grunt) {

  grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
             target: {
                     files:['public/js/Sample*.js','public/css/*.css'],
                     tasks:['uglify','cssmin']
             }
        },
        cssmin: {
                 combine: {
                           files: {
                                  'public/stylesheets/combined.css': ['public/stylesheets/style.css', 'public/stylesheets/style2.css']
                                  }
                          }
        },
//        uglify: {
//                options: {
//                          mangle: false
//                         },
//                target: {
//                          files: {
//                         'public/js/combined.min.js': ['public/js/SampleJSToMinify_1.js','public/js/SampleJSToMinify_2.js']
//                                 }
//                           }
//                },
        
     // Project configuration.
        uglify: {
          dev: {
            options: {
              mangle: {
                reserved: ['jQuery']
              }
            },
            files: [{
              expand: true,
              src: ['public/js/Sample*', '!dist/assets/js/*.min.js'],
              dest: 'distribute',
              cwd: '.',
              rename: function (dst, src) {
                // To keep the source js files and make new files as `*.min.js`:
                // return dst + '/' + src.replace('.js', '.min.js');
                // Or to override to src:
            	  // This will create a distribute/public/js folder at the current location and keep the minified files there.
                return dst + '/' + src.replace('.js', '.min.js');
              }
            }]
          }
        },
  });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['watch']);
}
