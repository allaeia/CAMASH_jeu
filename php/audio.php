<!DOCTYPE html>
<html lang="fr">
	<head>
	<meta charset="UTF-8" />
		<title>audio</title>
	</head>
	<body>
	<?php
		$q='Bonjour%20tout%20le%20monde';
		$r=str_replace("%20","_",$q);
		$nom_mp3='./snd/'.$r.'.mp3';
			
		if(strpos($_SERVER['HTTP_USER_AGENT'],'OPR/')) {
			$r=str_replace("%20","_",$q);
			$nom='./snd/'.$r.'.wav';
			$type="x-wav";
			if(! file_exists($nom)) { //on ne re-telecharge que si on a pas deja telecharge le fichier audio
				$url='http://translate.google.com/translate_tts?tl=fr&q=%22'.$q.'%22';
				$urlContents = file_get_contents($url);
				// /!\ changer "C:/ffmpeg/bin/ffmpeg" en fonction de l'endroit de ou il est instale
				$ligne_commande="C:/ffmpeg/bin/ffmpeg -i ".$nom_mp3." -acodec pcm_s16le ".$nom;
				exec($ligne_commande);
			}
		} else {
		//penser a installer QuickTime pour faire marcher la balise sous Safari
			$type="mpeg";
			if(! file_exists($nom)) {
				$url='http://translate.google.com/translate_tts?tl=fr&q=%22'.$q.'%22';
				$urlContents = file_get_contents($url);
				file_put_contents($nom_mp3,$urlContents);
			}
		}
	?>
 
<!-- Embed the MP3 file using the AUDIO tag of HTML5 -->
<audio controls="controls" autoplay="autoplay" style="display:none;">
  <source src="<?php echo $nom; ?>" type='audio/<?php echo $type; ?>' />
</audio>
	</body>
</html>