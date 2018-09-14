// 引入gulp
const gulp = require('gulp')
// 全局配置  因为是模块了。所以不用写.js了
// const config = require('./config/index')
// 热更新服务器
const connect = require('gulp-connect')
// 合并文件
const concat = require('gulp-concat')
// 压缩css
const minifycss = require('gulp-minify-css')
// 给css加前缀
const autoprefixer = require('gulp-autoprefixer')
// 重命名
const rename = require('gulp-rename')
// 合并文件操作流
const merge = require('merge-stream')
// 小型webpack
const webpack = require('webpack-stream')
// 自动引入依赖文件
const inject = require('gulp-inject')
// 编译sass
const sass = require('gulp-sass')
//var imagemin = require('gulp-imagemin')
var imagemin = require('gulp-smushit');//压缩img文件
gulp.task('html',function(){
	return gulp.src('html/*.html',)
		.pipe(gulp.dest('./dist/html'))
		.pipe(connect.reload())
})

gulp.task( 'imagemin',function(){
	return gulp.src('images/*')
			   .pipe(imagemin({
		            verbose: true
		        }))

//			   .pipe( imagemin() )
			   .pipe( gulp.dest('./dist/images') );
} )


gulp.task('index',function(){
	return gulp.src('index.html',)
		.pipe(gulp.dest('./dist'))
		.pipe(connect.reload())
})

gulp.task('scss',function(){
	return gulp.src('./scss/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer({// 自动加前缀
            browsers: ['last 2 versions','Safari >0', 'Explorer >0', 'Edge >0', 'Opera >0', 'Firefox >=20'],//last 2 versions- 主流浏览器的最新两个版本
            cascade: false, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        //.pipe(rename({suffix:'.min'})) //重命名
        .pipe(gulp.dest('./dist/style')) // 输出到对应的目录中
        .pipe(connect.reload())
})




gulp.task('js',function(){
	return gulp.src('./js/*.js')
		.pipe(webpack({
            mode: 'production',
            watch: true,
            module: {
                rules: [ //webpack中在这里使用各种loader对代码进行各种编译
                    {
                        test: /\.js$/, // 对js文件进行处理
                        loader: 'babel-loader', // 使用babel-loader对其进行处理
                        query: {
                            presets: ['es2015'] // 将es6编译一下
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())
})


gulp.task('json', function() {
    return gulp.src('json/*.json').pipe(gulp.dest('dist/json')).pipe(connect.reload());
});

gulp.task('watch',function(){
	gulp.watch('html/*.html', ['html','reload'])
	gulp.watch('index.html', ['index','reload'])
	gulp.watch('scss/*.scss', ['scss','reload'])
	gulp.watch('js/*.js', ['js','reload'])
	gulp.watch('json/*.json', ['json','reload'])
})

gulp.task('server', function() {
    connect.server({
        root: "./dist",
        port: 8000,
        livereload: true,
    });
});

gulp.task('reload', function(){
	return gulp.src("./dist/html/*.html") //让所有的html文件都重新加载一下
		.pipe(connect.reload());
})


gulp.task('default', [ 'server','index','imagemin','html','scss','js','json','watch']);

