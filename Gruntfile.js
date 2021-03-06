module.exports = function(grunt) {
    grunt.initConfig({
        markdown: {
            all: {
                files: [
                    {
                        expand: true,
                        src: ['**/*.md', '!node_modules/**/*.md', '!**/ignore/**/*.md'],
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
                files: ['**/*.md', '!**/ignore/**/*.*'],
                tasks: ['markdown'],
            },
            html: {
                files: ['**/*.html', '!kousei-sjis/**/*.html', '!**/ignore/**/*.html'],
                tasks: [ ],
                options: {
                    livereload: 35732
                }
            },
        },
        replace:{
            example: {
                expand: true,
                src: ['**/*.html', '!node_modules/**/*.html', '!kousei-sjis/**/*.html', '!**/ignore/**/*.html', '!**/mytemplate.html'],
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
        // utf8tosjis:{
        //     dist:{
        //         expand: true,
        //         src: ['kousei-sjis/**/*.html', '!**/mytemplate.html', '!**/ignore/**/*.html'],
        //         overwrite: true,
        //     }
        // },
        html2indtag: {
            dist: {
                expand: true,
                src: ['**/*.html', '!node_modules/**/*.html', '!mytemplate.html', '!kousei-sjis/**/*.html', '!**/ignore/**/*.html'],
                ext: '.xml'
            },
            options: {
                //見出しが目立ちにくい場合は、trueにすると記号が入る
                midashialert: true
            }
        }
    });
 
    // grunt.loadNpmTasks('grunt-utf8tosjis');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-html2indtag');
 
    grunt.registerTask("default", ["markdown", "html2indtag", "watch"]);
    grunt.registerTask("kousei", ["markdown", "replace", "utf8tosjis"/*, "watch"*/]);
    grunt.registerTask("xml", ["markdown", "html2indtag"]);
};