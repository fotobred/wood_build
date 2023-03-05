/*
		toools  v_05
		
*/

var gcc = 0; // "глобальный" счетчик
function gc() {
	gcc++;
	return '--> '+gcc+' <-- ';
}

function cl(x){
	console.log ( gc() + x );
}; 
	

// функция getPosition() получает текущие координаты курсора
function getPos(e){
	var x = y = 0;
	if (!e) {
		var e = window.event;
	}
	if (e.pageX || e.pageY){
		x = e.pageX;
		y = e.pageY;
	} else if (e.clientX || e.clientY){
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	return {x: x, y: y};
};

function pI( px ){		// преобразователь строки (с пикселами)  в числа
	var px = px || '' ;
	alert('  Удалить pI ');  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	var res = parseInt( px, 10 ) ;
	if ( isNaN(res)) { res = 0; }  // для IE 
	return res ;
};

function firstNode(o){   //  возврат первого узла (ветви) дерева
	var k = Object.keys(o);
	return k[0];
};
	
// замена '<' '>' в строках
function filtrTag(msg){			
	if ( ( typeof (msg) == "string" ) 	// проверять только в строке
	&& ( msg.indexOf('<') >= 0 || msg.indexOf('>') >= 0  ) ) {	// если они есть
		msg = msg.replace( /</g, "&#060" ) ; 	
		msg = msg.replace( />/g, "&#062" ) ; 	
	};
	return(msg);
};

// убираем теги <br> <p> из строки
function filtrBR(msg){			
	if ( ( typeof (msg) == "string" ) 	// проверять только в строке
	&& ( msg.indexOf('<br>') >= 0  ) ) {	// если они есть
		msg = msg.replace( /<p>/gi, " /p/ " ) ;
		msg = msg.replace( /<br>/gi, " /br/ " ) ;
	};
	return(msg);
};

function isFunc(func){
	if ( typeof func == 'function' ) {
		return true;
	};
	return false;
};

//  - крутим картинку - идет загрузка
function ShowLoad(j) {  
	if ( j == 1 || j == 'load' || j == 'Load' || j == 'LOAD' ) {	
		cl("----showLoad---1--- LOAD") ;  
		$("#showLoad").removeClass("hide") ;  
	} else {
		cl("----showLoad------ END") ;  
		$("#showLoad").addClass("hide") ;
	};
};

	
	function Wind(id, name){
		this.id = id;
		this.name = name;
		this.width = '';
		this.height = '';
		this.color = '#333';
		this.border = '0.2em solid #eee';
		return;
	};

	function outObject( winds, tabs ){ //  to #nav  ??? не помню
		var tabs = tabs ? tabs : '';
			tabs = tabs + '&emsp;&emsp;' ;
		for ( var key in winds ) {
			if ( ( typeof  winds[key] ) != 'object' ) {
				$('#nav').html( ( $('#nav').html() )+'<hr>'+tabs+( key )+ ': ' +( winds[key] ) );
			} else {	
				$('#nav').html( ( $('#nav').html() )+'<hr>'+tabs+( 'Object:: <b>'+key+'</b>' ) );
				outObject( winds[key], tabs );
			}
			// console.log( winds[key] );
		};
	};

	//  вывод содержимого Хеша : разбор информации 
	function openArr_outHash( X, nX ){ // X - хеш , nX - имя хеша для вывода
		var out = i = iX = ''  ;
		var	nX = nX ? nX : '';
		
		for( i in X ) {							// перебор записей
			if( typeof(X[i] ) == "object" ) {	// если имеем 'object'
				iX = nX  + i + '.';				// дополняем  имя
				openArr_outHash( X[i], iX );	// переходим на следующий уровень
			} else {
				if( X[i] ) {			// если есть элемент - разбираем
					out =  X[i]  ;		// значение
					if( isFunc(out) ){ 
						out = " is function";	// функцию только объявляем
					} else { 
						out = filtrTag( out );	//	преобразуем теги в коды
					};
					out = "<span>" + nX +  i + " = <b>" + out + "</b></span><br>"  ; // оформляем результат
					$('.outHash.new').append( out ) ;	// публикуем результат
				};			
			};
		};
	};
	
	//  вывод содержимого Хеша
	function outHash( X, nX){		 	//  X - хеш , nX - имя хеша для вывода
		if ( CFG.test > 0 ) {			// если установлен режим тестирования
			var out = '' ;
			nX = nX ? nX : '_';
			nX = nX+':'
			$('#cmdW').append( '<div class="outHash new"></div>' ) ;
			openArr_outHash( X, nX );
		};
		$('.outHash.new').removeClass( 'new' ) ;
	} ;	   //  outHash


	var Morf = Morf || {};
		
	Morf = {	
		
		name: 'I em Morf',
		db: {},
		
		check: function() { 
			console.log ( 'Morf.check ' );
		},
		
		tools: {

		// исполнение клика по правой клавише
			rightClick: function( x ){
				var txt = '',
					templ = '';
				console.log ( 'rightClick: \n в режиме:'+ x.reg + '\n по: ' + x.path +' ( '+ x.type+' )' ) ;	
				if( x.type == 'DIR' ){
					templ = Morf.templ.rightClickMenu_DIR;	// шаблон оформления для клика по разделу
				} else {
					templ = Morf.templ.rightClickMenu;	// шаблон оформления
				};
				$( '.rightClick' ).removeClass('rightClick');
				$( x.that ).addClass('rightClick');
				txt =  Morf.tools.decorateArr(	//	оформление контекстного меню
					{	reg : x.reg,			//  доп. информация для меню
						path: x.path,			//	доп. информация для меню
						coord_x: x.coord.x,		//	координата x клика для привязки меню
						coord_y: x.coord.y		//	координата y клика для привязки меню
					},
					templ	// шаблон оформления
				);
				$( '#cntxMenu' ).css('left', x.coord.x+'px' ) 	// подставляем меню к элементу
						.css('top', x.coord.y+'px' ) 			// подставляем меню к элементу
						.html( txt );							// заполнение меню
				$( '#cntxMenu' ).show('fast') 					// показ меню
				$( '#all' ).addClass('cntxMenu' );				// по клику вне меню - закрываем его
			},  // исполнение клика по правой клавише

		// исполнение клика по элементу  - показ 
			oneClick: function( x ){
			//	alert ( 'в режиме:'+ x.reg + '\n кликнули по: ' + x.path+'\n типа: ' + x.type ) ;	
				var type = x.type
					co_l = 0,
					co_t = 0;
				type = type.toLowerCase();
				$( '#showZone' ).empty().attr('type', '');	
				if( type == '.gif' || type == '.jpg' || type == '.jpeg' || type == '.png' || type == '.apng'   ){
					content = '<img class="sZ" src="'+Morf.path_root+x.path+'" >';
					$( '#showZone' ).attr('type', 'img').html( content );	
					$( '#showZ' ).show('fast');
//					$( '#showZ' ).css('display','block');
				} else if ( type == '.pdf' ){
					content = '<object><embed src="'+Morf.path_root+x.path+'" width="100%" height="100%"/></object>' ;
					$( '#showZone' ).attr('type', 'pdf').html( content );	
					$( '#showZ' ).show('fast');

				} else if ( type == '.avi' || type == '.mkv' || type == '.mp3' || type == '.mp4' || type == '.mpg' || type == '.ogg' || type == '.ogv' ){
					var mime='';
					switch( type ){
						case '.avi': mime='video/avi'; break;
						case '.mkv': mime='video/x-matroska'; break;
						case '.mp3': mime='audio/mp3'; break;
						case '.mp4': mime='video/mp4'; break;
						case '.mpg': mime='video/mpg'; break;
						case '.ogg': mime='video/ogg'; break;
						case '.ogv': mime='video/ogv'; break;
					
					};
					content = '<video controls width="400" height="300"><source src="'+Morf.path_root+x.path+'" type="'+mime+'" /></video>' ;
					$( '#showZone' ).attr('type', 'video').html( content );	
					$( '#showZ' ).show('fast');


				//	content = '<video controls width="400" height="300"><embed src="'+Morf.path_root+x.path+'" type="video/avi" /></video>' ;
				//	content = '<video controls width="400" height="300" src="'+Morf.path_root+x.path+'" type="video/avi" />' ;

				} else if ( type == '.txt' || type == '.htxt' || type == '.htm' || type == '.html' || type == '.link'  || type == '.rus'  || type == '.db'  || type == '.thems'  || type == '.css' || type == '.db' || type == '.dbs'   ){
					$.ajax({
					  url: Morf.path_root+x.path,
					  dataType: 'text',
					  success: function (data) {
						data = filtrTag( data );
						$( '#showZone' ).attr('type', 'txt').html( '<pre>'+data+'</pre>' );
					  }
					});					
					$( '#showZ' ).show('fast');	
				} else { return 0; };
/*				wm = parseInt( $( '#showZone .sZ' ).width() , 10 );
				wb = parseInt( $( '#showZ'      ).width() , 10 );
				hm = parseInt( $( '#showZone .sZ' ).height(), 10 );
				hb = parseInt( $( '#showZ'      ).height(), 10 );
				console.log( 'oneClick: \nr='+wb+' - '+wm+'\nt='+hb+' - '+hm );
*/			},  // исполнение клика по элементу
			
		// преобразование в целое
			toNum: function( x ){
				return ( parseInt( x, 10 ) ) ;	
			},  // преобразование в целое

		//  показ дерева  // передаю в функцию объект - дерево с параметрами вывода
			outTree : function( oTree ){
		//		console.log ( 'It is outTree' );           
				var 
					tree	= oTree.tree,		//	обрабатываемое дерево/ветвь/узел
					trg 	= oTree.trg ? '#' + oTree.trg : '#navW',	// "окно" вывода && указание элемента/узла в который добавляется новый узел
					tt		= trg + ' a:last ',	// добавдение текста в title
					tabs	= oTree.tabs  ? oTree.tabs  : '',	// оформление отступа '&emsp;  &mdash;&mdash; &#9745;&#974;' ;
					level	= oTree.level ? oTree.level : 0,	// уровень вложенности
					path	= oTree.path  ? oTree.path  : '',	//  "адрес" узла
					parNode = {};
					titl	= '' ,
					title	= '' ,
					txt		= '' ;				// 	текстовый буфер
				
					
				
				for ( var key in tree.child ) {	// перебор дочерних узлов текущего объекта / узла
					if ( ( tree.child[key].param.type ) == 'DIR' )  { // перебор дочерних узлов текущего объекта / узла
					
						//  title узла
						for ( var ky in  tree.child[key].param ) {	// перебор свойств объекта для title узла
							title = title+( ky )+ "=" +( tree.child[key].param[ky] )+",\n " ;
						} ;
						// убираю последнюю запятую и перенос строки, и добавляю в титл
						title = title.substr( 0, title.lastIndexOf(',') ); 
						
						// оформление дерева каталогов
						txt_t = Morf.tools.decorateArr( 
							 {
								key   : key ,
								trg   : trg ,
								level : level ,
								key   : key,
								title : title,
								tabs  : tabs,
								path  : tree.child[key].param.path,
								name  : tree.child[key].param.name 
							}, 
						Morf.templ.navFileTree )						
						
						
						$(trg).append( txt_t );
					
						Morf.tools.outTree( {
								tree: tree.child[key],	// обрабатываемое дерево/ветьвь/узел
								path: key,			// "адрес" узла
								trg: 'tree_'+key,	// "окно" вывода
								level: level+1,		// уровень вложенности
								tabs: tabs			// оформление отступа '&emsp;  &mdash;&mdash; &#9745;&#974;' ;
							}	
						);  
						$(trg).append( '</div>' );
					};
				};
				// отмечаем "родительские" узлы на дереве
				$(".tree_node").parent("div.tree_node").attr("parent","yes");

				return;
			},  // function outTree -  показ дерева

		// блок "хлебный крошек"
			breadСrumb : function( oTree ){
				cl( "breadСrumb:oTree " );  
				console.log( oTree );  				
				var 
					tree	= oTree.tree ,		//	обрабатываемое дерево/ветвь/узел
					tp		= tree.param ,		//	сокращение
					trg 	= oTree.trg ? '#' + oTree.trg : '#workW',	// "окно" вывода
					path 	= tp.dir ? tp.dir : tp.path ,	// путь к узлу в дереве
					id_tree = '',
					stepS 	= [],
					txt 	= '';				// 	текстовый буфер				
				
	//			alert( 'breadСrumb : path ['+ path +']; length: ' + path.length );  
	//			console.log( 'breadСrumb : path ['+ path +']; length: ' + path.length );  
	//			console.log( oTree );  
				$( trg+" #path").html( Morf.templ.breadСrumb_File_0 ); // корневая(0) точка "пути"
				if ( !!path && path.length > 0 ) {		// если есть путь к узлу, то	
					stepS = path.split('/');			// делим путь на шаги,
					path = '';
					stepS.forEach( function( step ){	// Цикл по шагам 
						if( step ) { 					// если шаг не пустой,
							path = path + '/' + step ;	// собираем новый путь
							if ( id_tree != '' ) { id_tree = id_tree + '∫' ; };
							id_tree = id_tree + step ;
		//					console.log( 'breadСrumb : step: '+step+'  path: '+path+'  id_tree: '+id_tree  ); 
		//					console.log( tree );
							$('a.last').addClass('node').removeClass('last'); //  переоформляем строку "крошек"
							var crumb = {} ;
								crumb.step  = step ;
								crumb.id_tree  = id_tree ;
								crumb.path = path;
							txt = Morf.tools.decorateArr( crumb, Morf.templ.breadСrumb_File ); // переход на узел
							$(trg+" #path").append( txt );
						};
					});
				};
			},
			
			// переносим в "большое" дерево новое содержимое, кроме папок/разделов
			noDir : function( inp ){
				var big = inp.big,	// большое дерево
					nw  = inp.nw,	// новое содержимое
					i	= 0 ;
				//	console.log( gc()+"noDir -------------------- " );
				//	console.log( big );
				for ( var key in nw ) {	// перебор "нового содержания"
					 t = nw[key];
					if( t.param.type != 'DIR' ){	// если не "dir/папка/раздел" 
						big[key] = nw[key] ;		// переносим в большое дерево
						i++ ;
				//		console.log( gc()+"noDir: "+i+" : "+key );
					};
				};
				
				if(  big.no_null == 0  ) { // удаление заместителя null
					delete big.no_null  ; 
				} ;				
				
				return i; // возвращаем количество разделов
			},  // noDir : function( inp )

		//  заполнение ветви дерева
			addTree : function( oTree ){
				console.log ( gc()+'It is addTree  ----------' ); //	console.log( oTree );  
				var 
					tree	= oTree.tree,		//	обрабатываемая ветвь/узел
					path 	= tree.param.dir ? tree.param.dir : '',	// путь к узлу в дереве
					b_tree	= Morf.tree;
					stepS 	= [];
					
					console.log( path );  
					if (  path.length > 0 ) {			// если есть путь к узлу, то	
						stepS = path.split('/');		// делим путь на шаги,
						path = '' ;						// чистим под другое использование
						stepS.forEach( function( step ){	// Цикл по шагам 
							if( step ) { 					// если шаг не пустой
								if ( path.length > 0) {
									path = path + '∫'+step; // если не первый щаг - ставим разделитель
								} else {
									path = step ;			// 	
								}	//
								console.log( 'step: '+step + ' path: '+path );  
								b_tree = b_tree.child[ path ];	// "обрезаем" путь до целевой ветки
							};
						});
					};	// if (  path.length > 0 ) : если есть путь к узлу, то
						
					if( "child" in tree ) { 
						let i = 0 ;
						// создадим свойство, если его небыло (крайняя ветвь)
			//		console.log( gc()+" ----- addTree : b_tree ------" );  
			//		console.log( b_tree );  
						if( !( "child" in b_tree ) ) { 
							b_tree.child = {no_null: 0 }; //  заместитель null
							console.log( gc()+"addTree : no child - add no_null" );  
						} ; 
						if(  b_tree.child == null  ) { 
							b_tree.child = {no_null: 0 };  //  заместитель null
							console.log( gc()+"addTree : child = null - add no_null" );  
						} ; 
						i = Morf.tools.noDir( { 
								big : b_tree.child,
								nw  : tree.child					
						});
					//	if ( i > 0 ) { b_tree.child_count = i; };	
						b_tree.child_count = i; 
					} else {
						b_tree.child_count = 0; 
					};
			//		console.log( gc()+" ----- addTree : Morf.tree ------" );  
			//		console.log( Morf.tree );  
			}, // 	addTree :   заполнение ветви дерева
			
		//  вывод содержимого раздела 
		//передаю в функцию объект - дерево с параметрами вывода
			showDir : function( oTree ){
				cl( 'It is showDir ------------------ ' ); 
				console.log( oTree );  
				var 
					tree		= oTree.tree,		//	обрабатываемое дерево/ветвь/узел
					trg 		= oTree.trg ? '#' + oTree.trg : '#workW',	// "окно" вывода
					txt 		= '';				// 	текстовый буфер
				
				Morf.tools.breadСrumb( oTree ); // блок "хлебный крошек"
				
				txt = '';
				$(trg+" .wrk").html( txt );  //  очистка рабочего поля		
				for ( var key in tree.child ) {	// перебор дочерних узлов текущего объекта / узла
					var node = tree.child[key] ;
					node.param.id = "dir_"+key;
					node.param.id_tree = key;
					txt = Morf.tools.decorateArr( node.param, Morf.templ.workFileNode );
					$(trg+" .wrk").append( txt );
				};
				if ( !key ){
					txt = "нет информации";
					$(trg+" .wrk").append( "<span class='node'> "+txt+"</span>" );
				};
	//			cl( 'showDir:key '+key );
				
				Morf.tools.asorti(
					$('#workW #workC .node'),
					$('#workW #workC'),
					'name'
				);
				
			//	console.log ( gc()+'End showDir -------------- ' );
	//			Morf.tools.addTree( oTree );
				return;
			},  // showDir -  вывод содержимого раздела 
		

		// "текущий" узел на дереве
		treeNodeCurent: function(cur_node){
	//		cl( 'treeNodeCurent:begin cur_node' ); 
	//		console.log( cur_node ); 
			$(".tree_node").removeClass('curent');	// сбросили "старые" текущие
			$(cur_node).addClass('curent');			// отметили "текущим" 
			if ( $(cur_node).attr("parent") == "yes" ) { // если "родитель"
				$(cur_node).addClass('open');		// открыли 
			};				
			cl( 'treeNodeCurent: end' ); 
		},  	// "текущий" узел на дереве
		
		//  вывод структуры таблицы  в окно навигации
		// передаю в функцию объект - дерево с параметрами вывода
			showDB : function( X ){
				console.log ( gc()+'It is showDB ------------------ ' ); 
				var db = X.TABLES,
					txt 		= '';				// 	текстовый буфер

				console.log( db );  
				$("#navW.wrk").html( Morf.templ.breadСrumb_DB_0_Nav );  //  очистка рабочего поля		
				for ( var table in db ) {	// перебор дочерних узлов текущего объекта / узла
					var node = db[table] ,
						param = {} ;
					param.table = table ;
	//				console.log ( "table: "+ table + "  node: " );
	//				console.log ( node );
					txt = Morf.tools.decorateArr( param , Morf.templ.navDB );
	//				$("#navW.wrk").attr( 'view','db' );
					$("#navW.wrk").append( txt );
				};
				

				Morf.tools.showDBstrct(); // вывод структуры базы в рабочее окно
				console.log ( gc()+'End showDB -------------- ' );
				return;
			},  // showDB -  вывод структуры базы 
				

		//  вывод заголовка данных таблицы
			showDBtableHeader : function( X ){
				var	txt = '';
				console.log( '======= tbl_k:'  );  console.log(  X  );
				for( i in X ) {							// перебор записей
					txt = txt + '<div class="td" name="'+i+'">'+X[i]+'</div>' ;
				};
				txt = '<div class="tr keys">' + txt + '</div>';				
				return txt;
			},
			
		//  вывод данных таблицы
			showDBtable : function( table, regim ){
				// собрал ключи для заголовка таблицы
				cl( "showDBtable: "+ table + "/" + regim+" ---------------- !!!" );
			//	console.log ( Morf.db.TABLES[table][regim]);
				console.log ( Morf.db.TABLES );
				var tbl_0 =  Morf.db.TABLES[table][regim][0] ;  // данные для заголовка 
				var tbl_k = Object.keys( tbl_0 );  				// строка заголовка 
				var tbl_t =  Morf.db.TABLES[table][regim] ;  
				var txt = Morf.tools.showDBtableHeader( tbl_k ) ;
				txt = txt + Morf.tools.decorateTabl( tbl_t );
				txt = filtrBR( txt ) ;		//  убираем из строки теги переноса строки <br> и другие
		//		txt =  filtrTag( txt ) ;		//  убираем из строки теги переноса строки <br> и другие
		//		console.log( '-----txt:' );	console.log( txt );
				txt = '<div class="tbl" >'+txt+'</div>';
				$("#workW").html( txt );
				$("#work .reg_menu .reg_view.tek").removeClass('tek');	// режим workW
				$("#work .reg_menu .reg_view[view="+regim+"]").addClass('tek');	// режим workW
			},

		//  выборка данных таблицы
			selectDBtable : function( table, regim ){
				// собрал ключи для заголовка таблицы
				cl( "selectDBtable: "+ table + "/" + regim+" ---------------- !!!" );
			//	console.log ( Morf.db.TABLES[table][regim]);
				console.log ( Morf.db.TABLES );
				var tbl_0 =  Morf.db.TABLES[table]['data'][0] ;  // данные для заголовка 
				var tbl_k = Object.keys( tbl_0 );  				// строка заголовка 
	//			var tbl_t =  Morf.db.TABLES[table][regim] ;  
				var txt = Morf.tools.showDBtableHeader( tbl_k ) ;
	//			txt = txt + Morf.tools.decorateTabl( tbl_t );
				txt = filtrBR( txt ) ;		//  убираем из строки теги переноса строки <br>
		//		console.log( '-----txt:' );	console.log( txt );
				txt = '<div class="tbl" >'+txt+'</div>';
	//			$("#cmd input.cmd").val( "SELECT * FROM "+table+" WHERE  " );
				$("#workW").html( txt );
				$("#work .reg_menu .reg_view.tek").removeClass('tek');	// режим workW
				$("#work .reg_menu .reg_view[view="+regim+"]").addClass('tek');	// режим workW
			},


			
		//  вывод структуры/параметров базы 
			showDBstrct : function( ){
				var txt = '',
					tbl_k = [];
				$("#workW").html( '' );

				for ( var table in Morf.db.TABLES ) {
					var tbl = Morf.db.TABLES[table]['param'] ;
					tbl_k = Object.keys( tbl );  // собрал ключи для заголовка таблицы
					txt = txt+'<div class="tr" >'+Morf.tools.decorateTabl( tbl )+'</div>'
				};
				txt = Morf.tools.showDBtableHeader( tbl_k ) + txt;
				txt = '<div class="tbl" >'+ txt +'</div>'
				$("#workW").append( txt );
			},	
					

		//  оформление таблицы
			decorateTabl: function( X ){ // X - хеш , !out - шаблон оформления
				var i =  out = txt = '' ;
//				console.log( 'KEYS===============:' );	console.log( k );
				for( i in X ) {							// перебор записей
					if( !!X[i] && typeof( X[i] ) == "object" ) {	// если имеем 'object'
	//					console.log( gc()+'decorateTabl_obj:' + i + '; ' );	console.log( X[i] );
						// переходим на следующий уровень
						out = out + '<div class="tr" >'+Morf.tools.decorateTabl( X[i] )+'</div>';	
					} else {
	//					console.log(' decorateTabl: ' + i + ' = ' + X[i] + '; ' );
						out = out+'<div class="td' ;
						txt = X[i] ;
						txt =  filtrTag( txt ) ;
						if( txt != null ) {  				// если значение есть
							if ( txt.length > 55 ) {		// и в строке много символов (больше 55) - помечаем её как long_txt
								out = out+' long_txt" ' ;	// помечаем её как long_txt
								out = out+' title="'+txt ;	// полный текст строки показываем в title
							}
						}
						out = out+'" name="'+i+'">'+txt+'</div>' ;
					};					
				};
				return out;
			},  //  оформление информации


			//  оформление информации 
			decorateArr: function( X, out ){ // X - хеш , out - шаблон оформления
				var i = n = tX = ''  ;
				// поставить проверку на наличие шаблона оформления
			//	ttm('<br> decorateArr<br>'  );
				if( !!out ){
					for( i in X ) {							// перебор записей
						if( typeof(X[i] ) == "object" ) {	// если имеем 'object'
							out = decorateArr( X[i], out );	// переходим на следующий уровень
						} else {
							if( typeof X[i] ) {			// если есть элемент
								tX = X[i] ;
				//				testString(' decorateArr:' + i + ' = ' + tX + ' <br>' );
								var rX = new RegExp( "#" + i + "#", 'g' );
									out = out.replace( rX , tX  );		// заменяем имена в шаблонах на значения
							};			
						};
					};
				} else { 
					alert( "Ошибка открытия шаблона оформления в decorateArr");
				};
			//	ttm(' decorateArr.templ: ' + filtrTag( out ) );
			//	console.log( 'decorateArr.templ' );

				out = out.replace( /#path_root#/g , Morf.path_root  );		// путь до корня
				i = /#\S+#/g;
				out = out.replace( i , '####'  );		// убираем имена из шаблонов
				i = /\[\[.*####.*\]\]/g;
				if (  out.search( i )  > 0 ){
					out = out.replace( i , ''  );		// убираем имена из шаблонов
				};
				out = out.replace( /####/g , ''  );		// убираем #### из шаблонов
				out = out.replace( /\[\[/g , ''  );		// убираем [[ из шаблонов
				out = out.replace( /\]\]/g , ''  );		// убираем ]] из шаблонов
			
				return out;
			},  //  оформление информации
			

			/* cортировка элементов на экране
			*	$ars	- массив сортируемых элементов ( var $ars = $('li'); )
			*	$to		- раздел в котором происходит сортировка ( var $to  = $('ul'); )
			*	par	- параметер(атрибут) по которому сортируются элементы  ( var par  = 'id'; )
			*/
			asorti: function( $ars, $to, par ){
				$ars.sort(function (a, b) {
					var an = $(a).attr( par ),
						bn = $(b).attr( par );
						if( $(a).attr( 'type' ) == 'DIR' ) { an = ' '+ an; }
						if( $(b).attr( 'type' ) == 'DIR' ) { bn = ' '+ bn; }
					
					if (an && bn) {
						return an.toUpperCase().localeCompare(bn.toUpperCase());
					}
				});
				
				$ars.detach().appendTo($to);
				
				return 0;
			},		// asorti:   cортировка элементов на экране	


			// обновить содержимое раздела.. - пока реализована заглушка с полной очисткой localStorage
			reload_DIR : function ( path ) { 
				localStorage.removeItem( "Morf.path_root");
				localStorage.removeItem( "Morf.tree");
				Morf.start();
			},	

			//  Сохранение JSON объекта в localStorage
			lStor_set : function ( name, json ){
				try {
					localStorage.setItem( name, JSON.stringify( json ));
				} catch (e) {
					if (e == QUOTA_EXCEEDED_ERR) {
						alert('Ошибка сохранения '+name+': - превышен лимит');
					}
				}
			},

			//  getting получение и обработка ответа сервера
			getting : function( X, regim, param  ){
				if( typeof( X ) != "object" ) {			//  проверяем - получен ли значимый ответ ???
					outHash( X, 'json.UUUps' ); 		//	
				} else {
					outHash( X, regim+':' ); 			//	
					if( regim == 'dirTree' ) {
						var fN  = firstNode(X),
							trg	= '#navW',	// "окно" вывода
							X = X[fN] ;
							cl( 'getting:dirTree: fN:' + fN ); // console.log( X )
							console.log( X );

							if( !!X.path_root ){
								Morf.path_root	= X.path_root ; // общий "корень"
								console.log( gc()+' path_root: '+Morf.path_root );  
							};
							
							$( trg ).html( Morf.templ.breadСrumb_File_0_Nav ); // корневая(0) точка "дерева"
							Morf.tools.outTree( {  tree: X	});		//  вывод дерева 
							Morf.tree = X ;							// присвоение дерева 
						 Morf.tools.request( 'dirShow', '' );	
					} else if ( regim == 'dirShow' ) {
						var fN = firstNode(X) ;
						
						X = X[fN] ;
						cl( 'getting:ShowDir: fN:' + fN ); // 
						console.log( X );
						Morf.tools.addTree( {  tree: X	} );
						Morf.tools.showDir( {  tree: X	} );	//  вывод содержимого каталога
						ShowLoad(0);
						localStorage.setItem('Morf.path_root', Morf.path_root );	// сохраняем в localStorage корневой путь
						Morf.tools.lStor_set( 'Morf.tree', Morf.tree );				// сохраняем в localStorage корневой путь
							
					} else if ( regim == 'dbDB' ) {
							Morf.db = X;
							cl( "Morf.db" );
							console.log( Morf.db );
							Morf.tools.showDB( Morf.db );						//  вывод структуры базы
						Morf.tools.lStor_set( 'Morf.db', Morf.db );				// сохраняем в localStorage корневой путь
						ShowLoad(0);
					} else if ( regim == 'slctDB_smpl' ) {
							cl( "getting:slctDB_smpl" );
						//	Morf.db.TABLES['slctDB_smpl']['data'] = X['SELECT'] ;
							Morf.db.TABLES['slctDB_smpl'] = X ;
							console.log( X['SELECT'] );
							Morf.tools.showDBtable( 'slctDB_smpl', 'SELECT' );	//  вывод результата запроса
						ShowLoad(0);
					}					
					console.log ( gc()+'GETTING : END ; regim: ' + regim +' ; param: ' + param +'; '  );		
					console.log ( X ); 

					
					return X;
				};
			},	//  getting получение и обработка ответа сервера

			//  проверка повторного запроса имеющейся информации 
			controlTree : function( path ){ 
				var yes = {},
					b_tree	= Morf.tree;
					yes.no_file = -1 ;

					console.log ( "--- controlTree --- path: ["+path+"]" ); 
					if (  path.length > 0 ) {			// если есть путь к узлу, то	
						console.log( 'controlTree : path: '+path+' path.length: '+path.length+' > 0');  
						stepS = path.split('/');		// делим путь на шаги,
						path = '' ;						// чистим под другое использование
						stepS.forEach( function( step ){	// Цикл по шагам 
							if( step ) { 					// если шаг не пустой
								if ( path.length > 0) {
									path = path + '∫'+step; // если не первый щаг - ставим разделитель
								} else {
									path = step ;			// 	
								}	
								b_tree = b_tree.child[ path ];	// "обрезаем" путь до целевой ветки
							};
						});
		//				if( "child" in b_tree ) {	};
							let i = 0 ;
							if( !( "child_count" in b_tree ) ) { 
								console.log ( "controlTree : no child_count" ); 
								yes.no_file = 0 ; 
							} else { 
								console.log ( "controlTree :  child_count: " + b_tree.child_count  ); 
								yes = b_tree; 
							} ; 
					} else {
						console.log( 'controlTree : path.length: '+path.length+' = 0;');  
						console.log( Morf.tree);  
						if( "child_count" in Morf.tree ) { 
							console.log( 'controlTree :  child_count: '+Morf.tree.child_count+';');  
							yes = b_tree; 
						};
					};

	//			console.log( yes );  
				console.log ( "--- controlTree end --- // yes/ret:" ); 
				return yes;
			}, // controlTree :  проверка повторного запроса имеющейся информации 
			
			
			//  формирование и отправка строки запроса
			request : function( regim, param ){ 
				cl( ' REQUEST.IN regim: '+regim+'; param: '+param+';'  );
				var temp = '',
					url = '',
					prf = '',
					ret = {};
				this.regim = regim ; 
				this.param = param ;

				if( regim == 'dirShow' ) {
					ret = Morf.tools.controlTree( param ) ;
					cl( "REQUEST:dirShow:ret"  );
					console.log ( ret  );
					if( "no_file" in ret ) {
						cl ( 'request:dirShow: найдено [ No Info!! ]' );
					} else {				//  повторный запрос
						cl( 'request:dirShow: есть Info!! ' );
						Morf.tools.showDir( {
							tree : ret 
						});
						return 0;
					};	//  if( regim == 'dirShow' )
				} else if ( regim == 'dirTree' ) {
					temp = localStorage.getItem('Morf.tree') ;
					cl( 'REQUEST:dirTree:LOCALSTORAGE.GETITEM [dirTree]: ' );	
					console.log ( temp );
					if ( !!temp ) {
						X = JSON.parse( temp ) ;
						if ( !!X ){
							trg	= '#navW',	// "окно" вывода
							Morf.tree = X;
							Morf.path_root = localStorage.getItem('Morf.path_root') ;
							cl( 'REQUEST:dirTree:Morf.tree' ); 
							console.log ( Morf.tree );
								$( trg ).html( Morf.templ.breadСrumb_File_0_Nav ); // корневая(0) точка "дерева"	
								Morf.tools.outTree( {  tree: X	});	//  вывод дерева 
								Morf.tools.showDir( {  tree: X	} );	//  вывод содержимого каталога					
							ShowLoad(0);
							return 0;
						};
					};
				} else if ( regim == 'dbDB' ) {
					temp = localStorage.getItem('Morf.db') ;
					cl( 'REQUEST:dbDB:LOCALSTORAGE.GETITEM [dbDB] : ' );	console.log ( temp );
					if ( !!temp ) {
						cl( 'REQUEST:dbDB:LOCALSTORAGE: берем DB из хранилиша' );	console.log ( temp );
						Morf.db = JSON.parse( temp ) ;
						Morf.tools.showDB( Morf.db );						//  вывод структуры базы
						ShowLoad(0);
						return 0;
					}
				};	
						
					if( param != '' ) { prf='?dir='  };
					url =  CFG.Url+regim+'.php' + prf + param ;
						ShowLoad(1);
					cl( 'request:---:: в хранилище нет данных' );
					cl( 'request:---  режим:: ' + regim +' & параметры::' + param +' '  );
					cl( 'request:---: ur1::' + url + ' '  );
					$.getJSON( url, function( json ) { Morf.tools.getting( json, regim, param ) ;});	//  обращение к серверу

				cl( ' REQUEST : END : ' + regim +' :: ' + param   );
			},	// request :  формирование и отправка строки запроса

		//  выборка данных прямым запросом
			selectDB_smpl : function( param ){
				regim = 'slctDB_smpl' ; 
					url =  CFG.Url+regim+'.php' + '?select=' + param ;
					$.getJSON( url, function( json ) { Morf.tools.getting( json, regim, param ) ;});	//  обращение к серверу
			},	/* */

			enter: {
				// обработка полей авторизации
				null2input_vol : function(data, txt=''){
					$('input.login').val('');
					$('input.password').val('');
					$('#dgn').empty().append( data.repl + txt + '<br>' + 'status: ' + data.status );
					$('#enter_repl').empty().append( txt + data.repl +' ( '+ data.status +' )' );
				}, // Morf.tools.enter.null2input_vol
				
				// обработка результата запроса 
				succ : function( data ) {  
					var te = Morf.tools.enter ,
						my={};
					cl ( 'Morf.tools.enter (+)' );
					console.log ( data );
					cl ( 'status:' + data.status + ' - ' + data.repl );
					
					switch( data.status ){
						case 1: // Не введены логин и/или пароль
							te.null2input_vol(data);
						break;
						case 2: // Ошибочные  логин и/или пароль
							te.null2input_vol(data);
						break;
						case 10: //  Необходимо ввести логин и пароль
							te.null2input_vol(data);
						break;
						case 20: // Вход совершен! Сохраняем подключение
							$.cookie('in',   data.login,    { expires: data.coock_time } );
							$.cookie('id',   data.new_id,   { expires: data.coock_time } );
							$.cookie('hash', data.new_hash, { expires: data.coock_time } );
							te.null2input_vol(data);
							$('#enter').addClass('close');
								Morf.start();
						break;
						case 30: // Всё работает
							te.null2input_vol(data);
							$('#enter').addClass('close');
							// обновляем куки
							console.log( 'обновляем куки: in: '+data.login+', id: '+data.new_id+', hash: '+ data.new_hash );
							$.cookie('in',   data.coock_in, { expires: data.coock_time } );
							$.cookie('id',   data.coock_id, { expires: data.coock_time } );
							$.cookie('hash', data.new_hash, { expires: data.coock_time } );
								Morf.start();
						break;
						case 100: // Регистрация прошла успешно
							te.null2input_vol(data,'<br>Введите повторно логин и пароль для входа');
						break;						
						default:
							data.repl =  ' Ошибка авторизации <br>'+data.repl ;
							te.null2input_vol(data);
					};		// Morf.tools.enter.succ	

				},

				//  отправка запроса на авторизацию
				post_qu: function ( my ) {
					cl ( 'Morf.tools.enter.post_qu' );
					cl ( "CFG.Url:"+CFG.Url+"check2.php" ); 
					console.log ( my );
		/**/		$.post(
						CFG.Url+"check2.php", 
						my,
						function(data){ Morf.tools.enter.succ(data)}, // разбор результата
						"json"
					);
				},  // 	Morf.tools.enter.post_qu() 
				
			}  // Morf.tools.enter:  пространство имен  функций контроля входа
			
		},  //  Morf.tools
		
		sts: {
			reg:  'db',
			view: 'all',
			db_table: '',
			node: '',
		},	
/*		sts_re: function(){
		},	
*/
		sts_show: function(){
			$('#cmdW').empty();			// очистка окна
			$('#cmdW').html(gc()+"<br>");			// очистка окна
			outHash( Morf.sts, 'sts' );	// вывод состояния
		
		},	
		
		wind_story : { // место хранения содержания рабочих окон
			navW:  {},
			workW: {},
			work_reg_menu: {},
			bufW:  {}
		},
		
		// переключатель режима и визуализации информации
		selector:  function ( rvn ){
			cl( 'SELECTOR: вход: '+rvn );
			
			if( rvn == 'file' ){ };
			if( rvn == 'db'){	};
			if( rvn == 'file' || rvn == 'db'){	
				$("#nav .tek").removeClass('tek');
				$("#nav .reg_view[reg="+rvn+"]").addClass('tek');
				Morf.sts.reg = rvn ;
				Morf.start();
				$("#work").attr('view', $("#work .reg_menu .reg_view.tek").attr('view'));	// вид workW
			};
			if( rvn == 'prog'){	
				Morf.sts.reg = rvn ;
				cl( 'SELECTOR: заглушка: prog');
			};
			if( rvn == 'list' || rvn == 'tabl' || rvn == 'tile' || rvn == 'data' || rvn == 'strct' || rvn == 'query'){	
				$("#work .tek").removeClass('tek');
				$("#work .reg_view[view="+rvn+"]" ).addClass('tek');
				$("#work").attr('view', rvn );
				Morf.sts.view = rvn ;
			};
			if( rvn == 'data'){	
				table = Morf.sts.db_table;
				if( table != '') {
					cl( ' SELECTOR:data:'+table);
					Morf.tools.showDBtable( table, 'data');
				}
			};
			if( rvn == 'strct'){
				table = Morf.sts.db_table;
				if( table != '') {
					cl( ' SELECTOR:strct:'+table);
					Morf.tools.showDBtable( table, 'strct');
				}
			};
			if( rvn == 'query'){
				table = Morf.sts.db_table;
				slct = $('#cmd input.cmd').val();
				if( table != '') {
					cl( ' SELECTOR:query:table: '+table);
					Morf.tools.selectDBtable( table, 'query'); // query
				} 	
				if( slct != '') {
					cl( ' SELECTOR:query:select: '+slct);
					Morf.tools.selectDB_smpl( slct );
				//	Morf.tools.selectDBtable( table, 'query'); // query
				}	
			};
			
			
			Morf.sts_show();	// вывод состояния
		},  //  selector:   -  переключатель режима и визуализации информации
		

		//  старт
		start:  function(){
	//		cl(' start');
		//	$("#cmd input.cmd").val( "" ); // очистили строку ввода
			var reg = $('#nav .reg_menu .reg_view.tek').attr('id');  // определяем текущий режим работы
			var t = '';
			t = $('#navW').html() ;
			if ( t != '' ){ // сохряняем текущее состояние окна навигации 
				Morf.wind_story['navW'][$('#nav').attr('reg')] = t ;
				$('#navW').empty();
			};
			t = $('#workW').html() ;
			if ( t != '' ){ // сохряняем текущее состояние рабочего окна
				Morf.wind_story['workW'][$('#nav').attr('reg')] = t;
				$('#workW').empty();
			}
			t = $('#work .reg_menu').html() ;
			if ( t != '' ){// сохряняем текущее состояние выбора режима показа (закладок) рабочего окна
				Morf.wind_story['work_reg_menu'][$('#nav').attr('reg')] = t;
				$('#work .reg_menu').empty();
			}
	//		Morf.wind_story['bufW'] = $('#bufW').html();
	//		$('#bufW').empty();
			console.log( 'Morf.wind_story' )
			console.log( Morf.wind_story )
			$("#nav").attr( 'reg', reg );
			switch ( reg ) {   // по режиму работы заполняем окна
				case 'file':
					cl('start: file');
					if ( !Morf.wind_story['navW']['file'] ) {
						$('#workW').html( Morf.templ.workW_file );
						$('#work .reg_menu').html( Morf.templ.reg_menu_file );
						Morf.tools.request( 'dirTree', '' );
					} else {
						$('#navW').html(  Morf.wind_story['navW']['file'] ) ; 
						$('#workW').html( Morf.wind_story['workW']['file'] ) ; 
						$('#work .reg_menu').html( Morf.wind_story['work_reg_menu']['file'] ) ; 
					};
					$("#work").attr( 'reg','file' );
				break;	
				case 'db':
					cl('start: db');
						$('#navW').html(  Morf.wind_story['navW']['db'] ) ; 
						$('#workW').html( Morf.wind_story['workW']['db'] ) ; 
						$("#work").attr( 'reg','db' );
				//		$("#work").attr( 'view','strct' );
						$('#work .reg_menu').html( Morf.templ.reg_menu_db );
					Morf.tools.request( 'dbDB', '' );
						Morf.selector( 'strct' );
						$("#navW .db_crn").addClass( 'curent' );
				//	ShowLoad(0);
				break;	
				case 'prog':
					cl('start: prog');
					$('#work .reg_menu').html( Morf.templ.reg_menu_prog );
				//	Morf.tools.request( 'dirTree', '' );
					ShowLoad(0);
				break;	
			};
		},

		templ: {
			workDBstr: '<a class="DBnode" ><span class="name">#name#</span><span class="param">#param#</span></a>',
			workFileNode: '<a id="#id#" class="node" type="#type#" name="#name#" id_tree="#id_tree#" path="#path#" title="name =#name#\n size = #size#\n type = #type# "><span class="first"></span><span class="parDop icon" style="background-image: url(#path_root##path#)">#type#</span>	<span class="name">#name#</span> [[<span class="parDop size">#size#</span>]]<span class="parDop type">#type#</span><span class="last"></span></a>',
			navFileTree: '<div id="tree_#key#"  class="tree_node"  trg="#trg#"  parent="no" level="#level#" path="#path#" >#tabs#<span class="mark_clop"></span> <a title="#title#">#name#</a><br>',
			navDB: '<div id="db_#table#"  class="db_node" path="#table#" ><span class="mark_clop"></span> <a title="#table#">#table#</a><br>',
			rightClickMenu: '<span>в режиме:#reg#</span><br><span>элемент:#path#</span><br><span> x:#coord_x#</span><br><span> y:#coord_y#</span>',
			rightClickMenu_DIR: '<span><a class="reload_DIR" path="#path#" > обновить </a><br>в режиме:#reg#</span><br><span>элемент:#path#</span><br><span> x:#coord_x#</span><br><span> y:#coord_y#</span>',
			breadСrumb_DB_0_Nav : '<span class="db_crn" path="" title="обновить" ><a>&bull;</a></span>' ,	// переход на параметры базы, нет подстановок
			breadСrumb_File_0_Nav : '<span class="crn tree_node" parent="yes" type="DIR" path="" ><a>&bull;</a></span>' ,	// переход на "корень дерева", нет подстановок
			breadСrumb_File_0 : '<a class="last path"  type="DIR" path="" >&bull;</a>' ,	// переход на "корень дерева", нет подстановок
			breadСrumb_File : '<span  class="del" > &rsaquo; </span><a class="last path" type="DIR" path="#path#" id_tree="#id_tree#" >#step#</a>',
			reg_menu_file : "<span id='list' class='reg_view tek' view='list'>список</span> <span id='tabl' class='reg_view' view='tabl'>таблица</span> <span id='plit' class='reg_view' view='tile'>плитка</span>" ,	
			reg_menu_db : "<span id='data' class='reg_view' view='data'>данные</span> <span id='struct' class='reg_view' view='strct'>структура</span> <span id='query' class='reg_view' view='query'>выборка</span>",	
			reg_menu_prog : ' ',	
			workW_file : '<div id="path" class="path" ></div><div id="workC" class="wrk" ></div>',	
			navFileTreeD: '--- key = #key#" --- trg = #trg#" --- level="#level#"  --- path="#key#"  --- tabs = #tabs#  --- title = "#title#"  ---  name = #name#' 
			
		},	// templ
			
		scr: {
			width  :  $("#all").css('width'),
			height : $("#all").css('height'),

 			
			resize : function() {  // получение размеров экрана
				var t = Morf.tools ,
				    allW  = t.toNum( $('#all').css('width') ),
				    allH  = t.toNum( $('#all').css('height') ),
				    wzT   = t.toNum( $('#work_zone').css('top') ),
				    wzH   = t.toNum( $('#work_zone').css('height') ),
				    bufW  = t.toNum( $("#buf").css('width') ),
				    botH  = t.toNum( $("#bot").css('height') ),
				    cmdL  = t.toNum( $("#cmd").css('left') ),
					emW   = t.toNum( $("#em").css('width') ), 
					emH   = t.toNum( $("#em").css('height') ), 
					d 	  = allH - wzT - botH ;
		
				$('#wb').css('left', ( allW - bufW ) ) ; 
				$('#bb').css('top',  ( allH - botH ) ) ; 
				$('#work_zone').css('height', ( d ) );
				$('#nav').css('height',  ( d ) );
				$('#nw').css('height',   ( d - emH ) );
				$('#work').css('height', ( d ) );
				$('#wb').css('height',   ( d - emH ) );
				$('#buf').css('height',  ( d ) );
				$('#bb').css('width',  allW - cmdL - emW );
				$('#cmd').css('width', allW - cmdL );
			},		// resize : function()   // получение размеров экрана



			nw_gr_position: function (){	// между nav и work  - но горизонтально
				var x = all = 0 ,
					d = em = 0 , 
					t = Morf.tools ;

				$("#nw_gr").draggable(
					{	axis:'y' },	
					{ 	containment:'parent' },
					{ 	start:function(){
							all = t.toNum( $("#all").css('height') ); 
							em 	= t.toNum( $("#em").css('height') ); 
						}
					},
					{ 	drag: function(event, ui){
							x = t.toNum( ui.position.top ) ; 
							d = all - x  ;

							$("#nav").css('height', 	x-0  ) ;
							$("#work").css('top', 	x+7 ) ;
						}
					}
				);	 
			}, 	// nw_gr_position: function ()  // между nav и work


			nw_position: function (){	// между nav и work   - но вертикально
				var x = all = 0 ,
					d = em = 0 , 
					t = Morf.tools ;

				$("#nw").draggable(
					{	axis:'x' },	
					{ 	containment:'parent' },
					{ 	start:function(){
							all = t.toNum( $("#all").css('width') ); 
							em 	= t.toNum( $("#em").css('width') ); 
						}
					},
					{ 	drag: function(event, ui){
							x = t.toNum( ui.position.left ) ; 
							d = all - x  ;

							$("#nav").css('width', 	x-2  ) ;
							$("#work").css('left', 	x ) ;
						}
					}
				);	 
			}, 	// nw_position: function ()  // между nav и work
		 
			wb_position: function (){	// между work и buf
				var x = all =0,
					d = em 	= 0 , 
					t = Morf.tools ;
				$("#wb").draggable(
					{	axis:'x'},	
					{ 	containment:'parent' },
					{ 	start:function(){
							all = t.toNum( $("#all").css('width') ); 
							em  = t.toNum( $("#em").css('width') ); 
						}
					},
					{ 	drag: function(event, ui){
							x = t.toNum( ui.position.left ) ; 
							d = all - x ;

							$("#work").css('right', d ) ;
							$("#buf").css('width',  d ) ;
							$("#wb").css('right',   d ) ;
						}
					},
					{	stop: function(){
							$("#wb").css('right',  d  ) ;
						}
					}
				);	 
			},	// wb_position: function()	// между work и buf

			bb_position: function (){	// между  work_zone и bottom
				var x = d = 0,
					work = bb = bot = cmd = 0 ,
					delta = 0 , 
					t = Morf.tools ;
				$("#bb").draggable(
					{	axis:'y'},	
					{ 	containment:'parent' },
					{ 	start:function(){
							all  = t.toNum( $("#all").css('height') ); 
							work = t.toNum( $("#work").css('height') ); 
							bb   = t.toNum( $("#bb").css('top') ); 
							cmd  = t.toNum( $("#cmd").css('height') ); 
							bot  = t.toNum( $("#bot").css('height') ); 							
							em   = t.toNum( $("#em").css('height') ); 
						}
					},
					{ 	drag: function(event, ui){
						x = t.toNum( ui.position.top ) ; 
						delta = bb - x ;
						d = work - delta ;

						$("#nav").css('height',  d ) ;
						$("#nw").css('height',   d - em ) ;
						$("#wb").css('height',   d - em ) ;
						$("#work").css('height', d ) ;
						$("#buf").css('height',  d ) ;
						$("#bot").css('height',  bot + delta  ) ;
				//		$("#cmd").css('height',  cmd + delta - 0.5*em  ) ;
						}
					}
				);	 
			},	// bb_position: function ()  // между  work_zone и bottom

			init: function (){
	//			ttm( ' its SCR.init ' );
	//			console.log( ' its SCR.init ' );
				this.resize();
				this.nw_position();
				this.nw_gr_position();
				this.wb_position();
				this.bb_position();
				ShowLoad(0);
				window.onresize = function() {  Morf.scr.resize() };
				
				// установка режима workW в зависимости от nav
				$("#workW").attr('reg', $("#nav .reg_view.tek").attr('view') );
				
			}
		} 	//     Morf.scr
	};


// ---------------------------------- подвал ------------------------------------------ //

/*		

*/