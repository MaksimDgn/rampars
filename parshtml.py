
from bs4 import BeautifulSoup
import re

#soup = BeautifulSoup("<p>Some<b>bad<i>HTML", 'html.parser')
doc = open("rum/iram.html")
soup = BeautifulSoup(doc, 'html.parser')
#print (soup.prettify())

i = 0

#print(soup.get_text())
#soup.find_all("div", class="items tiles-view")
div = soup.find("div", id="store_products")

#img = div.find_all('div', {"class": 'image'}, 'a')
img = div.find_all('div', {"class": 'title'}, 'a')
price = div.find_all('div', {"class": 'price'})
#print(price)

USBdb = {'nameT':[], 'links':[], 'prices':[]}
for t in img:
    lin = t.a.get('href')
    text = t.a.get_text()
    USBdb['nameT'].append(text.strip())
    USBdb['links'].append(lin)
#    print(text)
#    print(lin)


for pr in price:
    priceUnit = pr.get_text()
    USBdb['prices'].append(priceUnit.strip())
#    print(priceUnit)


#    print(" {} {} {}".format(outbd['nameT'], outbd['prices'], outbd['links']))
#    print("{} {} ".format(USBdb['links'][i], USBdb['nameT'][i]))

for outbd in USBdb['nameT']:
    print('-'*10)
    print(USBdb['links'][i])
    print(USBdb['nameT'][i] )
    print(USBdb['prices'][i])
    i+=1
print("total: %d"%i)


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
