CAMASH
======

Autors
------
Guénon Marie & Favreau Jean-Dominique

Licence
-------
GNU GPLv3

Language
--------
French

Abstract
-------
Game for children to learn the alphabet. Originally created and designed for children with intellectual disabilities during one of our courses in Polytech' Nice Sophia Antipolis.

How to play
-----------
* you can play online at the following adress: http://users.polytech.unice.fr/~favreau/CAMASH_jeu/src/index.html
* or you can play it locally after installing a local server (wamp for example on Windows). 
To have mor details, see the "Dossier_aide_technique.pdf". Note that to have the sounds playing, you must have the right to wrote and exectute the folder "snd/".

Technologies used
-----------------

* html5 / CSS3 : stucture of the pages
* SVG : displaying all the images, in order to have a nice visual rendering whatever the screen is.
* Javascript / JQuery : manage the mouse events, the random draw of the letters, playing the sounds, ...
* php / ajax : creating the speech syntethis based on voicerss and google.translate text-to-speech web interface.

Contributing
------------

1. Fork it.
2. Create a branch (`git checkout -b my_markup`)
3. Commit your changes (`git commit -am "Added Snarkdown"`)
4. Push to the branch (`git push origin my_markup`)
5. Open a [Pull Request]