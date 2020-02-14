#coding=utf8

def filebd(filenameBD, text, n):
    fname = open(filenameBD, 'w')
    endArray = len(text)
    print(type(endArray))
          
    if (endArray > 0):
        print('12345')
        while(n>0):
            # st = text[n].encode('utf-8') +" " +str(n)
            st = text[n-1]
            print(st)
            fname.write(st+'\n')
            n-=1
    else:
        print('===')
    fname.close()
    # filename = open('out.txt', 'w')
    # filename.writelines(textpars)
    # filename.close()
