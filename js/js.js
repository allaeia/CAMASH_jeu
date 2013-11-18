var doc;
var tab2 = [];
var lettre_a_trouver;
var son_a_trouver;
var lettre_a_trouver_obj;
var lettre_a_trouver_id_audio;

var alphabet_consonnes = ["B","C","D","F","G","H","J","K","L","M","P","Q","R","V","W","X","Z","T","S","N"];
var alphabet_voyelles = ["O","U","Y","A","E","I"];
var son_consonnes = ["beu","que","deu","feu","gueu","h","j","que","leu","meu","peu","queue","reu","vai","w","hix","ze","te","seu","neux"];
var son_voyelles = ["o","u","y","a","e","hih"];

var SVGDocument = null;
var SVGRoot = null;

var gagner = false;

function Init(evt)
{
	SVGDocument = evt.target.ownerDocument;
	SVGRoot = SVGDocument.documentElement;
	SVGDocument.getElementById("soleil2").setAttributeNS(null, 'visibility', 'hidden');
	SVGDocument.getElementById("soleil3").setAttributeNS(null, 'visibility', 'hidden');

}

function Audio()
{
	this.currentSon=0;
	this.nextSon=[];
	this.play=false;
	this.current_id_son=0;

	this.changerSon=function(new_id,new_next_son){
		this.play=false;
		if(this.current_id_son!=0)
		{
			this.current_id_son.pause();
			this.current_id_son.currentTime=0;
		}
		this.currentSon=new_id;
		this.nextSon=new_next_son;
		var id = "son_"+this.currentSon;
		this.current_id_son = document.getElementById(id);
		this.current_id_son.play();
		this.play=true;
	};
	
	this.loop=function(){
		if(this.play)
		{
			if(this.current_id_son.currentTime>=this.current_id_son.duration || this.current_id_son.ended)
			{
				this.play=false;
				if(this.nextSon.length!=0)
				{
					this.current_id_son.pause();
					this.current_id_son.currentTime=0;
		
					this.currentSon=this.nextSon[0];
					console.log("!!!!");
					console.log(this.nextSon);
					this.nextSon.shift();
					console.log(this.nextSon);
					this.current_id_son = document.getElementById("son_"+this.currentSon);
					this.current_id_son.play();					
					this.play=true;
				}
			}
		}
		var that = this;
		window.setTimeout(function(){that.loop()},50);
	};
}

var mon_audio;

function Init_audio()
{
	var str="tu dois trouver la lettre";
	ajax_load_balise(0,str,str);
	str = "tu as cliquer sur la lettre";
	ajax_load_balise(1,str,str);
	str = "tu dois trouver la lettre";
	ajax_load_balise(2,str,str);
	str = "bravo";
	ajax_load_balise(3,str,str);
	str = "tu as trouver";
	ajax_load_balise(4,str,str);
	mon_audio = new Audio();
	mon_audio.loop();
}

function ajax_load_balise(id,nom,son)
{
	$.ajax({
		type: "GET",
		url: "../php/audio2.php",
		data: "mot="+nom+"&son="+son,
		success: function(msg){
			audio='<audio id=son_'+id+' >'+msg+'</audio>';
			$("#audio").append(audio);
		}
	});
}


