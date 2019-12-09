#coding=utf8
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

img = div.find_all('div', {"class": 'image'}, 'a')
price = div.find_all('div', {"class": 'price'})
print(price)

for t in img:
    text = t.a.get('href')
    lin = t.a.get_text()
    print(text)
    print(lin)


for pr in price:
    text = pr.get_text()
    print(text)
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
