public class AccountDetailsForLWC {
	@AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(){
        return [SELECT Id, Name, Phone, Rating, AnnualRevenue, Type FROM Account];
       
    }
}