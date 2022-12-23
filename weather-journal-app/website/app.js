
/* weather Api requirment */
const url = 'https://api.weatherapi.com/v1/current.json';
const ApiKey = '?key=65f2bf1ee8ea43ff80a141915222112';
/* input field Variable*/
const zipCode = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const generateBtn = document.getElementById('generate');
const entryHolder = document.getElementById('entryHolder')
let serverData = [];
/* alert pop-up Ui Element  */
const popUp =
{
    ele: document.getElementById('popUp'),
    isExisting: () => {
        return popUp.ele.style.display == 'block' ? true : false
    },
    show: (errorMessage) => {
        let timer = 0
        popUp.isExisting() ? timer = 4999 : timer = 0;
        setTimeout(() => {
            popUp.ele.style.display = 'block';
            popUp.events(); popUp.ele.innerHTML = errorMessage;
        }, timer)
    },
    hide: () => { popUp.ele.style.display = 'none' },
    events: () => {
        popUp.ele.addEventListener('click', () => { popUp.hide() });
        setTimeout(() => { popUp.hide() }, 5000);
    },

}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
const getTemp = async (url, ApiKey, zipCode) => {
    /* Async Function that call api to get weather information */
    const resbonce = await fetch(url + ApiKey + `&q=${zipCode}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
    })
    try {
        const data = await resbonce.json()
        return handeApiError(data)
    } catch (error) {
        popUp.show("error in weather Api Request");
    }
}

const handeApiError = (data) => {
    /* function show popup error if there's error coming from api else it return by Location Temperature */
    if (!data.error) {
        return data.current.temp_c
    } else {
        popUp.show(data.error.message);
    }
}

const postDataIntoNodeServer = async (url, data) => {
    /*send Data to server  */
    const resbonce = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const resbonceData = await resbonce.json();
    return resbonceData;
}

const getPostedDataFromServer = async (url) => {
    /* method get to node  server  to get posted data {projectData} */
    const resbonce = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
    })
    try {
        const data = await resbonce.json()
        return data;
    } catch (error) {
        popUp.show('Error in Node Server')
    }
}

const pushListRow = () => {
    /* method push last updata html element into list group  */
    let obj = serverData[serverData.length - 1]
    entryHolder.insertAdjacentHTML('beforeend', `
    <li id="date" class="list-group-item col-4">${obj.date}</li>
    <li id="temp" class="list-group-item col-4">${obj.temperature}</li>
    <li id="content" class="list-group-item col-4">${obj.userResponse}</li>
    `)
}
const isZipCodeEmpty = () => {
    return zipCode.value == '' ? true : false;
}
/* Event listener that fire get system functionalty */
generateBtn.addEventListener('click', function () {
    /* flexible Promise tree to handel system flow */
    // stop implemntaion if no value enter
    if (isZipCodeEmpty()) { popUp.show('Zip Value Is Required'); return 0 }
    // get data from api 
    getTemp(url, ApiKey, zipCode.value)
        .then((temp) => {
            // post Data to nodejs server
            postDataIntoNodeServer('http://localhost:8000/add', { date: newDate, temperature: temp, userResponse: feelings.value })
                .then((res) => {
                    if (res.isPosted) {
                        // get all posted Data
                        getPostedDataFromServer('http://localhost:8000/retrive')
                            .then(function (data) {
                                serverData = data;
                                // updata UI
                                pushListRow();
                            })
                    } else {
                        popUp.show('No Data Posted To server')
                    }
                })
        })
})