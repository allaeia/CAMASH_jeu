#!/usr/bin/env python
import sys
import os

def main(arg):
    w = 0;
    h = 0;
    _id = "";
    line = [];
    begin_svg = False;
    begin_end = False;
    fichier_svg = open(arg,"r")
    for i in fichier_svg:
        s=i.split('\n')[0]
        if(not begin_svg):
            if(s.find("<svg")!=-1):
                begin_svg = True;
            line.append(s);
        else:
            if(not begin_end):
                if(s.find('>')!=-1):
                    begin_end=True
                    line.append(" preserveAspectRatio=\"xMinYMin meet\"")
                    line.append("viewBox=\"0 0 " + w + " " + h+ "\"")
                    line.append(s)
                else:
                    if(s.find("width")!=-1):
                        w=s.split('"')[1]
                        line.append("width=\"100%\"")
                    elif(s.find("height")!=-1):
                        h=s.split('"')[1]
                        line.append("height=\"100%\"")
                    elif(s.find("id")!=-1):
                        _id = s.split('"')[1];
                        line.append(s)
                    else:
                        line.append(s)
            else:
                if(s.find("</svg>")!=-1):
                    line.append("<script id=\"script"+_id+"\">document.getElementById(\""+_id+"\").addEventListener(\"click\",sendClickToParentDocument,false);function sendClickToParentDocument(evt){var target = evt.target; if(target.correspondingUseElement){target = target.correspondingUseElement;}if (window.parent.svgElementClicked){window.parent.svgElementClicked(target);}else{alert(&quot;You clicked '&quot; + target.id + &quot;' which     is a &quot; + target.nodeName + &quot; element&quot;);}}</script>");
                    line.append(s)
                else:
                    line.append(s)
    fichier_svg.close();
    fichier_out = open(arg,"w");
    for i in line:
        fichier_out.write(i+"\n")
    fichier_out.close()
if __name__ == "__main__" :
     main(sys.argv[1])

