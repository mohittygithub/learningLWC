public with sharing class GetContactListForLwc {
    public static List<Contact> getContactList(){
        return [SELECT Id, FirstName, LastName, Phone, Email FROM Contact  ];
    }
}