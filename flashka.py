#!/usr/bin/env python

class Flashka:
    # name
    # price
    # size
    # link
    
    def __init__(self, name, size, price, link):
        
        self.name = name
        self.size = size
        self.price = price
        self.link = link

    def printInfo(self):
        ss = '{} {} {} {}'.format(self.name, self.size, self.price, self.link)
        return ss

    # def getName():

    # def getLink():







def main():
    usb=Flashka('FlashName', 32, 20, 'https://youtu.be/Dpfij8Y_q10?t=446')
    print(usb.name)
    print(usb.size)
    # print('{} {} {}'.format(usb.name, usb.size, usb.price))
    t =   "*"*25
    str = '{} \\n{} {} {}'.format(usb.name, usb.size, usb.price, usb.link)
    print(t)
    print(str+' ! ')
    print(usb.printInfo())

if __name__ =='__main__':
    main()
