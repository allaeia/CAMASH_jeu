<?php
function size($nom)
{
	if(strpos($_SERVER['HTTP_USER_AGENT'],'OPR')
		|| (strpos($_SERVER['HTTP_USER_AGENT'],'Linux') && strpos($_SERVER['HTTP_USER_AGENT'],'Firefox'))) {			
		$kilobitrate=64;//64 pour les wav de voicerss
		$biterate = $kilobitrate*1024;
		$nom_fichier="../snd/".str_replace(" ","_",$nom).'.wav';
		$taille = filesize($nom_fichier)*8;
		$seconde = $taille/$biterate;
	}
	else
	{
		$kilobitrate=32;// 32 pour les mp3 de google translate
		$biterate = $kilobitrate*1024;
		$nom_fichier="../snd/".str_replace(" ","_",$nom).'.mp3';
		$taille = filesize($nom)*8;
		$seconde = $taille/$biterate;
	}
	return $seconde;
}
?>

<?php

$tmp=size($_GET["lettre"]);
echo $tmp;

?>