function Soleil()
{
	this.start_angle = [0,10,0,10]
	this.start_angle_delta = [1,-1,1,-1]
	this.angle = 0;
	this.delta_angle = 1;
	this.index = 0;
	this.n_state = 0;
	this.max_n_state = 4;
	this.currentSoleil = 1;

	this.continu = false;
	this.content = "";
	this.divInit = "animSoleil";
	this.div = "animSoleil";
	this.anim_function = function(){
		$("#"+this.div).css('-moz-transform-origin', 'center');
        $("#"+this.div).css('-webkit-transform-origin', 'center center');
        $("#"+this.div).css('-o-transform-origin', 'center center');
       	$("#"+this.div).css('transform-origin', 'center center');
		$("#"+this.div).css('transform', 'rotate('+this.angle+'deg)');
		this.index = this.index + 1;
		this.angle = this.angle + this.delta_angle;
		if(this.index>10)
		{
			if(this.n_state<this.max_n_state)
			{
				this.n_state = this.n_state + 1;
				this.index = 0;
				this.angle = this.start_angle[this.n_state];
				this.delta_angle = this.start_angle_delta[this.n_state];
			}
			else
			{
				SVGDocument.getElementById("soleil1").setAttributeNS(null, 'visibility', 'visible');
				SVGDocument.getElementById("soleil2").setAttributeNS(null, 'visibility', 'hidden');
				SVGDocument.getElementById("soleil3").setAttributeNS(null, 'visibility', 'hidden');
				this.anim=false;
			}
		}
	}
	this.animate_2 = function(){	
			this.anim=true;
			this.anim_function();
			if(this.anim==true)
			{
				var that = this;
				window.setTimeout(function(){that.animate_2()},100);
			}
	};
	this.animate = function(){
		if(this.content=="")
		{
			this.currentSoleil=2;
		}else{
			this.currentSoleil=3;
		}
		this.div=this.divInit+this.currentSoleil;
		for (var i=1; i<4; i++)
		{
			if(i==this.currentSoleil){
				SVGDocument.getElementById("soleil"+i).setAttributeNS(null, 'visibility', 'visible');
			}else{
				SVGDocument.getElementById("soleil"+i).setAttributeNS(null, 'visibility', 'hidden');
			}
		}
		this.n_state = 0;
		this.index = 0;
		this.angle = this.start_angle[this.n_state];
		this.delta_angle = this.start_angle_delta[this.n_state];

		if(!this.anim)
			this.animate_2();
	};
}
var soleil = new Soleil();
function Lettre(obj,lettre){
	this.idAudio="";
	this.lettre = lettre;
	this.obj = obj;
	this.move = false;
	this.in_move = false;
	this.xfin = 0;
	this.yfin = 0;
	this.step = 0;
	this.len = 0;
	this.resize_end = false;
	this.curv = function(){};
	this.stop = function(){this.anim=function(){};};
	this.anim_function = function(){};;
	this.anim_2 = function(){
		this.in_move=false;
		if(this.move==false)
		{
			return;
		}
		this.anim_function();
		if(this.move==true)
		{
			this.in_move=true;
			var that = this;
			window.setTimeout(function(){that.anim_2()},50);
		}
	};
	this.anim = function(){
		if(this.in_move==false)
			this.anim_2();
	};
	this.diminuer_size = function()
	{
		var w = parseInt(this.obj.attr('width').split("%")[0]);
		var w2 = w - 0.1;
		var x0 = parseInt(this.obj.attr('x').split("px")[0]);
		var y0 = parseInt(this.obj.attr('y').split("px")[0]);
		var x = x0 + 4.5;
		var y = y0 + 5;

		if(w2<0)
		{
			w2=0;
			this.move = false;
		}
		this.obj.attr('width',w2+"%");
		this.obj.attr('x',x+"px");
		this.obj.attr('y',y+"px");
	};
	this.anim1 = function (){

		var x0 = parseInt(this.obj.attr('x').split("px")[0]);
		var y0 = parseInt(this.obj.attr('y').split("px")[0]);
		var x = x0+(this.xfin-x0)*this.step/this.len;
		var y = y0+(this.yfin-y0)*this.step/this.len;
		if(Math.abs(this.xfin-x)<1)
			x=this.xfin;
		if(Math.abs(this.yfin-y)<1)
			y=this.yfin;
		
		this.obj.attr('x',x);
		this.obj.attr('y',y);
		this.step++;
	//jquerry animate->plus fluide
	//OR path svg animate
		if(this.step<this.len&&(x!=this.xfin||y!=this.yfin)&&this.move==true)
		{
		//	this.in_move=true;
		//	var that = this;
		//	window.setTimeout(function(){that.anim()},50);
		}
		else
		{
			if(this.resize_end)
				this.anim_function = this.diminuer_size;
			else
				this.move=false;
		}
	};
	this.anim2 = function(){
		var x = parseInt(this.obj.attr('x').split("px")[0]);
		var y = parseInt(this.obj.attr('y').split("px")[0]);
		var r = this.curv(x,y);
		this.obj.attr('x',r.x+"px");
		this.obj.attr('y',r.y+"px");
		this.step++;
//jquerry animate->plus fluide
//OR path svg animate
		if(this.step<this.len&&this.move==true)
		{
		//	this.in_move=true;
		//	var that = this;
		//	window.setTimeout(function(){that.anim()},50);
		}
		else
		{
			this.move = false;
		}
	};
}
function svgElementClicked(theElement)
{
	if(gagner)
		return;
	//jQuery('audio').each(function(){this.pause();});
	//alert( "A <> element.");
	console.log(theElement);
	var id=theElement.getAttributeNS(null,"id");
	console.log(id);
	//console.log(doc);
	//doc.getElementById(id);
	e_parent=theElement.ownerDocument.defaultView.frameElement;
	console.log(e_parent.getAttributeNS(null,"id"));
	fo=$('#'+e_parent.getAttributeNS(null,"id")).parent();
	console.log(fo);
	var x = parseInt(fo.attr('x').split("%")[0]);
console.log(x);	
//	fo.attr('x',x+1+"%");
	console.log($(fo).attr("id"));	
	var lettre = tab2[$(fo).attr("id")];
	if(lettre.lettre == lettre_a_trouver)
	{
		gagner = true;
		var texte = "tu as trouver";
		var texte2 = "bravo";
		mon_audio.changerSon(3,[4]);
		/*ajax_lecture(texte,texte);
		window.setTimeout(function(){ajax_lecture(texte2,texte2)},2000);*/
		for(var key in tab2)
		{
			a=tab2[key];
//			console.log(tab2[a]);
			if(a.lettre != lettre_a_trouver)
			{
				a.move = false;
				a.len = 100;
				a.step = 0;
				a.xfin = 208;
				a.yfin = 840;
				a.resize_end=true;
				a.anim_function=lettre.anim1;
				a.move = true;
				a.anim();
			}
		}
		soleil.content = "";
		soleil.animate();
//		animation_victoire_defaite("animSoleil","")
	}
	else
	{
		var texte = "tu as cliquer sur la lettre";
		var texte2 = "tu dois trouver la lettre";
		console.log("???"),
		console.log(lettre);
		console.log(lettre_a_trouver_obj);
		mon_audio.changerSon(1,[lettre.idAudio,2,lettre_a_trouver_id_audio]);
		/*ajax_lecture(texte,texte);
		son_lettre=son(lettre.lettre);
		var duree = duration_lettre(lettre.lettre);
		window.setTimeout(function(){ajax_lecture(lettre.lettre,son_lettre);
			window.setTimeout(function(){ajax_lecture(texte2,texte2);
				window.setTimeout(function(){ajax_lecture(lettre_a_trouver,son_a_trouver)
				},3000)
			},2000)
		},2500);*/
		soleil.content = "pas_";
		soleil.animate();
		//animation_victoire_defaite("animSoleil","pas_")

		lettre.move = false;
		lettre.len = 100;
		lettre.step = 0;
		lettre.xfin = 208;
		lettre.yfin = 840;

		lettre.resize_end=true;	
		lettre.anim_function=lettre.anim1;
		lettre.move = true;
		lettre.anim();
	}


	
	console.log($('#'+e_parent.getAttributeNS(null,"id")).parent());
	//console.log(document);
}
function f(x,y)
{
	var r = new Object();
	r.x=x+2;
	r.y=y-2;
	return r;
}
function anim22(obj,step,len,xfin,yfin)
{
	var x0 = parseInt(obj.attr('x').split("px")[0]);
	var y0 = parseInt(obj.attr('y').split("px")[0]);
	var x = x0+(xfin-x0)*step/len;
	var y = y0+(yfin-y0)*step/len;
	if(Math.abs(xfin-x)<1)
		x=xfin;
	if(Math.abs(yfin-y)<1)
		y=yfin;
	
	obj.attr('x',x);
	obj.attr('y',y);
	step++;
//jquerry animate->plus fluide
//OR path svg animate
	if(step!=len&&(x!=xfin||y!=yfin))
	{
		window.setTimeout(function(){anim22(obj,step,len,xfin,yfin)},50);
	}

}
function anim2(lettre)
{
	lettre.move = false;
	lettre.len = 100;
	lettre.step = 0;
	lettre.anim_function=lettre.anim1;
	lettre.resize_end=false;
	lettre.move = true;
	lettre.anim();
}
function anim_hzbfgoqlk(obj,step,len,curv)
{
	var x = parseInt(obj.attr('x').split("px")[0]);
	var y = parseInt(obj.attr('y').split("px")[0]);
	var r = curv(x,y);
	obj.attr('x',r.x+"px");
	obj.attr('y',r.y+"px");
	step++;
//jquerry animate->plus fluide
//OR path svg animate
	if(step!=len)
	{
		window.setTimeout(function(){anim(obj,step,len,curv)},50);
	}
	else
	{
	//tirer_lettre(1);
	}
}
function setup2(elem)
{
 	Init_audio();
	window.setTimeout(function(){tirer_lettre(5)},1000);
	
	//doc=elem;
	//console.log(elem);
	/* var mySvg = document.getElementById("test_lettre_obj");
        mySvg.addEventListener("load", function() {
            var svg = mySvg.getSVGDocument();
			console.log(svg);
            //svg.getElementById("[insert svg element id here]");
        });//*/
		
   // console.log($('#test_lettre_obj')[0].getAttributeNS(null,"id"));
	//$('#test_lettre_obj')[0];
	//.onclick=function(){alert("aaaa");};
	//.getSVGDocument()
}

