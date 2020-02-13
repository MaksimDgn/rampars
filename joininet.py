import requests

def pageslist():
    pages = ['https://ram.by/usb-flash-drives/usb-flash-drives/16gb-usb-i-bolee.html',
             'https://ram.by/usb-flash-drives/usb-flash-drives/16gb-usb-i-bolee.html?page=2',
             'https://ram.by/usb-flash-drives/usb-flash-drives/16gb-usb-i-bolee.html?page=3']
    # i = 0
    # for a in pages:
    #     r = requests.get(pages[i])
    #     print("get {} - {}".format(i ,r.status_code))
    #     i +=1
    return pages

def f():
    print("test inet module")
    print(pageslist()[1])
