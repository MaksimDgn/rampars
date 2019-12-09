a = 'str'
b = 999
array=[]

USBdb = {'nameT': ['aa', 'bb', 'cc'], 'links':[], 'prices':[]}



name = ['a', 'b', 'c', 'd']
price = ['2', '4', '3', '1']

i = 0
for nt in USBdb['nameT']:
    print(USBdb['nameT'][i])
    i+=1
i = 0
USBdb['nameT'].append('dd')
USBdb['nameT'].append('ee')
USBdb['nameT'].append('ff')
for nt in USBdb['nameT']:
    print("ESB name: {}".format(USBdb['nameT'][i]))
    i+=1


print(array)
#','.join(array)
#array.append(b)
array = name+price
print(array)
j=0
for i in name:
    print("{} - {} ".format(i, price[j]))
    j+=1

for ii in array[0:4]:
    print(" {} -- {}".format(ii, ii))
