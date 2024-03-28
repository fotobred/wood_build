// 	background-image: url(bckg.jpg);

var gcc = 0; 		// "глобальный" счетчик
var sel_node = 0;	// "корневой" узел 
var nodes = [];		// массив узлов
var iid = 0;

function gc() {
	gcc++;
	return '--> '+gcc+' <-- ';
}

const slinks = new Map();

// *** ---------- блок настроек дерева --------------------------начало---- *** 
{   
	var o_layout = {
		randomSeed: undefined,
		improvedLayout:true,  // иерархия вклю(выклю)чается ЗДЕСЬ  true/false
	//	clusterThreshold: 150,		//  -----------------------
		hierarchical: {
		  enabled: true, //false, //true,		// включить иерархическое отображение
		  levelSeparation: 150,  // расстояние между уровнями
		  nodeSpacing: 130,
		  treeSpacing: 20,
		  blockShifting: true,
	//	  edgeMinimization: true,	// ----------------------
	//	  parentCentralization: true,		// ------------------
		  direction: 'DU',        // UD, DU, LR, RL
		  sortMethod: 'directed',  // hubsize, directed
	//	  shakeTowards: 'levels'  // levels, roots, leaves
		}
	}		  

	var o_nodes = {
		borderWidth: 3,//Настройка ширины границы узла
		borderWidthSelected: 7,//Нажмите на настройку ширины при выборе,
	//		shape: "circularImage",   // тип отображения узла
		shape: "image",
		shapeProperties: {
		  useBorderWithImage: true,
		},			
	//	imagePadding: 20,			
		size: 70,
	//  		scaling: { customScalingFunction: function (min, max, total, value) { return value / total; }, min: 5,  max: 150, },
	/*	scaling: {
		  min: 1,
		  max: 91,
		}, */
		font: { 
			size: 12 ,

	//		background: "white",

		},
		shadow: true
	}
			  
	var	o_edges = {
	//	value: 1, //  толщина линии связи
		width: 2,
		shadow: true,
	   smooth: true,			// скругление линий связи
		arrows: { to: true }	//	показание направления связи стрелкой
	}
			  
	var o_physics = {
	//	enabled: true,  wind: { x: 0, y: 1 }, forceAtlas2Based: {    gravitationalConstant: -26,  centralGravity: 0.005, springLength: 120,  springConstant: 0.18,            }, 
/*            hierarchicalRepulsion: {
              avoidOverlap: 1 ,
            },
 /*  */	
		maxVelocity: 16,
/*		solver: "forceAtlas2Based",
		timestep: 0.35,
		stabilization: { iterations: 150 } 
/**/}

}
// *** ---------- блок настроек дерева --------------------------начало---- *** 

	// функция построения дерева графов 
   function draw() {
        
	console.log( "---- draw():: nodes_0 ----" );		console.log( nodes_0 );
		
		var container = document.getElementById("mynetwork");
        var data = {
          nodes: nodes,
          edges: edges,
        };

        var options = {
		  autoResize: true,
		  height: '100%',
		  width: '100%',
          nodes:   o_nodes,
		  edges:   o_edges,
          physics: o_physics, 
		  layout:  o_layout 
        };
        var network = new vis.Network(container, data, options);
		
		// переход по клику по точке в дереве
		network.on("click", function (params) {
			console.log('clck goto_next:'+ gc() + ' '  + ' params ' + params )
			goto_next(params);
		});
	  
   }  //  function draw()


