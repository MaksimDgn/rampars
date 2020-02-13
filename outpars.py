#coding=utf8

def filebd(textpars):
    filename = open('out.txt', 'w')
#    text = textpars
    filename.writelines(textpars)
    filename.close()
