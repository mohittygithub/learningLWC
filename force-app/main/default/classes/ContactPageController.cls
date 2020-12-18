public with sharing class ContactPageController {
    
    // method to be used with @wire decorator at LWC to get contact records
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String cityName) {
        
        if(cityName == 'All'){
            return [
                SELECT
                Id,
                FirstName,
                LastName,
                Email,
                Phone,
                MailingCity
                FROM Contact
                WHERE Account.Name != NULL
                // LIMIT 10
            ];
       }else{
            return [
                SELECT
                Id,
                FirstName,
                LastName,
                Email,
                Phone,
                MailingCity
                FROM Contact
                WHERE Account.Name != NULL
                AND MailingCity = :cityName
            ];
        }
        
    }
    
    // method to save a new contact record
    @AuraEnabled
    public static String saveContact(Contact newRecord){
        System.debug('newRecord = '+newRecord);
        
        if(newRecord != null){
            upsert newRecord;
            
            return newRecord.Id;
            
        }else{
            return 'Received record is empty';
        }
        
    }
    
    // method to get Account Id
    @AuraEnabled
    public static String getAcccountId(String accountName){
        List<Account> accountList = [SELECT Id FROM Account WHERE Name = :accountName];
        String accountId;
        for(Account acct : accountList){
            accountId = acct.Id;
        }
        System.debug(accountId);
        return accountId;
    }
    
    // method to delete a contact
    @AuraEnabled
    public static String deleteContact(String contactId){
        if(contactId != null){
            Contact contactToDelete = [SELECT Id, Name
                                       FROM Contact 
                                       WHERE ID = :contactId];
            delete contactToDelete;
            return 'Contact with Id : ' + contactId + ' deleted';
        }else{
            return 'No contact Id provided to be deleted';
        }
    }
    
    
    
}