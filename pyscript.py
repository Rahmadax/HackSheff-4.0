from bs4 import BeautifulSoup
import urllib.request

def read_csv():
    file = open('B.csv')
    for line in file:
        print(line)


def scrape_web_page(company_number, company_name):
    required_page = ("https://companycheck.co.uk/company/%s/%s/financials#key-financials") %(company_number, company_name)
    print("Found Page")
    page = urllib.request.urlopen(required_page)
    print("Opened Page")
    soup = BeautifulSoup(page, 'html.parser')
    value_box = soup.findAll('div', attrs={'class': 'Four-financial__figure'})
    changes_box = soup.findAll('div', attrs={'class': 'Four-financial__change'})
    arr_values = []
    arr_changes = []
    for entry in value_box:
        arr_values.append(entry.text.strip())
    for entry in changes_box:
        arr_changes.append(entry.text.strip())
    print(arr_values)
    print(arr_changes)

#read_csv()
scrape_web_page("03584121", "ASOSCOM-LIMITED")
