var gulp = require('gulp');
var concat = require('gulp-concat');
var cssimport = require("gulp-cssimport");
var cssimportOptions = {};
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cleanCss = require('gulp-clean-css');
var cleanCssOptions = {compatibility: 'ie8'};
var advVars = require('postcss-advanced-variables');
var log = require('fancy-log');
var shell = require('gulp-shell');
var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
const tar = require('gulp-tar-path');
const gzip = require('gulp-gzip');
var twig = require('gulp-twig');

// fetch command line arguments
const arg = (argList => {
    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {

        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');

        if (opt === thisOpt) {
            // argument value
            if (curOpt) {
                arg[curOpt] = opt;
            }

            curOpt = null;
        } else {
            // argument name
            curOpt = opt;
            arg[curOpt] = true;
        }
    }

    return arg;

})(process.argv);  


function run(command) {
    exec(command, function (err, stdout, stderr) {
        if(stdout) {
            console.log(stdout);
        }
        if(stderr) {
            console.log(stderr);
        }
    });
}

function buildCss() {
    return gulp
        .src('styles/all.css')
        .pipe(concat('style.css'))
        .pipe(cleanCss(cleanCssOptions))
        .pipe(cssimport(cssimportOptions))
        //.pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(postcss([ advVars({
            variables: {
                // Screen Sizes
                'screen-xs': '0',
                'screen-sm': '600px',
                'screen-md': '768px',
                'screen-lg': '992px',
                'screen-xl': '1200px',

                // Standard Sizing
                'media-xs': 'screen and (max-width: 600px)',
                'media-sm': 'screen and (min-width: 600px)',
                'media-md': 'screen and (min-width: 768px)',
                'media-lg': 'screen and (min-width: 992px)',
                'media-xl': 'screen and (min-width: 1200px)',

                // Range Sizing
                'media-xs-md': 'screen and (max-width: 767px)',
                'media-md-xl': 'screen and (min-width: 768px)',
                'media-sm-xl': 'screen and (min-width: 600px)',
            }
        }) ]))
        //.pipe(sourcemaps.write('.'))
        //.pipe(gcmq())
        .pipe(gulp.dest('templates/components/'))
        .on('end', function(e) {log("    Done Building CSS!")});
}

function watchCss() {
    return gulp
        .watch('styles/**/*.css', buildCss)
        .on('change', function(e) {log("Css File Changed: " + e.path)});
}

function buildPages() {
    return gulp.src('templates/*.twig')
    .pipe(twig({data: {}}))
    .pipe(gulp.dest('bin/'));
}

function watchPages() {
    return gulp
        .watch(['build/styles/**/*.css', 'templates/*.twig'], function(){buildCss(); buildPages();})
        .on('change', function(e) {log("File Changed: " + e.path)});
}

// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
    files = fs.readdirSync(dir);
    var filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = walkSync(dir + '/' + file, filelist);
        } else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};

Array.prototype.removeIf = function(callback) {
    var i = this.length;
    while (i--) {
        if (callback(this[i], i)) {
            this.splice(i, 1);
        }
    }
};

function buildRelease() {
    version = arg.version;

    metadata = "version=" + version + ";\n";
    
    // Write metadata file
    fs.writeFile("build.metadata", metadata, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("Metadata file created.");
    }); 

    if (!version) {
        console.log("ERROR: You must supply a release number.");
        return;
    }

    console.log("Building Version: " + version)

    releaseFiles = [
        'reference/',
        'main/api/',
        'main/management/',
        'main/migrations/',
        'main/static/',
        'main/templates/',
        'main/*.py',
        'riding_tomorrow/',
        'manage.py',
        'build.metadata',
    ]

    return gulp.src(releaseFiles)
        .pipe(tar('release_' + version + '.tar'))
        .pipe(gzip())
        .pipe(gulp.dest('release/'));
}


gulp.task('build_css', buildCss);

gulp.task('watch_css', watchCss);

gulp.task('build_release', buildRelease);

gulp.task('build_pages', buildPages);

gulp.task('watch_pages', watchPages);

