module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'server/src/**/*.js', 'client/src/**/*.js'],
            options: {
                esversion: 8,
                node: true
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
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