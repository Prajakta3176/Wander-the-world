const countriesContainer = document.querySelector('.countries-container');
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');
const filterRegion = document.querySelector('.filter-region');
const darkMode = document.querySelector('.header-content p');
const body = document.querySelector('body');
const countryBox = document.querySelector('.country-box')


addCards(countries);


searchInput.addEventListener('input',(e)=>{
  const filteredCountries =  countries.filter((country)=> country.name.toLowerCase().includes(e.target.value.toLowerCase()))
    console.log(filteredCountries);
    addCards(filteredCountries);

})

filterRegion.addEventListener('change',(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res)=>res.json())
    .then((data) => {
        countriesContainer.innerHTML = "";
        data.forEach((country)=>{
            const countryBox = document.createElement('a')
            countryBox.href = `/country.html?${country.name.common}`
            countryBox.classList.add("country-box");
            const countryHTML = `<img src="https://flagcdn.com/${country.cca2.toLowerCase()}.svg" alt="">
                        <div class="country-info">
                            <h3>${country.name.common}</h3>
                            <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
                            <p><b>Region:</b> ${country.region}</p>
                            <p><b>Capital:</b> ${country.capital}</p>
                        </div>`
            countryBox.innerHTML = countryHTML;
            countriesContainer.append(countryBox); 
        })
    })
})

function addCards(countries){
    countriesContainer.innerHTML = "";
    countries.forEach((country)=>{
        const countryBox = document.createElement('a')
        countryBox.href = `/country.html?${country.name}`
        countryBox.classList.add("country-box");
        const countryHTML = `<img src="https://flagcdn.com/${country.alpha2Code.toLowerCase()}.svg" alt="">
                    <div class="country-info">
                        <h3>${country.name}</h3>
                        <p><b>Population:</b> ${country.population.toLocaleString('en-IN')}</p>
                        <p><b>Region:</b> ${country.region}</p>
                        <p><b>Capital:</b> ${country.capital}</p>
                    </div>`
        countryBox.innerHTML = countryHTML;
        countriesContainer.append(countryBox)

    })
}

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