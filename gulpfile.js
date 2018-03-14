var gulp 		 = require('gulp');
	sass         = require('gulp-sass'),
	cssmin       = require('gulp-cssmin');
	browserSync  = require('browser-sync').create(),
	inlcludefile = require('gulp-file-include'),
	jsImport     = require('gulp-js-import'),
	del          = require('del'),
	runSequence  = require('run-sequence'), //Выполнение тасков последовательно
	jsonfile     = require('jsonfile'), //Для того чтобы считать json
	imagemin     = require('gulp-imagemin'), // Сжатие изображений
	uglify       = require('gulp-uglify'),// Сжатие JS
	args         = require('yargs').argv, // Пакет для передачи аргументов в таски через консоль
	git          = require('gulp-git'), //GULP
	fs           = require('fs'), // RENAME
	replace      = require('gulp-replace'),
	GulpSSH 	 = require('gulp-ssh'), //Загрузка на сервер
	runSequence  = require('run-sequence'), // Синхронная загрузка тасков
    XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//SASS

var configData = jsonfile.readFileSync('app/templates/config/data.json');


gulp.task('sass', function () {
	return gulp.src(['app/scss/**/*.scss', '!app/scss/custom/**/*.scss'])
			.pipe(sass())
	  		.pipe(cssmin())
			.pipe(gulp.dest('app/css'))
			.pipe(browserSync.stream());    
});

//JS IMPORT
gulp.task('js-import', function () {
  return gulp.src('app/js_app/**/**')
		.pipe(jsImport({hideConsole: true}))
		.pipe(gulp.dest('app/js'));
});

//CLEAN DIST
gulp.task('del', function () {
 del(['dist']);
});

//>  INCLUDE FILES PAGES HTML
gulp.task('file-include', function() {
  gulp.src(['app/templates/*.html', '!app/templates/footer.html', '!app/templates/header.html'])
	.pipe(inlcludefile({
	  prefix: '@@',
	  basepath: '@file',
	  context: {
		data: jsonfile.readFileSync('app/templates/config/data.json')
	  }
	})) 
	.pipe(gulp.dest('app/'));  
});
//<  INCLUDE FILES PAGES HTML


//BROWSER SYNC
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
});

//> SAVE FILES IN DIST
  gulp.task('dist', function () {
	  gulp.src('app/cms/**/*').pipe(gulp.dest('dist/cms'));
	  gulp.src('app/css/**/*').pipe(gulp.dest('dist/css'));
	  gulp.src('app/*.pdf').pipe(gulp.dest('dist/'));
	  gulp.src(['app/fonts/**/*', '!app/fonts/fonts.scss']).pipe(gulp.dest('dist/fonts'));
	  gulp.src('app/images/**/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
	  gulp.src('app/js/**/*').pipe(uglify()).pipe(gulp.dest('dist/js'));
	  gulp.src('app/views/**/*').pipe(gulp.dest('dist/views'));
	  gulp.src('app/*.html').pipe(gulp.dest('dist'));
	  gulp.src('app/mail.php').pipe(gulp.dest('dist'));
	  gulp.src('app/php/**/*').pipe(gulp.dest('dist/php')); 
});
//< SAVE FILES IN DIST

//WATCH
gulp.task('default', ['browser-sync', 'sass', 'file-include', 'js-import'], function () {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/js_app/**/*.js', ['js-import']);
	gulp.watch('app/js_app/**/*.js', browserSync.reload);
	gulp.watch('app/templates/**/*.html', ['file-include']);
	gulp.watch('app/templates/**/*.js', browserSync.reload);
	gulp.watch('app/templates/**/*.js', ['js-import']);
	gulp.watch('app/templates/**/*.scss', ['sass']);
  	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/images/**/*', browserSync.reload);
	gulp.watch('app/fonts/**/*', browserSync.reload);
});


//> LOAD PRODACTION PROJECT IN DIST ON HOSTING
var config = {
  host: '92.53.96.165',
  port: 22,
  username: 'cb58494',
  password: 'axPMbypjbl2X',
};

var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
});

//Загрузка файлов на хостинг
gulp.task('load', function () {	
	if (configData.load.dir) {
	    runSequence('del-project', 'load-project', function() {
	    	//Отправляет сообщение о закрытии проекта проектному менеджеру
	        msgLoadProject();
	    });		
	} else {
		console.log('Вы не передали путь, возможно удалите всё в этом мире(( думайте головой своей');
	}
});