// стартовая функция
// и запуск реакций страницы
   function start() {

	console.log( "---- start():: nodes_0 ----" );		console.log( nodes_0 );
		prepare_data();
		draw() ;	//  отрисовка графа  !  ОТКРЫТЬ

	// *** ---------- блок назначения реакций --------------------------начало---- *** 
	{
		// переход на точку - потомок  -  clck child
		$("#picts").on('click', "figure.image figcaption", function(params){ 
			console.log('clck child goto_next2:'+ gc() + ' ' + this.id   );
			goto_next2(params);
		});	  

		// переход на точку - предок - clck parent 
		$("#image_top").on('click', "figure.image figcaption", function(params){ 
			console.log('clck parent goto_next2:'+ gc() + ' ' + this.id   );
			goto_next2(params);
		});	

		// переход на точку из галереи - clck parent 
/*		$("#image_top").on('click', "figure.image figcaption", function(params){ 
			console.log('clck parent goto_next2:'+ gc() + ' ' + this.id   );
			goto_next2(params);
		});
*/
		// показ картинки во весь экран - clck show_image
		$("#textwork").on('click', "#main img", function(params){ 
			console.log('clck show_image:'+ gc() + ' ' + this.id   );
			show_image( Number(this.id) );
		});

		//  смена картинки во весь экран
		$("#show_image #right").on('click', function(params){ 
			console.log('clck show_image right'+ gc() + ' / ' + params.target["id"]  + ' / ' + params.target["slot"]   );
			show_image( Number( params.target["slot"] ) );
		});
		$("#show_image #left").on('click', function(params){ 
			console.log('clck show_image left'+ gc() + ' / ' + params.target["id"]  + ' / ' + params.target["slot"]   );
			show_image( Number( params.target["slot"] ) );
		});

		//  закрытие картинки во весь экран -  клик по кресту
		$("#show_image #close").on('click', function(params){ 
			console.log('clck close show_image'+ gc()   );
			$("#show_image").removeClass( 'show' );
		});
		
		//  закрытие картинки во весь экран - клик по картинке
		$("#show_image img").on('click', function(params){ 
			console.log('clck close show_image'+ gc()   );
			$("#show_image").removeClass( 'show' );
		});

		// картинка во весь экран - клик по подписи
		$("#show_image figcaption").on('click', function(params){ 
			console.log('clck figcaption show_image'+ gc()   );
			if ( this.id ) {
				key = slinks.get( this.id );
				console.log( this.id+" - - - "+ key);			
				goto_node( Number( key ) );
				$("#show_image").removeClass( 'show' );
			}
		});
		
		// переключатель вида разделения рабочей зоны
		$("#vh").click( function (params) {
		if( $("#work_zone").hasClass("grznt") ) {
			$("#work_zone").removeClass("grznt")
			$("#vh").html("—")
			clear_style();
			$("#work_zone").addClass("vert")
		} else {	
			$("#work_zone").removeClass("vert")
			$("#vh").html("|")
			clear_style();
			$("#work_zone").addClass("grznt")
		}
			console.log('clck vh:'+ gc() + ' ' + ' params ' + params )
			//goto_next(params);
		})

		$("#re_data").click( function () {
			o_layout.hierarchical.enabled = on_off ( o_layout.hierarchical.enabled, true, false ) ;
	//		console.log('clck re_data:'+ gc() + ' ' + o_layout.hierarchical.enabled ) ;
			draw() ;
		})

		$("#image_box").click( function () {
			o_nodes.shape = on_off ( o_nodes.shape, 'image', 'box' ) ;
			console.log('clck image_box:'+ gc() + ' ' + o_nodes.shape ) ;
			draw() ;
		})

		$("#main #title").click( function (params) {
			sel_node = $("#main #title").attr("sel_node") ;
			console.log('clck #main #title:'+ gc() + ' '  + ' sel_node: ' + sel_node ) ;
			draw() ;
		})

		$("#main hr").click( function (params) {
			sel_node = 0 ;
			draw() ;
		})
	}
	// *** ---------- блок назначения реакций --------------------------конец---- *** 	

		console.log('Готов!');
		goto_node( 0 );		// переход на начальную точку 

   }	


	function on_off( subj, on, off ) {
		return ( subj == on )  ? subj = off : subj = on ;
	}


	// сброс "изменений" стиля расположения окон
	function clear_style() {
		$("#nav").removeAttr('style');
		$("#work").removeAttr('style');
		$("#nw_gr").removeAttr('style');
		$("#nw").removeAttr('style');
	}
	
	//  показ картинки крупно, на весь экран
	function show_image(img_id) {
		let max = $(' .image img ').length - 1;
		let title = $(' .image img[id='+img_id+']' ).attr('title') ;
		let prev = ( img_id > 0 ) ? img_id-1 : max ;
		let next = ( img_id < max) ? img_id+1 : 0 ;
		let data_id = $(' .image img[id='+img_id+']' ).attr('data_id')
			data_id = ( data_id !== 'undefined' ) ? data_id : "" ;
			console.log( "show_image( "+ img_id + " ) length: "+ max +" :: left: "+ prev + " right: "+ next );
		$("#show_image").addClass( 'show' );
		$("#show_image img").attr("src", $(' .image img[id='+img_id+']' ).attr('src')  );
		$("#show_image img").attr("title", title  );
		$("#show_image img").attr("id", img_id );
		$("#show_image #left").attr("slot", prev );
		$("#show_image #right").attr("slot", next );
		$("#show_image figcaption").text( title );
		$("#show_image figcaption").attr( "id", "" );
		$("#show_image figcaption").attr( "id", data_id );
   }

	// переход на узел по его клику на нижней галерее
	function goto_next2(params) {
		console.log( "goto_next2:::params.target.id  ---> "+params.target.id+ " <---"  );
		if ( params.target.id ) {
			goto_node( params.target.id );
		}
   }

	// переход на узел по его клику на нём в дереве
	function goto_next(params) {
        params.event = "[original event]";
		goto_node(params.nodes)
      }
		
	// переход на узел по его id 
	function goto_node(node) {
	//	$('#label').text( nodes[node].label );
	//	$('#image_top').empty();
		$('#image').empty();
		$('#title').empty();
		$('#picts').empty();
		$('#text').empty();
		iid = 0;
		if( nodes[node] ){		// если узел описан - оформляем его
//			console.log ( "node: "+node )
//			console.log ( nodes )
			$('#title').text( nodes[node].title );
			if ( nodes[node].image ) {
				let image_tag = "<img src=\"" + nodes[node].image + "\" id=" + (iid++) + " node_id='"+node+"' title='"+nodes[node].title+"' > ";
				$('#image').append( image_tag );
			}; 
			$('#title').text( nodes[node].title );
			$('#title').attr( "sel_node", node );
			$('#title').attr( "title", "выбрать ветвь: \n "+nodes[node].key );

			//  текст из txts	
				console.log ( 'MAP txts:: --------------------------------' );
				console.log ( txts );
				let kkey = nodes[node].key ;
				console.log ( 'goto_node.key:: "'+kkey+'"' );
				console.log ( txts[kkey] );
		//		$('#text').html( txts[kkey].txt );
				if ( txts[ nodes[node].key ] ) {
					$('#text').html( txts[ nodes[node].key ].txt );
				}
			put_parent_picts( nodes[node].id );
			put_child_picts( nodes[node].id );
			if ( txts[ nodes[node].key ] ) {
				console.log( "GLR_picts  ----------------------  "  );
				put_glr_picts( txts[ nodes[node].key ].glr, '#picts' );
			}			
		}	
		$("#textwork").animate({"scrollTop":0},"slow");	
      }

	//  определение списка предков для их показа
	function put_parent_picts( baza) {
		$.each( edges, function () {
				if(  this.to == baza ) {
					put_pict( this.from, '#picts', 1 );
					console.log( "put_parent_picts( " + baza +" ) = " + this.to + " --> " + this.from );
				}	
		});
	}

	//  определение списка потомков для их показа
	function put_child_picts( baza ) {
		$.each( edges, function () {
				if(  this.from == baza ) {
					put_pict( this.to, '#picts', 1 );
					console.log( "put_child_picts( " + baza +" ) = " + this.from + " --> " + this.to );
				}	
		});
	}

	//  определение галереи для показа
	function put_glr_picts( baza, place ) {
		if ( baza ){
		console.log( "put_GLR_picts ------------------------ begin ------------------------------put_GLR_picts "  );
			console.log( baza  );
			console.log( "put_GLR_picts ---slinks------- "  );
			console.log( slinks );
			let i = 0;
			$.each( baza, function () {
				let key = 0;
	//			console.log( "put_GLR_picts "+iid+" ( " +DIR+this.image +" ) ( " + this.title +" )( " + this.key +" ) "  );
				let image_tag = "<figure class=\"image\"  >";
				// -----------------------------------------------------------------------------------   ( "+this.image+" ) - НАДО УБРАТЬ!!!
//				image_tag += "<img src=\"" +DIR+this.image + "\" id="+(iid++)+" title=\""+this.title+" ( "+this.image+" ) \" data_id=\""+this.key+"\"   >";
				image_tag += "<img src=\"" +DIR+this.image + "\" id="+(iid++)+" title=\""+this.title+" \" data_id=\""+this.key+"\"   >";
				if ( this.key ){	
		//			console.log( "GLR_picts.key: "+this.key+" :: "+slinks.get(this.key)  ); 
					key = slinks.get( this.key ); 
				}
				if ( this.title ){	
					let i_id = '';
					if( key > 0 ) { i_id = 'id="'+ key +'" '; }
					image_tag += "<figcaption "+i_id+"  data_id=\""+this.key+"\">"+this.title+"</figcaption>" ; 
				}
				image_tag += "</figure>";
				$( place ).append( image_tag )
			});
			console.log( "put_GLR_picts ------------------------ end ------------------------------put_GLR_picts "  );
		}
	}


	// вывод оформленого как картинка элемента на указаную площадку
	//	если указан caption (любое значение)  - выводится подпись
	function put_pict( baza, place, caption ) {
		console.log (' put_pict( baza, place, caption ) ');
		console.log ( ' put_pict---> '+baza+', '+place+', '+caption+"  nodes.length: "+ nodes.length );
		if ( nodes[baza] ) {
			if ( nodes[baza].image ) {
				let image_tag = "<figure class=\"image\" >";
				console.log ( ' put_pict: '+iid+', .id: '+nodes[baza].id+', .label:'+nodes[baza].label+', .title:'+nodes[baza].title );
				image_tag += "<img src=\""+nodes[baza].image+ "\" id="+(iid++)+"  title=\""+nodes[baza].title+"\" data_id=\""+nodes[baza].key+"\"   >";
				if ( caption ){	image_tag += "<figcaption  id=\""+nodes[baza].id+"\"  data_id=\""+nodes[baza].key+"\" >"+nodes[baza].label+"</figcaption>"; }
				image_tag += "</figure>";
				$( place ).append( image_tag )
			}
		}	
	}



	// prepare_data - обработка/перестановка исходных данных для работы
	function prepare_data () {	
		console.log( "---> function prepare_data () <---- begin  ----------------------------------------" );

		var arc = [];
		var only = new Set();
		nodes = [];
		
	console.log( "---- prepare_data():: nodes_0 ----" );		console.log( nodes_0 );
		
		// сортировка массива узлов в соответсвии с id узлов
		nodes_0.sort( function(a, b) {
			if (b.id < a.id) {
				return 1;
			}
			return -1;
		})

		//  выделение одной ветки из дерева
		if ( sel_node > 0 ) {
		    let nl = 0;
	 		arc = arc.concat( nodes_0[sel_node].key ) ;  // заданная точка
			only.add( nodes_0[sel_node].key );
					console.log( "prepare_data---- only ----" );	console.log( only );
		    nl = nodes_0.length;
//				console.log( "---- nodes_0 ----" ); 	console.log( nodes_0 );
			for ( let i = sel_node; i < nl; ++i ) {
//				console.log( 'otrezalka:: '+i+' :: '+nodes_0[i].key );
				if(  ( only.has( nodes_0[i].key ) ) && (  nodes_0[i].to )  ) {
					arc = arc.concat( nodes_0[i].to )  ;  // добавляю прямые потомки сразу группой
					let nl = nodes_0[i].to.length;
					for ( let j = 0; j < nl ; ++j ) {
//						console.log( j+" / "+nl+" :: " + nodes_0[i].to[j] );
						only.add( nodes_0[i].to[j] );
						console.log( only );
					}
//					console.log( "---- arc ----" );		console.log( arc );
					console.log( "---- only ----" );	console.log( only );
					
				}
			}
//			console.log( "----- arc ------" ); 	console.log( arc );
			// фильтруем список прямых потомков на единственность и убираем undefined
		    nl = arc.length;
			for ( let i = 0; i < nl; ++i ) {
				 if( arc[i] ) { only.add( arc[i] ); } 
			}
			console.log( '----> only <------' ); 	console.log( only );
			
			// оставляем в узлах только потомков
			nl = nodes_0.length;
			for ( let i = 0; i < nl; ++i ) {
				if (   only.has( nodes_0[i].key )  ) {
					nodes.push( nodes_0[i] ) ;  
				// 
				}
			}			
				console.log( 'new nodes' );
				console.log( nodes );
/*		*/		
		} else {
			nodes = nodes_0;
		}
		

	   // собираем справочник по узлам - определение записи по key
	   // добавляем иденитификаторы строк
		let nl = nodes.length;
		for ( let i = 0; i < nl; ++i ) {
			nodes[i].id =  i  ;  // "перенумерация" записей в соответствии порядковым номером строки
	//		console.log( 'meshalka:: '+i+' :: '+nodes[i].id+' > '+nodes[i].label+' > '+nodes[i].key+' > '+nodes[i].to+'  !' );
			slinks.set( nodes[i].key, i );
		}

	//  console.log('======================================== ');
		//   тестовая распечатка справочника
/*		slinks.forEach(function(value,key) {
		  console.log('slinks:: key = ' + key +', value = ' + value);
		});
 */		  console.log( "------- slinks ------" );
		  console.log( slinks );


	  console.log('======================================== ');
		//  собираем таблицу связей
	    nl = nodes.length;
		let nn = 0 ;
		edges = [];
		console.log ( 'nodes.length: ' + nl )
		for ( let i = 0; i < nl; ++i ) {
			if( nodes[i].to ) {
				let k_to = nodes[i].key;
				let n_to = nodes[i].to;
				let ntl = n_to.length;	// длинна списка
				if ( n_to != 0 ) {  // если в списке есть информация
		//		console.log('value::object ---------['+n_to+']'  );
					for ( let i = 0; i < ntl; ++i ) {
						let edg =  { 
						   from: slinks.get(k_to),
						   to: slinks.get( n_to[i] ),
						  // i:  nn 
						};
					//	console.log ( edg );
						edges[nn] = edg ;
						nn++;
					}	
				}
			}	
		} 
/* */
		console.log( "-------- nodes ------------" ); 	console.log( nodes );
		console.log( "-------- edges ------------" ); 	console.log( edges );

/*	  console.log('======================================== ');
		//   тестовая распечатка справочника
		edges.forEach(function(value,key) {
		  console.log('edges:: key = ' + key +', from = ' + value.from  +', to = ' + value.to );
		})
*/ 		console.log( "---> function prepare_data () <---- end" );
	}
// --	function prepare_data ()	 ---- end
	


// --------------------------- выше нормальная зона 	----------------------------------------------- //
// --------------------------- начало зоны проб и ошибок ---------------------------------------------- //

      /**
       * This function fills the DataSets. These DataSets will update the network.
       */
   function redrawAll(gephiJSON) {
        if (gephiJSON.nodes === undefined) {
          gephiJSON = gephiImported;
        } else {
          gephiImported = gephiJSON;
        }

        nodes.clear();
        edges.clear();

        var fixed = fixedCheckbox.checked;
        var parseColor = parseColorCheckbox.checked;

        var parsed = vis.parseGephiNetwork(gephiJSON, {
          fixed: fixed,
          parseColor: parseColor,
        });

        // add the parsed data to the DataSets.
        nodes.add(parsed.nodes);
        edges.add(parsed.edges);

        var data = nodes.get(2); // get the data from node 2 as example
        nodeContent.innerText = JSON.stringify(data, undefined, 3); // show the data in the div
        network.fit(); // zoom to fit
   }

// --------------------------- конец зоны проб и ошибок



/*
$(function(){  // Страница загружена!
	console.log('Готов!');
	$("#main").on('click',  function(){ 
		console.log('clck');
	});
});
*/