#!/usr/bin/env python
#coding=utf8

import parshtml
import joininet
import outpars
import flashka


def main():
    ar=[]
    i=0
    list = ['a', 'b', 'c']
    for nm in list:
        nm = flashka.Flashka('MainFlashName'+str(i), i, 50, 'https://youtu.be/Dpfij8Y_q10?t=400')
        ar.append(nm.printInfo())
        print(ar[i])

        i+=1
    uuu = flashka.Flashka('MainFlashName', 120, 50, 'https://youtu.be/Dpfij8Y_q10?t=400')
    print("The is main !!!")

    print(uuu.printInfo())
    joininet.f()

#    outpars.filebd()
#  сделать цыкс записи в файл out.txt
   # parshtml.parspage()
    #parshtml.pars_main()


if __name__ =='__main__':
    main()

# emacs
# rgrep -https://youtu.be/Dpfij8Y_q10?t=446
# tags - https://youtu.be/Dpfij8Y_q10?t=496
