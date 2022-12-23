# Weather-Journal App Project

## Overview
- app: Asynchronous Wep Application Use web ApI . 
- Server: use Node Js Express environment to develop a web application and bulid routing 
- project is upload with nodejs server requirment after download run server
    >
        node server.js
    it while open in port 8000
## project structure 
```mermaid
graph TD;
root-->server;
root-->
    website-->css;
    website-->js;
    website-->index;
```
## System Flow Digram 

```mermaid
graph TD;
server-->retrive;
server-->add;
app-->OnClickEvent;
OnClickEvent-->isZipCodeEmpty-->zipIsEmpty-->popUpAlertShow;
zipHasValue-->getTempRequestToApi;
getTempRequestToApi-->tempTryToGetResbonce-->handeApiError-->status-->200ReturnJsonData;
status-->otherStatus-->popUpAlertShow;
tempTryToGetResbonce-->catchError-->popUpAlertShow;
200ReturnJsonData-->postDataIntoNodeServer-->add-->postDataIntoNodeServer-->isPostedFalse-->popUpAlertShow;
postDataIntoNodeServer-->isPostedTrue-->getPostedDataFromServer-->retrive-->getPostedDataFromServer-->
TryToGetResbonce-->error-->popUpAlertShow;
TryToGetResbonce-->getPostedDataSucuss-->pushListRow-->entryholderHtmlElement;


```