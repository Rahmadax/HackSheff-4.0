import pymysql.cursors
import pandas as pd

# Connect to the database
connection = pymysql.connect(host='35.195.207.30',
                             user='root',
                             password='coco999',
                             db='coco',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

cur = connection.cursor()


data = pd.read_csv('basic.csv')

for row in data.iterrows():
    list = row[1].values
    for x in range(54):
        if isinstance(list[x], str):
            list[x] = (list[x]).replace('"',' ')
            list[x] = (list[x]).replace(',',' ')
    cur.execute('INSERT INTO general(CompanyName, CompanyNumber, RegAddressCareOf, RegAddressPOBox, RegAddressAddressLine1, RegAddressAddressLine2, RegAddressPostTown,RegAddressCounty, RegAddressCountry,RegAddressPostCode,CompanyCategory, CompanyStatus, CountryOfOrigin,DissolutionDate, IncorporationDate, AccountsAccountRefDay, AccountsAccountRefMonth, AccountsNextDueDate, AccountsLastMadeUpDate, AccountsAccountCategory, ReturnsNextDueDate, ReturnsLastMadeUpDate, MortgagesNumMortCharges, MortgagesNumMortOutstanding, MortgagesNumMortPartSatisfied, MortgagesNumMortSatisfied, SICCodeSicText_1, SICCodeSicText_2, SICCodeSicText_3, SICCodeSicText_4, LimitedPartnershipsNumGenPartners, LimitedPartnershipsNumLimPartners, URI, PreviousName_1CONDATE, PreviousName_1CompanyName, PreviousName_2CONDATE, PreviousName_2CompanyName, PreviousName_3CONDATE, PreviousName_3CompanyName, PreviousName_4CONDATE, PreviousName_4CompanyName, PreviousName_5CONDATE, PreviousName_5CompanyName, PreviousName_6CONDATE, PreviousName_6CompanyName, PreviousName_7CONDATE, PreviousName_7CompanyName,PreviousName_8CONDATE, PreviousName_8CompanyName, PreviousName_9CONDATE, PreviousName_9CompanyName, PreviousName_10CONDATE, PreviousName_10CompanyName, ConfStmtNextDueDate, ConfStmtLastMadeUpDate) VALUES("%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s")' % tuple(list))
#close the connection to the database.
connection.commit()
cur.close()
connection.close()
