module.exports = function(grunt) {
    'use strict';

    var file_list =  [
        'js/simon.js',
        'Gruntfile.js'
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                // Enforcing options
                curly: true
                // ,forin: true
                ,eqeqeq: true
                ,immed: true
                ,latedef: 'nofunc'
                ,newcap: true
                ,noarg: true
                ,noempty: true
                ,quotmark: 'single'
                // ,undef: true
                ,unused: true
                ,strict: true
                ,trailing: true
                ,browser: true
                ,globals: {
                    node: true
                    ,jQuery: true
                    ,global: true
                    ,Meteor: true
                    ,Accounts: true
                    ,_: true
                    ,Ideas: true
                    ,RouteController: true
                    ,HomeController: true
                    ,using: true
                    ,define: true
                    ,Notifications: true
                    ,Session: true
                    ,Router: true
                    ,Template: true
                    ,process: true
                }

                // Relaxing options
                ,boss: true
                ,laxcomma: true
                ,globalstrict: true
            },
            uses_defaults: file_list.concat(['Gruntfile.js'])
        },

        watch: {
            scripts: {
                files: file_list,
                tasks: ['jshint'],
                options: {
                    spawn: false
                    ,interrupt: true
                },
            },
        },
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['jshint']);

    // On file change only run jshint on the changed file not the whole thing
    grunt.event.on('watch', function(action, filepath) {
        grunt.config('jshint.uses_defaults', filepath);
    });
};