<!DOCTYPE html>
<html lang="fr">
	<head>
	<meta charset="UTF-8" />
		<title>audio2</title>
	</head>
	<body>
		Synth&egrave;se vocale compatible tout navigateur
		<?php
			$q='Bonjour%20tout%20le%20monde';
			$r=str_replace("%20","_",$q);
			$nom_mp3='./snd/'.$r.'.mp3';
			if(strpos($_SERVER['HTTP_USER_AGENT'],'Safari') && !strpos($_SERVER['HTTP_USER_AGENT'],'Chrome')) {
				$type="mpeg";
				if(! file_exists($nom_mp3)) {
					$url='http://translate.google.com/translate_tts?tl=fr&q=%22'.$q.'%22';
					exec('wget --user-agent=" " "'.$url.'" -O "'.$nom_mp3.'"');
				}
			}
			else
			{
				$nom='./snd/'.$r.'.wav';
				$type="x-wav";
				if(! file_exists($nom)) {
					$url='http://api.voicerss.org/?key=1baf863afafb4d04bab1a3803fc92b0a&hl=fr-fr&src=%22'.$q.'%22&c=wav';
					$commande = 'wget --user-agent=" " "'.$url.'" -O "'.$nom.'"';
					exec($commande);
					//echo $commande;
				}
			}		
		?>
		
		
		<audio controls="controls" autoplay="autoplay" style="display:none;">
		  <source src="<?php echo $nom; ?>" type='audio/<?php echo $type; ?>' />
		</audio>
<!-- Voice RSS informer code -->
<br />
<a href="http://www.voicerss.org" target="_blank">
<img src="http://www.voicerss.org/images/info_white.gif" width="88px" height="31" style="border: 0" alt="Voice RSS - Free online text-to-speech service" />
</a>
	</body>
</html>
