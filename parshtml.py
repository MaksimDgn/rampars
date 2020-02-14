#!/usr/bin/env python
#coding=utf8
from bs4 import BeautifulSoup
import re
import joininet
import main
import requests
import outpars
import flashka


# Python Requests Tutorial - https://youtu.be/tb8gHvYlCFs
def parspage():
    # взять из списка ссылку
    url = joininet.pageslist()
## распарсить номера страниц и ссылки на страницы

    pgr = requests.get(url[1])
    
    print("*** module joininet def parspage()")
    print(" status {} ".format(pgr.status_code))
    

# Парсим страницу
    soup = BeautifulSoup(pgr.text, 'html.parser')
    #print (soup.prettify())
    t = ["1111", "2222"]
#    outpars.filebd(t)
#i = 0
#Товаришь! Не ведись на буржуйскую хрень! 14 февраля - обычный день!

def pars_main():
    doc = open("rum/iram.html")
    soup = BeautifulSoup(doc, 'html.parser')
    #print (soup.prettify())
    i = 0
    div = soup.find("div", id="store_products")
    img = div.find_all('div', {"class": 'title'}, 'a')
    price = div.find_all('div', {"class": 'price'})


    USBdb = {'nameT':[], 'links':[], 'prices':[]}
    for t in img:
        lin = t.a.get('href')
        text = t.a.get_text()
        USBdb['nameT'].append(text.strip())
        USBdb['links'].append(lin)



        for pr in price:
            priceUnit = pr.get_text()
            USBdb['prices'].append(priceUnit.strip())

# помещение в массив объектов
    ar=[]
    i=0
    list = ['a', 'b', 'c']
    
    for nm in USBdb['nameT']:
        sname = USBdb['nameT'][i]
        ssize = str(16)
        sprice = USBdb['prices'][i]
        slink = USBdb['links'][i]
        
        result_name = sname.encode('utf-8')
        result_size = ssize.encode('utf-8')
        result_price = sprice.encode('utf-8')
        result_link = slink.encode('utf-8')
        # print("result  :" + result)
        # print("result type: ")
        # print(type(result))
        # re2 = result.decode('cp1251')
        # print("result 2" + re2)
        # print("re2 type: ")
        # print(type(re2))
        
        # print(unicode(USBdb['nameT'][i], 'ascii'))
        
        nm = flashka.Flashka(result_name, result_size, result_price, result_link)
        # print(nm.printInfo())
        # print(tx)
        ar.append(nm.printInfo())

        print(ar[i])


        i+=1

    print("total: %d"%i)
    print(len(ar))
#    Запись в файл
    outpars.filebd('out2.txt', ar, len(ar))


    # for outbd in USBdb['nameT']:
    #     print('-'*79)
    #     print('  {}\n   {}\n    '.format(USBdb['links'][i].encode(encoding='ascii',errors='strict'), USBdb['nameT'][i]))
    #     print(USBdb['links'][i])
    #     print(len(USBdb['links'][i]))
    #     print(USBdb['nameT'][i] )
    #     print(USBdb['prices'][i])
    #     i+=1
    #     print("total: %d"%i)


# for tag in div.next_element:
#     if tag is None:
#         print(tag.name)
#     else:
#         print(tag("class"))
    

# for text in a:
#     if text is None:
#         print(text)
#     else:
#         print(text.name)


#<div class="items tiles-view">
#for links in soup:
#    i=i+1
#    print("{}) {} ".format(i, links))
#print(soup.p)
