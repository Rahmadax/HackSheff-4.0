from bs4 import BeautifulSoup
import urllib.request
import re

## Takes 2 arguments:
## Company name and Company number. Both as strings.
## returns 2 string arrays:
## arr_values an array of values related to given company in format:
## 0: Cash on Hand. 1: Networth. 2: Asset value. 3: Liabilities value.
## arr_changes an arrat of chnages in the above values since last year.
## Null arrays mean there is no financial data avaliable.  

def scrape_web_page(company_number, company_name):
    regex = re.compile("red|green")
    
    required_page = ("https://companycheck.co.uk/company/%s/%s/financials#key-financials") %(company_number, company_name)
    page = urllib.request.urlopen(required_page)
    soup = BeautifulSoup(page, 'html.parser')
    value_box = soup.findAll('div', attrs={'class': 'Four-financial__figure'})
    change_dir_box = soup.findAll('section', attrs={'class': 'Four-financials'})
    changes_box = soup.findAll('div', attrs={'class': 'Four-financial__change'})
    
    arr_values = []
    arr_changes = []
    
    for entry in value_box:
        arr_values.append(entry.text.strip())
    for entry in changes_box:
        arr_changes.append(entry.text.strip())

    counter = 0
    for entry in regex.findall(str(change_dir_box)):
        if entry == "red":
            arr_changes[counter] = ("-" + arr_changes[counter])
        counter+=1
        
    return arr_values, arr_changes

##scrape_web_page("03584121", "ASOSCOM-LIMITED") ## example
##scrape_web_page("11104388", "ABBOTT-INTERNATIONAL-PLC-LIMITED")
