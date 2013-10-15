<!DOCTYPE html>
<html lang="fr">
	<head>
	<meta charset="UTF-8" />
		<title>audio</title>
	</head>
	<body>
	test
	<?php
		$q='Bonjour%20tout%20le%20monde';
		$url='http://translate.google.com/translate_tts?tl=fr&q=%22'.$q.'%22';
		$opts = array(
		  'http'=>array(
			'method'=>"GET",
			'header'=>"Accept-language: fr\r\n" .
					  "Cookie: foo=bar\r\n" .
					  "User-Agent: ". $_SERVER['HTTP_USER_AGENT']
		  )
		);
		
		$context = stream_context_create($opts);
		$urlContents = file_get_contents($url, false, $context);
		if(strpos($_SERVER['HTTP_USER_AGENT'],'OPR/')
		|| strpos($_SERVER['HTTP_USER_AGENT'],'Safari/')) {
			echo "Vous utilisez Opera ou Safari";
			//il faut faire la conversion
			
			
			$r=str_replace("%20","_",$q);
			$nom='./snd/'.$r.'.wav';
			file_put_contents($nom,$urlContents);
		} else {
			echo "Vous n utilisez pas ni Opera, ni Safari";
			$r=str_replace("%20","_",$q);
			$nom='./snd/'.$r.'.mp3';
			file_put_contents($nom,$urlContents);
		}
	?>
 
<!-- Embed the MP3 file using the AUDIO tag of HTML5 -->
<audio controls="controls" autoplay="autoplay" style="display:none;">
  <source src="<?php echo $nom; ?>" type="audio/mp3" />
</audio>
	</body>
</html>