function onEnter(obj) {
  alert($(obj).attr("id"));

}
function makeSVG(tag, attrs) {
	var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
	for (var k in attrs)
	el.setAttribute(k, attrs[k]);
	return el;
}

function tirer_lettre(n)
{
	var tab = [];

	var trouver = non_uniforme();
	var index = Math.floor(Math.random() * 5);
	if(trouver=="C" || trouver=="K" || trouver=="Q")
	{
		tab.push("C");
		tab.push("K");
		tab.push("Q");
	}
	else
	{
		tab.push(trouver);
	}
	lettre_a_trouver_id_audio=5+index;
	lettre_a_trouver = trouver;
	trouver_son=son(trouver);
	ajax_load_balise(5+index,trouver,trouver_son);


	mon_audio.changerSon(0,[(5+index)]);


	/*var duree = duration_lettre(trouver);
	var size = ajax_size(vous_devez);
	if(size==0)
	{
		size=2;
	}

    	window.setTimeout(function(){ajax_lecture(trouver,trouver_son);
		window.setTimeout(function(){tirer_lettre_2(n,0,tab,trouver,index)},2000);},3000);
*/
	window.setTimeout(function(){tirer_lettre_2(n,0,tab,trouver,index)},5000);
	
}

function tirer_lettre_2(n_total,i,tab,trouver,index)
{
	var idSon=5+i;
	if(gagner)
	{
		return;
	}
	if(i!=index)
	{
		var lettre = non_uniforme();
		while(tab.indexOf(lettre)!=-1)
		{
			lettre=non_uniforme(); 
		}
		if(lettre=="C" || lettre=="K" || lettre=="Q")
		{
			tab.push("C");
			tab.push("K");
			tab.push("Q");
		}
		else
		{
			tab.push(lettre);
		}		
		var str= son(lettre);
		ajax_load_balise(idSon,lettre,str);
	}
	else
	{
		var lettre = trouver;
	}
	i=i+1;
	
	var elem = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
	elem.setAttribute("id","lettre_"+i)
	elem.setAttribute("x","208px")
	elem.setAttribute("y","840px")
	elem.setAttribute("width","5%")
	elem.setAttribute("height","100%");
	var obj = document.createElement('object',true);
		
	$(elem).append(obj);
	$("#svg1").append(elem);

	var elem_2 = document.getElementById("lettre_"+i);
	elem_2.style.display='none';

	obj.setAttribute("id","obj_lettre_"+i)
	obj.setAttribute("width","100%")
	obj.setAttribute("height","100%");
	obj.setAttribute("data","../img/Alphabet/Vectoriel/"+lettre+".svg");
	obj.setAttribute("type","image/svg+xml");
		
	elem_2.style.display='';
		
	var obj_2 = document.getElementById("obj_lettre_"+i);
	elem_2.replaceChild(obj_2,obj_2);
	
	//1600*50/100
	var w_pan = parseInt($("#panneau_affiche").attr("width").split("%")[0])/100;
	var x_pan = parseInt($("#panneau_affiche").attr("x").split("px")[0]);
	var x_affiche = parseInt($("#affiche").attr("x").split("%")[0])*w_pan/100*1600+x_pan;
		
	var h_pan = parseInt($("#panneau_affiche").attr("height").split("%")[0])/100;
	var y_pan = parseInt($("#panneau_affiche").attr("y").split("px")[0]);
	var y_affiche = parseInt($("#affiche").attr("y").split("px")[0])+y_pan;
		
	var x = x_affiche + w_pan*1600/(n_total+2)*(i);
	var y = y_affiche + h_pan*1200/2/2/2;
	//console.log(lettre);

	var current_lettre = new Lettre($(elem),lettre);
	current_lettre.idAudio=idSon;
	if(i-1==index)
	{
		lettre_a_trouver_obj=current_lettre;
	}
	
	console.log($(elem).attr("id"));	
	tab2[$(elem).attr("id")]=current_lettre;
	current_lettre.xfin = x;
	current_lettre.yfin = y;

	//anim2($(elem),x,y);
	anim2(current_lettre);
	var lettre_son=son(lettre);
	//ajax_lecture(lettre,lettre_son);
	if(i<n_total&&!gagner)
	{
		//marche pas le ajax_size si la lettre est pas déjà définie. (duree=0, en fait la size est calculée avant que la download soit finie
		//*** d'asynchrone
	//	var duree = duration_lettre(lettre);
	//	window.setTimeout(function(){jQuery('audio').each(function(){this.pause();});//le id a pas été trouvé dans le code ==> marche pas quand dynamique
			window.setTimeout(function(){tirer_lettre_2(n_total,i,tab,trouver,index)},2000);
	}
}

