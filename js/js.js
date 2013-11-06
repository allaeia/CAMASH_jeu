var doc;
function svgElementClicked(theElement)
{
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
anim(fo,0,50,f);
	console.log($('#'+e_parent.getAttributeNS(null,"id")).parent());
	//console.log(document);
}
function f(x,y)
{
	var r = new Object();
	r.x=x+10;
	r.y=y-10;
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
function anim2(obj, xfin, yfin)
{
	len=100;
	anim22(obj,0,len,xfin,yfin);	
}
function anim(obj,step,len,curv)
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
	tirer_lettre(5);
	
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
	var texte = "trouve la lettre";
	ajax_lecture(texte);
	tab.push(trouver);
	window.setTimeout(function(){ajax_lecture(trouver);
		window.setTimeout(function(){tirer_lettre_2(n,0,tab,trouver,index)},1000);},1000);

}
function tirer_lettre_2(n_total,i,tab,trouver,index)
{
	if(i!=index)
	{
		var lettre = non_uniforme();
		while(tab.indexOf(lettre)!=-1)
		{
			lettre=non_uniforme(); 
		}
		tab.push(lettre);
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
	elem.setAttribute("width","3%")
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
		
	anim2($(elem),x,y);
	ajax_lecture(lettre);
	if(i<n_total)
	{
		window.setTimeout(function(){tirer_lettre_2(n_total,i,tab,trouver,index)},2000);
	}
}

function ajax_lecture(lettre)
{
	$.ajax({
		type: "GET",
		async: false,
		url: "../php/audio2.php",
		data: "mot="+lettre,
		success: function(msg){
			$("#ma_div").append('<audio controls="controls" autoplay="autoplay" style="display:none;">'+msg+'</audio>');
		}
	});
}
