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
	r.x=x+1;
	r.y=y-1;
	return r;
}
function anim(obj,step,len,curv)
{
	var x = parseInt(fo.attr('x').split("%")[0]);
	var y = parseInt(fo.attr('y').split("%")[0]);
	var r = curv(x,y);
	obj.attr('x',r.x+"%");
	obj.attr('y',r.y+"%");
	step++;
//jquerry animate->plus fluide
//OR path svg animate
	if(step!=len)
	{
		window.setTimeout(function(){anim(obj,step,len,curv)},50);
	}
}
function setup2(elem)
{
	doc=elem;
	//console.log(elem);
	 var mySvg = document.getElementById("test_lettre_obj");
        mySvg.addEventListener("load", function() {
            var svg = mySvg.getSVGDocument();
			console.log(svg);
            //svg.getElementById("[insert svg element id here]");
        });
		
   // console.log($('#test_lettre_obj')[0].getAttributeNS(null,"id"));
	//$('#test_lettre_obj')[0];
	//.onclick=function(){alert("aaaa");};
	//.getSVGDocument()
}

function onEnter(obj) {
  alert($(obj).attr("id"));

}
function tirer_lettre(n)
{
	n_lettre = n;
	$("#svg1").append("<object/>");
}
