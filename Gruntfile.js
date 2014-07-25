module.exports = function(grunt) {
    grunt.initConfig({
        markdown: {
            all: {
                files: [
                    {
                        expand: true,
                        src: ['**/*.md', '!node_modules/**/*.md'],
                        ext: '.html'
                    }
                ],
                options: {
                    template: 'mytemplate.html',
                    postCompile: function(src, context) {
                        return src + "<script src='http://localhost:35732/livereload.js'></script>\n";
                    },
                    markdownOptions: {
                        gfm: true,
                        highlight: 'manual'
                    }
                }
            }
        },
        watch:{
            md: {
                files: '**/*.md',
                tasks: ['markdown'],
            },
            html: {
                files: ['**/*.html', '!kousei-sjis/**/*.html'],
                tasks: [ ],
                options: {
                    livereload: 35732
                }
            }
        },
        replace:{
            example: {
                expand: true,
                src: ['**/*.html', '!node_modules/**/*.html', '!kousei-sjis/**/*.html'],
                dest: 'kousei-sjis/',
                replacements: [{
                    from:  '<meta charset="utf-8">',
                    to: '<meta charset="sjis">'
                },
                {
                    from: /<script.*<\/script>/g, 
                    to:'<!---->'
                },
                {
                    from: /<link.*>/g, 
                    to:'<!---->'
                }
                ]
            }
        },
        utf8tosjis:{
            dist:{
                expand: true,
                src: ['kousei-sjis/**/*.html'],
                overwrite: true,
            }
        }
    });
 
    grunt.loadNpmTasks('grunt-utf8tosjis');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');
 
    grunt.registerTask("default", ["markdown",  "watch"]);
    grunt.registerTask("kousei", ["markdown", "replace", "utf8tosjis", "watch"]);
};