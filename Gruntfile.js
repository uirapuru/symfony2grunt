
module.exports = function (grunt) {

    var cssVendors = [
        'bower_components/bootstrap/dist/css/bootstrap.css',
        'bower_components/font-awesome/css/font-awesome.css',
    ];

    var lessFiles = [
        'bower_components/bootstrap/less/bootstrap.less',
        'bower_components/font-awesome/less/font-awesome.less',
        '/src/Dende/DemoBundle/Resources/less/demo.less',
    ];

    var jsVendors = [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery-ui/jquery-ui.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
    ];

    var coffeeFiles = [
        'src/Dende/DemoBundle/Resources/coffee/main.coffee',
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build:            { src: "build/assets" },
            web:              { src: [ "web/assets", "web/js", "web/css", "web/fonts", "web/images", ] },
            "dev-assets":     { src: ["!web/js/*.js", "!web/js/*.min.js", "!web/css/backend/*.css", "!web/css/backend/*.min.css"] }
        },
        watch: {
            scripts: {
                files: coffeeFiles,
                tasks: ['coffee:development'],
                options: {
                    spawn: false,
                },
            },
            styles: {
                files: lessFiles,
                tasks: ['less:development-project'],
                options: {
                    spawn: false,
                },
            }
        },
        less: {
            "development-project": {
                options: {
                    paths: [ "src", 'app/Resources' ],
                    compress: false,
                    yuicompress: false,
                    optimization: 0,
                    modifyVars: {
                        'fa-font-path': '"../dupa/dupa/cycki"'
                    },
                },
                files : {
                    "web/css/backend/project.css" : lessFiles
                }
            },
        },
        uglify: {
            production: {
                files: {
                    'web/js/vendors.min.js': 'web/js/vendors.js',
                    'web/js/project.min.js': 'web/js/project.js',
                },
            },
        },
        cssmin: {
            "production-vendors": {
                src: 'web/css/vendors.css',
                dest: 'web/css/vendors.min.css'
            },
            "production-project": {
                src: 'web/css/project.css',
                dest: 'web/css/project.min.css'
            },
        },
        coffee: {
            development: {
                files: {
                    'web/js/project.js': coffeeFiles,
                },
            },
        },
        concat: {
            "vendors.css": {
                src: cssVendors,
                dest: 'web/css/vendors.css',
                nonull: true
            },
            "vendors.js": {
                src: jsVendors,
                dest: 'web/js/vendors.js',
                nonull: true
            },
        },
        copy: {
            fonts: {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: [
                    'bower_components/font-awesome/fonts/*',
                    'bower_components/bootstrap/fonts/*',
                ],
                dest: "./web/fonts/"
            },
            images: {
                expand: true,
                flatten: true,
                cwd: '',
                filter: 'isFile',
                src: [
                    './src/**/images/**/*.{png,jpg,svg,gif}',
                    './bower_components/bootstrap/images/*.{png,jpg,svg,gif}',
                ],
                dest: "./web/images"
            },
        }
    });

    grunt.registerTask('css:development', [
        "concat:vendors.css",
        "less:development-project",
    ]);

    grunt.registerTask('js:development', [
        "coffee:development",
        "concat:vendors.js",
    ]);

    grunt.registerTask('development', [
        "css:development",
        "js:development",
        "copy:images",
        "copy:fonts",
    ]);

    grunt.registerTask('production', [
        "development",
        "cssmin:production-vendors",
        "cssmin:production-project",
        "uglify:production",
        "clean:dev-assets"
    ]);

    grunt.registerTask('default', [
        'production'
    ]);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks('grunt-contrib-watch');
};

