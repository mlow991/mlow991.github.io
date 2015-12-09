module.exports = function(grunt) {
	var critical = require('critical');
	var mozjpeg = require('imagemin-mozjpeg');
	grunt.initConfig({
		postcss : {
			options: {
				map: true,
				processors: [
					require('autoprefixer-core')({browsers: ['last 2 versions']})
				]
			},
			dist: {
				src: 'views/css/style.css',
				dest: 'views/css/style.css'
			}
		},

		critical: {
		    test: {
		        options: {
		            base: './',
		            css: [
		                'css/style.css',
		                'css/bootstrap-grid.css'
		            ],
		            dimensions: [{
		            	width:320,
		            	height: 100
		            },{
		            	width: 1200,
		            	height: 900
		            }]
		        },
		        src: 'index.html',
		        dest: 'dist/index.html'
		    }
		},

		responsive_images: {
		    myTask: {
		      options: {
		      	engine: 'im',
		        sizes: [{
		        	width: 100
		        },{
		        	width: 400
		        },{
		        	width: 800
		        },{
		        	width: 1200
		        }]
		      },
		      files: [{
		        expand: true,
		        src: ['views/images/**.{jpg,JPG,png}'],
		        dest: 'dist/'
		      }]
		    }
		},

		imagemin: {
			dynamic: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [{removeViewBox: false}],
					use: [mozjpeg()]
				},
				files: [{
					expand: true,
					cwd: 'dist/views/images/',
					src: ['**/*.{png,jpg,gif,JPG}'],
					dest: 'dist/views/images/'
				}]
			},
			dynamic2: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [{removeViewBox: false}],
					use: [mozjpeg()]
				},
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/img/'
				}]
			}
		},

		htmlmin: {
			main: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'dist/index.html' : 'dist/index.html',
					'dist/project-2048.html': 'project-2048.html',
					'dist/project-mobile.html' : 'project-mobile.html',
					'dist/project-webperf.html' : 'project-webperf.html',
					'dist/views/pizza.html' : 'views/pizza.html'
				}
			}
		},

		cssmin: {
			main: {
				files: [{
					expand: true,
					cwd: 'css/',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/css/',
					ext: '.css'
				}]
			},
			views: {
				files: [{
					expand: true,
					cwd: 'views/css/',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/views/css/',
					ext: '.css'
				}]
			}
		},

		uglify: {
			targets: {
				files: {
					'dist/js/perfmatters.js': ['js/perfmatters.js'],
					'dist/views/js/main.js' : ['views/js/main.js']
				}
			}
		},

	});

	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-critical');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['postcss', 'critical', 'responsive_images', 'imagemin', 'htmlmin', 'cssmin', 'uglify']);
};