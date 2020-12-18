public with sharing class AccountController {
    public AccountController() {

    }

    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccounts(){
        return [Select Id, Name, AccountNumber, Industry, Phone, Rating from Account Limit 10];
    }
    
    // save new account
    @AuraEnabled
    public static Account saveAccount(Account acct){
        System.debug(acct);
        if(acct != null){
            insert acct;
            return acct;
        }else{
            return null;
        }
    }
}