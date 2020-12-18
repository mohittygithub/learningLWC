/* 
    Step 1 - Allow http://newsapi.org in Remote Site Settings in the Org
    Step 2 - Create a Lightning App with the name LWC News Room
    Step 3 - Create an Apex class to call REST Api
    Step 4 - Fetch Data from Apex Controller 
    Step 5 - Display Data on LWC component
    Step 6 - Deploye the LWC component to Org

*/
public with sharing class newsController {
    @AuraEnabled
    public static Map<String, Object> getNews(){
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.setEndpoint('http://newsapi.org/v2/everything?q=bitcoin&from=2020-10-23&sortBy=publishedAt&apiKey=3414e1448f1049b59039895e289d2219');
        httpRequest.setMethod('GET');
        
        Map<String, Object> newsJsonData = new Map<String, Object>();
        String response = null;

        try{
            Http http = new Http();
            HttpResponse httpResponse = http.send(httpRequest);
            if(httpResponse.getStatusCode() == 200){
                response = httpResponse.getBody();
            }else{
                throw new CalloutException(httpResponse.getBody());
            }
        }catch(Exception ex){
            throw ex;
        }
        if(!String.isBlank(response)){
            newsJsonData = (Map<String, Object>)JSON.deserializeUntyped(response);
        }
        if(!newsJsonData.isEmpty()){
            return newsJsonData;
        }else{
            return null;
        }
        


    }
}