//Удаляем старый проект
gulp.task('del-project', function () {
 return gulpSSH.exec(['rm -rf ~/' + configData.load.dir + '/public_html/']).on('end', function () {
  		console.log('Ваш проект удалён с хостинга');
  });	
});

//Загружаем новый проект
gulp.task('load-project', function () {
	return gulp.src(['dist/**/*'])
	.pipe(gulpSSH.dest(configData.load.dir + '/public_html')).on('end', function () {
        console.log('Ваш проект успешно загружен');
     });
});
//< LOAD PRODACTION PROJECT IN DIST ON HOSTING

//> MODULE
gulp.task('module', function () {
  var name = args.name;

	//> CREATE MODULE
	if (name) { 
	  if (typeof(name) === 'string' && name !== '') {
		createModule(name);
	  } else {
		 console.log('Извините, Вы не передали названия модуля.')   
	  }
	}
	//< CREATE MODULE
	
});

//Копируем наш репозиторий

//< GIT METHODS
function createModule (name) {
  //Клнируем структуру мод модуль с GIT
  git.clone('https://github.com/GPOINT-TYUMEN/module', {cwd: './app/templates/site/modules'}, function(err) {
	//Перемейновываем файл под название модуля
	 fs.rename('app/templates/site/modules/module', 'app/templates/site/modules/' + name, function (err) {

		//Заменяем $module на название модуля
		  gulp.src(['app/templates/site/modules/' + name + '/module.html'])
		  .pipe(replace('$module', name))
		  .pipe(gulp.dest('app/templates/site/modules/' + name + '/'));  

		//Заменяем $module на название модуля
		   gulp.src(['app/templates/site/modules/' + name + '/scss/module.scss'])
		  .pipe(replace('$module', '.' + name))
		  .pipe(gulp.dest('app/templates/site/modules/' + name + '/scss/'));                          
	  });

	  console.log('Ваш модуль успешно создан');
  });   
}

//< MODULE

//> PLUGIN
gulp.task('plugin', function () {
  var name = args.name;

	//> CREATE MODULE
	if (name) { 
	  if (typeof(name) === 'string' && name !== '') {
		createPlugin(name);
	  } else {
		 console.log('Извините, Вы не передали названия плагина.')   
	  }
	}
	//< CREATE MODULE
	
});

//Копируем наш репозиторий

//< GIT METHODS
function createPlugin (name) {
  //Клнируем структуру мод плагин с GIT
  git.clone('https://github.com/GPOINT-TYUMEN/plugin', {cwd: './app/templates/site/plugins'}, function(err) {
	//Перемейновываем файл под название плагина
	 fs.rename('app/templates/site/plugins/plugin', 'app/templates/site/plugins/' + name, function (err) {
      	console.log('Ваш плагин "' + name + '" успешно создан');             
	  }); 
  });   
}

//< PLUGIN

//> WIDGET
gulp.task('widget', function () {
  var name = args.name;

	//> CREATE MODULE
	if (name) { 
	  if (typeof(name) === 'string' && name !== '') {
		createWidget(name);
	  } else {
		console.log('Извините, Вы не передали названия виджета.')   
	  }
	}
	//< CREATE MODULE
	
});

//Копируем наш репозиторий

//< GIT METHODS
function createWidget (name) {
  //Клнируем структуру мод виджет с GIT
  git.clone('https://github.com/GPOINT-TYUMEN/widget', {cwd: './app/templates/site/widgets'}, function(err) {
	//Перемейновываем файл под название виджета
	 fs.rename('app/templates/site/widgets/widget', 'app/templates/site/widgets/' + name, function (err) {

		//Заменяем $widget на название виджета
		  gulp.src(['app/templates/site/widgets/' + name + '/widget.html'])
		  .pipe(replace('$widget', name))
		  .pipe(gulp.dest('app/templates/site/widgets/' + name + '/'));  

		//Заменяем $widget на название виджета
		   gulp.src(['app/templates/site/widgets/' + name + '/scss/widget.scss'])
		  .pipe(replace('$widget', '.' + name))
		  .pipe(gulp.dest('app/templates/site/widgets/' + name + '/scss/'));     	 	
      		console.log('Ваш виджет "' + name + '" успешно создан');             
	  }); 
  });   
}

//< PLUGIN

//> CACHE
gulp.task('init', function(){
  git.init(function (err) {
   	
  });
});



