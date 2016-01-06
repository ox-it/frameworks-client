(function () {
    'use strict';
    var cordova = require('cordova');
    
    var plugins = [
        'cordova-plugin-device',
        //add further plugins here
    ]
    
    var platforms = [
        'ios',
        'android'
        //add further platforms here
    ]
    

    module.exports = function (grunt) {
        // load all grunt tasks
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

        // configurable paths
        var yeomanConfig = {
            app: 'www'
        };

        try {
            yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
        } catch (e) {
        }

        var device = {
            platform: grunt.option('platform') || 'all',
            family: grunt.option('family') || 'default',
            target: grunt.option('target') || 'emulator'
        };

        grunt.initConfig({
            yeoman: yeomanConfig,
            jshint: {
                gruntfile: ['Gruntfile.js'],
                files: ['www/**/*.js', 'test/**/*.js'],
                options: {
                    // options here to override JSHint defaults
                    globals: {
                        console: true,
                        module: true
                    }
                }
            },
            watchfiles: {
                all: [
                    'www/{,*/}*.html',
                    'www/js/{,*/,*/}*.js',
                    'www/css/{,*/}*.css',
                    'www/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
	                'sass/*.scss'
                ]
            },
            watch: {
                scripts: {
                    files: [
                        'www/js/**/*.js',
                        'www/css/**/*.css'
                    ],
                    tasks: ['jshint']
                },
                liveserve: {
                    options: {
                        livereload: true,
                    },
                    files: ['<%=watchfiles.all %>'],
                    tasks: ['shell:serveend', 'cordova-prepareserve']
                },
                liveemulate: {
                    files: ['<%=watchfiles.all %>'],
                    tasks: ['cordova-emulate-end', 'cordova-buildemulate']
                },
                livedevice: {
                    files: ['<%=watchfiles.all %>'],
                    tasks: ['cordova-buildrun']
                },
	            styles: {
		            files: ['<%=watchfiles.all %>'],
		            tasks: ['compass']
	            }

            },
            shell: {
                iossimstart: {
                    command: 'ios-sim launch platforms/ios/build/yoco.app --exit' + (device.family !== 'default' ? ' --family ' + device.family : ''),
                    options: {
                        stdout: true
                    }
                },
                iossimend: {
                    command: 'killall -9 "iPhone Simulator"'
                },
                serveend: {
                    command: 'killall -9 "cordova serve"'
                },
                rippleend: {
                    command: 'killall -9 "cordova ripple"'
                }
            },
	        requirejs: {
		        compile: {
			        options: {
				        mainConfigFile: "require.config.js",
				        name: "app/libs/almond/almond.js",
				        out: "app/built.js",
				        include: ['app/main'],
				        optimize: 'none'
			        }
		        }
	        },
	        compass: {
		        dist: {
			        options: {
				        config: 'config.rb'
			        }
		        }
	        },
          clean: {
              src: ["www/*", "!www/config.xml"],
	          filter: 'isFile'
          },
	        copy: {
		        main: {
			        files: [
				        {
					        expand: true,
					        src: [
						        "app/built.js",
						        "app/data/**",
						        "img/**",
						        "css/**"
					        ],
					        dest:"www" },
				        {
					        src: ["index-built.html"],
					        dest: "www/index.html"
				        }
			        ]
		        }
	        },
            jasmine: {
		        testTask: {
			        src: [
				        'app/**/*.js',
				        '!app/built.js',
				        '!app/libs/**',
			        ],
			        options: {
				        specs: 'spec/index.js',
				        helpers: 'spec/helper.js',
				        template: require('grunt-template-jasmine-requirejs'),
				        templateOptions: {
					        requireConfigFile: './require.config.js'
				        }
			        }
		        }
	        },
            cordovacli: {
                options: {
                    path: '.',
                    cli: 'cordova',
                    platforms: [device.platform]
                },
                build: {
                    options: {
                        command: 'build'
                    }
                },
                device: {
                    options: {
                        command: 'run',
                        args: ['--device']
                    }
                },
                ios: {
                    options: {
                        command: 'run',
                        args: ['--device'],
                        platforms: ['ios']
                    }
                },
                android: {
                    options: {
                        command: 'run',
                        args: ['--device'],
                        platforms: ['android']
                    }
                },
                emulate: {
                    options: {
                        command: 'run'
                    }
                },
                add_plugins: {
                    options: {
                        command: 'plugin',
                        action: 'add',  
                        plugins: plugins,
                    }
                },
                add_platforms: {
                    options: {
                        command: 'platform',
                        action: 'add',
                        platforms: platforms 
                    }
                }
            }
        });

        grunt.registerTask('cordova-buildemulate', [
	        'package',
            'cordovacli:build',
            'cordovacli:emulate'
        ]);

        grunt.registerTask('cordova-buildrun', [
	        'package',
            'cordovacli:build',
            'cordovacli:device'
        ]);
        
        grunt.registerTask('ios', [
            'package',
            'cordovacli:build',
            'cordovacli:ios'
        ]);
        
        grunt.registerTask('android', [
            'package',
            'cordovacli:build',
            'cordovacli:android'
        ]);

        grunt.registerTask('emulate', ['cordova-buildemulate']);

        grunt.registerTask('device', ['cordova-buildrun']);
        

        grunt.registerTask('default', ['emulate']);

	    grunt.registerTask('package', 'prepare file for building', ['clean', 'requirejs', 'compass', 'copy'])

        grunt.registerTask('plugins', 'cordovacli:add_plugins');
        grunt.registerTask('platforms', 'cordovacli:add_platforms');
        grunt.registerTask('setup', ['cordovacli:add_platforms', 'cordovacli:add_plugins'] );

    };
}());
