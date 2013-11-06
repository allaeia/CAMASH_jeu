var alphabet = ["B","C","D","F","geai","H","J","K","L","M","O","P","Q","R","U","vai","W","hix","Y","Z","A","E","hih","N","S","T"];

function uniforme(){
	var nombre = Math.floor(Math.random() * 26);
	return alphabet[nombre];
}

function non_uniforme(){
	var nombre = Math.floor(Math.random() * 100)+1;
	//document.write(nombre+"<br />");
	if(nombre <= 17.26){
		return alphabet[21];
	}else if(nombre <= (17.26+8.40)){
		return alphabet[20];
	}else if(nombre <= (17.26+8.40+7.34)){
		return alphabet[22];
	}else if(nombre <= (17.26+8.40+7.34+7.13)){
		return alphabet[23];
	}else if(nombre <= (17.26+8.40+7.34+7.13+8.08)){
		return alphabet[24];
	}else if(nombre <= (17.26+8.40+7.34+7.13+8.08+7.07)){
		return alphabet[25];
	}
	nombre = Math.floor(Math.random() * 20)+1;
	return alphabet[Math.floor(Math.random() * 15)+1];
}
