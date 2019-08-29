module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'server/src/**/*.js'],
            options: {
                esversion: 8,
                node: true
            }
        },
        eslint: {
            target: ['client/src/**/*.js', 'client/src/**/*.vue']
        },
        watch: {
            files: ['<%= jshint.files %>', '<%= eslint.target %>'],
            tasks: ['jshint', 'eslint']
        },
        exec: {
            dockerStart: "docker-compose up -d",
            dockerStop: "docker-compose stop",
            deploy: "npm run deploy"
        }
    });

    grunt.registerTask("default", ["exec:dockerStart", "watch"]);
    grunt.registerTask("stop", ["exec:dockerStop"]);
};