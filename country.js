const url = window.location.href;
const urlObj = new URL(url);
const params = urlObj.searchParams;
const countryName = decodeURIComponent(url.split('?')[1]);
console.log(countryName);
const flag = document.querySelector('.country-flag img');
const main = document.querySelector('.main-content');
const darkMode = document.querySelector('.header-content p');
const body = document.querySelector('body');


if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('darkMode');
} else {
    document.body.classList.remove('darkMode');
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('darkMode');
    if (document.body.classList.contains('darkMode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}
darkMode.addEventListener('click', toggleDarkMode);

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=>res.json())
.then((data) => {
       console.log(Object.keys(data[0].languages).length);
       const langLength = Object.keys(data[0].languages).length;
       let language;
       if(langLength > 1){
        language = Object.values(data[0].languages)[1]
       }
       else if(langLength === 1){
        language = Object.values(data[0].languages)[0]
       }
    console.log(data);

    const countryCode = data[0].cca2.toLowerCase()
    main.innerHTML = `
            <div class="country-flag">
                <img src="https://flagcdn.com/${countryCode}.svg" alt="">
            </div>
                
            <div class="country-text">
                    <h1>${countryName}</h1>
                    <div class="country-details">                    
                        <p><b>Population : </b>${data[0].population}</p>
                        <p><b>Timezone : </b>${data[0].timezones[0]}</p>
                        <p><b>Region : </b>${data[0].region}</p>
                        <p><b>Sub Region : </b>${data[0].subregion}</p>
                        <p><b>Capital : </b>${data[0].capital}</p>
                        <p><b>Top Level Domain : </b>${data[0].tld[0]}</p>
                        <p><b>Currencies : </b>${Object.values(data[0].currencies)[0].name}</p>
                        <p><b>Languages : </b>${language}</p>                        
                    </div> 
                    <div class="country-boundary-container">
                            <b>Border Countries: </b>                   
                    </div>                       
            </div>                        
          `

        const countryBoundaryContainer = document.querySelector('.country-boundary-container');
        console.log(countryBoundaryContainer);
    if(data[0].borders){
        data[0].borders.forEach((boundaryCode)=>{
            fetch(`https://restcountries.com/v3.1/alpha/${boundaryCode}`)
             .then((res)=>res.json())
             .then((countryObject)=>{
                const borderCountryTag = document.createElement('a');
                borderCountryTag.innerText = countryObject[0].name.common;
                borderCountryTag.href = `country.html?${countryObject[0].name.common}`
                countryBoundaryContainer.appendChild(borderCountryTag)
             })
        })
    }
        


})

