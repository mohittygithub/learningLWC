public with sharing class ContactController {
  public ContactController() {
  }

  // method to get all the records from contact object
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts() {
    return [
      SELECT
        Id,
        FirstName,
        LastName,
        Phone,
        Email,
        MailingCity
      FROM Contact
      WHERE Account.Name != NULL
      
    ];
  }

  // method to get contact object details according to the parameter passed
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContactsByCity(String city) {
    if (city == 'All') {
      return [
        SELECT
          Id,
          Email,
          Department,
          Name,
          Phone,
          Account.BillingCity,
          Account.Name,
          Account.Type
        FROM Contact
        WHERE Account.Name != NULL
        LIMIT 10
      ];
    } else {
      return [
        SELECT
          Id,
          Email,
          Department,
          Name,
          Phone,
          Account.BillingCity,
          Account.Name,
          Account.Type
        FROM Contact
        WHERE Account.BillingCity = :city AND Account.Name != NULL
        LIMIT 10
      ];
    }
  }

  // method to sort data according to the column metadata
  @AuraEnabled
  public static List<Contact> sortedContacts(String str) {
    List<Contact> sortedList = Database.query(
      'SELECT Id, Email, Department, Name, Phone, Account.BillingCity, Account.Name, Account.Type FROM Contact WHERE  Account.Name != NULL ORDER BY ' +
      str +
      ' LIMIT 10'
    );
    //System.debug(sortedList);
    return sortedList;
  }

  // method to save new contact details received from LWC component
  @AuraEnabled
  public static Contact saveContact(String contact) {
    System.debug(contact);

    contact = contact.replace('[{', '');
    contact = contact.replace('}]', '');
    System.debug(contact);

    String firstname, lastname, accountid, phone, email, id;
    List<String> strList = contact.split(',');
    for (String str : strList) {
      if (str.containsIgnoreCase('FirstName')) {
        firstname = str.replaceAll('\"|:|FirstName', '');
      } else if (str.containsIgnoreCase('LastName')) {
        lastname = str.replaceAll('\"|:|LastName', '');
      } else if (str.containsIgnoreCase('Accountid')) {
        accountid = str.replaceAll('\"|:|AccountId', '');
      } else if (str.containsIgnoreCase('Phone')) {
        phone = str.replaceAll('\"|:|Phone', '');
      } else if (str.containsIgnoreCase('Email')) {
        email = str.replaceAll('\"|:|Email', '');
      }else if(str.containsIgnoreCase('Id')){
        id =str.replaceAll('\"|:|Id', '');
      }
    }
    Contact con = new Contact(
      FirstName = firstname,
      LastName = lastname,
      AccountId = accountid,
      Phone = phone,
      Email = email
    );
    //insert con;
    upsert con;

    return con;
  }

  // getting account Id based on account name from new contact modal form
  @AuraEnabled
  public static String getAccountId(String accountName) {
    List<Account> acctList = [SELECT Id FROM Account WHERE Name = :accountName];
    String acctId;
    for (Account acc : acctList) {
      acctId = acc.Id;
    }
    System.debug(acctId);
    return acctId;
  }
    
    // get all contacts for a given account id
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsByAccountId(String accountId){
        if(accountId != null){
            List<Contact> contactList = [SELECT Id, Name, Email, Phone, Department 
                              FROM Contact 
                              WHERE AccountId = :accountId];
            /*for(Contact con : contactList){
                System.debug(con);
            }*/
            return contactList;
        }else{
            return null;
        }
    }
}