function ajax_lecture(lettre,lettre_son)
{
	$.ajax({
		type: "GET",
		url: "../php/audio2.php",
		data: "mot="+lettre+"&son="+lettre_son,
		success: function(msg){
			audio='<audio id=son_'+lettre+' controls="controls" autoplay="autoplay" style="display:none;">'+msg+'</audio>';
			$("#ma_div").append(audio);
			//document.body.appendChild(audio);
		}
	});
}

function ajax_size(lettre)
{
	var size;
	$.ajax({
		type: "GET",
		async: false,
		url: "../php/size.php",
		data: "lettre="+lettre,
		success: function(msg){
			size = msg;
		}
	});
	return size;
}

function son(lettre)
{
	if(alphabet_consonnes.indexOf(lettre)!=-1)
	{
		return son_consonnes[alphabet_consonnes.indexOf(lettre)];
	}
	return son_voyelles[alphabet_voyelles.indexOf(lettre)];
}

function is_consonne(lettre)
{
	if(alphabet_consonnes.indexOf(lettre)!=-1)
	{
		return true;
	}
	return false;
}

function duration_lettre(lettre)
{
	var size = ajax_size(lettre);
	if(size==0)
	{
		size=3;
	}
	if(is_consonne(lettre))
	{
		return size*1000/2;
	}
	else
	{
		return size*1000;
	}
}
function animation_victoire_defaite(div,content)
{
	$("#"+div).attr("data", "../img/animations/soleil_"+content+"content_1.svg");
	rotation_soleil(div,0,0);

	window.setTimeout(function(){rotation_soleil_inv(div,10,0);
		window.setTimeout(function(){rotation_soleil(div,0,0);
			window.setTimeout(function(){rotation_soleil_inv(div,10,0)},3000);},3000);},3000);
}

function rotation_soleil(src,angle,index)
{
	console.log("norm "+index);
	$("#"+src).css('-moz-transform-origin', 'center');
        $("#"+src).css('-webkit-transform-origin', 'center center');
        $("#"+src).css('-o-transform-origin', 'center center');
       	$("#"+src).css('transform-origin', 'center center');
	$("#"+src).css('transform', 'rotate('+angle+'deg)');
	if(index<10)
	{
		window.setTimeout(function(){rotation_soleil(src,(angle+1),(index+1))},250);
	}
}

function rotation_soleil_inv(src,angle,index)
{
	console.log("inv "+index);
	$("#"+src).css('-moz-transform-origin', 'center');
        $("#"+src).css('-webkit-transform-origin', 'center center');
        $("#"+src).css('-o-transform-origin', 'center center');
       	$("#"+src).css('transform-origin', 'center center');
	$("#"+src).css('transform', 'rotate('+angle+'deg)');
	if(index<10)
	{
		window.setTimeout(function(){rotation_soleil_inv(src,(angle-1),(index+1))},250);
	}
}
