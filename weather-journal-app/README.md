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
OnClickEvent-->isZipCodeEmpty-->zTure-->popUpAlertShow;
isZipCodeEmpty-->zFalse-->getTemp;
getTemp-->GetRequest-->handeApiError-->ReturnJsonData;
handeApiError-->popUpAlertShow;
GetRequest-->popUpAlertShow;
ReturnJsonData-->postDataIntoNodeServer-->add;
postDataIntoNodeServer-->pFalse-->popUpAlertShow;
postDataIntoNodeServer-->pTrue-->getPostedDataFromServer-->retrive;
getPostedDataFromServer-->error-->popUpAlertShow;
getPostedDataFromServer-->succuss-->pushListRow-->entryholderHtmlElement;


```