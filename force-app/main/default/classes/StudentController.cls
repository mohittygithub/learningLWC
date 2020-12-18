public with sharing class  StudentController {
    public StudentController(){}
    
    @AuraEnabled(cacheable=true)
    public static List<Student__c> getStudentsByCity(String city){
        if(city == 'All'){
            return [SELECT Id, First_Name__c, Last_Name__c, Phone__c, Email__c, City__c, ImageUrl__c 
                    FROM Student__c 
                   ];
            //return null;
        }else{
            String key = '%' + city + '%';
            return [SELECT Id, First_Name__c, Last_Name__c, Phone__c, Email__c, City__c, ImageUrl__c 
                    FROM Student__c WHERE City__c LIKE :key];
        }
    }
    
    
}