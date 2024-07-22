const apiBaseUrl= 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

let dropdowns = document.querySelectorAll('.from-to');
let amount = document.querySelector('.amount-sec input');
let rateMsg = document.querySelector('#equality');
let btn = document.querySelector('button');
let currCdFrom =document.querySelector('.code-from');
let currCdTo =document.querySelector('.code-to');


for (let dropdown of dropdowns){
    
    for (let code in countryList){
        let options =document.createElement('option');
        dropdown.append(options);
        options.innerText = code;

    }

    if(dropdown.name==='From'){
        dropdown.value='USD';
    }
    else if(dropdown.name==='To'){
        dropdown.value='PKR';
    }


    dropdown.addEventListener('change', (evt)=>{

        let select = evt.target;
        select.style.border = 'none';
        updateFlag(select);

    });
    
}




const updateFlag = (element)=>{
    let currCode =  element.value;
    let countryCode = countryList[currCode];
    let img = element.parentElement.querySelector('img');
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;

}


const  getExchangeRate = async (currCdFrom,currCdTo,apiBaseUrl)=>{

    let codeFrom = currCdFrom.value.toLowerCase();
    let codeTo = currCdTo.value.toLowerCase();
    let resp = await fetch(`${apiBaseUrl}/${codeFrom}.json`);
    let data = await resp.json();
    return data[codeFrom][codeTo];
}

const calculateAmount = (excRate)=>{
    let units = amount.value;
    finalAmount = excRate * units;
    return finalAmount.toFixed(2);
}


btn.addEventListener('click',async (evt)=>{
    evt.preventDefault();
    let excRate = await getExchangeRate(currCdFrom,currCdTo,apiBaseUrl);
    let finalAmount = calculateAmount(excRate);
    rateMsg.innerText = `${amount.value} ${currCdFrom.value} = ${finalAmount} ${currCdTo.value}`;
    
});

window.addEventListener('load', async ()=>{
    let excRate = await getExchangeRate(currCdFrom,currCdTo,apiBaseUrl);
    let finalAmount = calculateAmount(excRate);
    rateMsg.innerText = `${amount.value} ${currCdFrom.value} = ${finalAmount} ${currCdTo.value}`;
});