function gitAdd() {
gulp.task('add', function(){
  return gulp.src('/')
    .pipe(git.add());
});	
}
//> CACHE


//Ниже лучше не смотреть
// Реализованое очень ужасным способом отправка сообщений по ВК
var vk = {
	token: "access_token=2b319b107d8979fc7c106b940907f356e60967aaa6442199a946f801b1a52c843af95b5250f9a4ab35c5e&",
	client: "client_id=6350666&",

	methods: {
		url: function (data, method) {
			return 'https://api.vk.com/method/' + method + '?' + vk.token + vk.client + setGet(data);
		},

		user: function (nickName) {
			var data = {
				url: 'https://api.vk.com/method/users.get?' + vk.token + vk.client + 'user_ids=' + nickName + '&'
			};
			
			return ajaxGet(data);
		}

	}
}

//Отправка сообщения в вк проектному менеджеру
function msgLoadProject() {
	var project = jsonfile.readFileSync('app/templates/config/data.json').project,
		data    = {
			succes: 1
		};

	//Забираем результат обработки
	data = checkDataProject(project, data)

	if (data["succes"] === 1) {
		//Подготавливаем данные для отправки
		data = prepareDataRequest(project, data);

		//Собираем url для отправки
		data = formRequestSendMessage(data)

		//Отправляем сообщение
		ajaxGet(data);
	}
}

//Формируем запрос для отправки ajax
 function formRequestSendMessage(data) {
 	var msg = "Ваш проект успешно загружен на сайт. \n" + data.request.url + "\n Автор: " + data.request.author + "🤓🤓 \n Проектный менеджер: " + data.request.manager +  " 👻";
 	var requestData = [
 		"user_id=" + data.request.managerId,
 		"scope=+4096&",
 		"message=" + encodeURIComponent(msg),
 		"v=5.52"
 	];

 	data["url"] = vk.methods.url(requestData, 'messages.send');
 	data["callback"] = "showResponseSendMsg";
 	
 	return data;
 }
//Проверка изначальных данных
function checkDataProject(project, data) {

	if (!project.author) {
		data["succes"] = 0;
		data["message"] = 'Заполните поле author';
	}

	//Передана ли информация о проектном менеджере
	if (data["succes"] === 1) {
		if (!project.manager) {
			data["succes"] = 0;
			data["message"] = 'Заполните поле manager';
		}
	}

	//Передана ли сссылка на проект
	if (data["succes"] === 1) {
		if (!project.url) {
			data["succes"] = 0;
			data["message"] = 'Заполните поле manager';
		}
	}

	return data;
}
//Формируем запрос
function prepareDataRequest(project, data) {
	var author = {
		name: getNickName(project.author),
	};

	author["user"] = vk.methods.user(author.name);
	if (!author.user.error) {
		author.name  = author.user.response[0].first_name + ' ' + author.user.response[0].last_name;
	}

	var manager = {
		name: getNickName(project.manager),
	};

	manager["user"] = vk.methods.user(manager.name);
	if (!manager.user.error) {
		manager.name  = manager.user.response[0].first_name + ' ' + manager.user.response[0].last_name;
	}

	data["request"] = {
		author:  author.name, 
		manager: manager.name,
		managerId: manager.user.response[0].uid,
		url: project.url
	};

	if (project.sticker) {
		data["request"]["sticker"] = project.sticker;
	}

	return data;
}


function getNickName(user) {
	var nickName = user.lastIndexOf('/');

	//Если это является ссылкой
	if (nickName > 0) {
		nickName = user.slice(nickName + 1);
	} else {
		nickName = user;
	}

	return nickName;
}


//> AHAX METHODS
function ajaxGet(data) {
	// 1. Создаём новый объект XMLHttpRequest
	var xhr = new XMLHttpRequest();
	xhr.open('GET', data.url , false);
	xhr.setRequestHeader('Content-type: text/html; charset=utf-8');
	// Отсылаем запрос
	xhr.send();
	if (xhr.status != 200) {
	  // обработать ошибку
	  console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
	} else {
	  // вывести результат 
	  if (data.callback && data.callback !== '') {
	  		eval(data.callback)(JSON.parse(xhr.responseText));
	  } else {
	  	return JSON.parse(xhr.responseText); 
	  }
	}
}
//< AHAX METHODS

function showResponseSendMsg(data) {
	console.log(data);
}

function setGet(get) {
	return get.join('&');
}