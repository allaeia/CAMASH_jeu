var alphabet_consonnes = ["B","C","D","F","G","H","J","K","L","M","P","Q","R","V","W","X","Z","T","S","N"];
var alphabet_voyelles = ["O","U","Y","A","E","I"];

function uniforme(){
	var nombre = Math.floor(Math.random() * 26);
	return alphabet[nombre];
}

function non_uniforme(){
	var nombre = Math.floor(Math.random() * 100)+1;
	//document.write(nombre+"<br />");
	if(nombre <= 17.26){//E
		return alphabet_voyelles[4];
	}else if(nombre <= (17.26+8.40)){//A
		return alphabet_voyelles[3];
	}else if(nombre <= (17.26+8.40+7.34)){//I
		return alphabet_voyelles[5];
	}else if(nombre <= (17.26+8.40+7.34+7.13)){//N
		return alphabet_consonnes[19];
	}else if(nombre <= (17.26+8.40+7.34+7.13+8.08)){//S
		return alphabet_consonnes[18];
	}else if(nombre <= (17.26+8.40+7.34+7.13+8.08+7.07)){//T
		return alphabet_consonnes[17];
	}
	//autres lettres
	nombre = Math.floor(Math.random() * 20)+1;
	if(nombre<17)
	{
		return alphabet_consonnes[nombre];
	}
	return alphabet_voyelles[nombre-17];
}
