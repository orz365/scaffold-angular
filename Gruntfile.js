module.exports = function (grunt) {

    grunt.loadNpmTasks("grunt-usemin")
    grunt.loadNpmTasks("grunt-contrib-concat")
    grunt.loadNpmTasks("grunt-filerev")
    grunt.loadNpmTasks("grunt-contrib-uglify")
    grunt.loadNpmTasks("grunt-contrib-cssmin")
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    var path = {
        app:'app',
        dest: 'build',
        tmp: 'tmp'
    }


    grunt.initConfig({
        path:path,

        pkg: grunt.file.readJSON("package.json"),

        clean: ['<%=path.dest%>/**/**'],

        useminPrepare: {
            html: {
                src: ['<%=path.app%>/index.html']
            },
            options: {
                dest: '<%=path.dest%>'
            }
        },
        usemin: {
            html: {
                files: {
                    src: ["<%=path.dest%>/index.html", "<%=path.dest%>/view/**/**.html"]
                }
            },
            css: "<%=path.dest%>/css/**.css",
            options: {
                assetsDirs: ['<%=path.dest%>', '<%=path.dest%>/img']
            }
        },

        copy: {
            html: {
                files: [
                    // includes files within path
                    {expand: true, cwd: "<%=path.app%>/", src: ['view/**/**.html'], dest: '<%=path.dest%>/', filter: 'isFile'},
                    {expand: true, cwd: "<%=path.app%>/", src: ['img/**'], dest: '<%=path.dest%>/', filter: 'isFile'},
                    {expand: true, cwd: "<%=path.app%>/css/", src: ['font/**'], dest: '<%=path.dest%>/', filter: 'isFile'},
                    {expand: false, src: ['<%=path.app%>/index.html'], dest: '<%=path.dest%>/index.html', filter: 'isFile'},
                ],
            }
        },
        less: {
            development: {
                options: {
                    paths: ['css/less/'],
                    compress: true
                },
                files: {
                    '<%=path.app%>/css/view.css': '<%=path.app%>/css/less/view.less'
                }
            }
        },
        filerev: {
            build: {
                files: [{
                    src: ['<%=path.dest%>/**', '!<%=path.dest%>/**/**.html']
                }]
            }
        },
        watch: {
            scripts: {
                files: ['<%=path.app%>/css/less/**/**.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                },
            },
        }

    })


    grunt.registerTask('build', [
        'clean',
        'less',
        'copy:html',
        'useminPrepare',
        'cssmin',
        'concat',
        'uglify',
        'filerev',
        'usemin'
    ]);


    grunt.registerTask("init", function () {
        grunt.log.error("this is my first talk")
    })


    grunt.registerTask("default", ["init", "build"]);
}