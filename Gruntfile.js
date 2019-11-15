let gmailAuthPath = `${__dirname}/server/src/gmailAuth.js`;

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-prompt');

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
        },
        prompt: {
            init: {
                options: {
                    questions: [
                        {
                            type: 'input',
                            config: 'user',
                            message: "What's your gmail address? (leave it blank if you don't want to send invitation)",
                        },
                        {
                            type: 'input',
                            config: 'pass',
                            message: "What's your gmail password? (leave it blank if you don't want to send invitation)",
                        }
                    ],
                    then: (answers) => {
                        let gmailAuth = `
                            module.exports = {
                                user: '${(answers.user || '')}',
                                pass: '${(answers.pass || '')}'
                            };
                        `;
                        grunt.file.write(gmailAuthPath, gmailAuth);
                        grunt.log.writeln("Successfully created gmailAuth");
                    }
                }
            }
        }
    });

    grunt.registerTask("default", () => {
        if (!grunt.file.exists(gmailAuthPath)) {
            grunt.task.run("prompt:init");
        }
        grunt.task.run(["exec:dockerStart", "watch"]);
    });

    // grunt.registerTask("default", ["exec:dockerStart", "watch"]);
    grunt.registerTask("stop", ["exec:dockerStop"]);
    grunt.registerTask("init", ["prompt:init"]);
};