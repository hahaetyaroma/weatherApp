window.addEventListener('DOMContentLoaded', () => {
    const APIKEY = '1afc33189f0523ab34cb46b16619906e';
    const cityInput = document.querySelector('.header__input'),
        cityBtn = document.querySelector('.header__btn'),
        weatherCards = document.querySelector('.weather-cards__item');

    cityBtn.addEventListener('click', () => {
        weather();
        console.log(weatherCards.childNodes.length - 1);
    })

    cityInput.addEventListener('keydown', (event) => {
        if (event.code == 'Enter') {
            weather();
        }
    })

    function weather() {
        if (weatherCards.childNodes.length - 1 < 8) {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=ru&units=metric&appid=${APIKEY}`;

            fetch(url)
                .then((res) => res.json())
                .then((res) => {

                    if (res.cod == '404') {
                        weatherCard.remove();
                        console.clear();
                    }

                    weatherCardName.textContent = res.name;
                    weatherCardTemp.textContent = `Температура: ${res.main.temp}°С`;
                    weatherCardHumidity.textContent = `Влажность воздуха: ${res.main.humidity}`;
                    weatherCardWind.textContent = `Скорость ветра: ${res.wind.speed}`;
                    weatherCardWeather.textContent = `${res.weather[0].description.charAt(0).toUpperCase() + res.weather[0].description.slice(1)}`;
                    weatherCardIcon.innerHTML = `<img class = "weather-card__icon" src = "weatherApp/img/${res.weather[0].icon}.png">`
                })
                .catch(function (error) {
                    console.log(error);
                });

            const weatherCard = document.createElement('div'),
                weatherCardItemName = document.createElement('div'),
                weatherCardName = document.createElement('p'),
                weatherCardItems = document.createElement('div'),
                weatherCardTemp = document.createElement('p'),
                weatherCardHumidity = document.createElement('p'),
                weatherCardWind = document.createElement('p'),
                weatherCardWeather = document.createElement('p'),
                weatherCardIcon = document.createElement('div');

            weatherCard.className = 'weather-card',
                weatherCardItemName.className = 'weather-card__item-name'
            weatherCardName.className = 'weather-card__name',
                weatherCardItems.className = 'weather-card__items-block'
            weatherCardTemp.className = 'weather-card__temp',
                weatherCardHumidity.className = 'weather-card__humidity',
                weatherCardWind.className = 'weather-card__wind',
                weatherCardWeather.className = 'weather-card__weather';

            weatherCardItemName.appendChild(weatherCardName),
                weatherCardItems.appendChild(weatherCardTemp),
                weatherCardItems.appendChild(weatherCardHumidity),
                weatherCardItems.appendChild(weatherCardWind),
                weatherCardItems.appendChild(weatherCardWeather),
                weatherCardItems.appendChild(weatherCardIcon);

            weatherCards.appendChild(weatherCard),
                weatherCard.appendChild(weatherCardItemName),
                weatherCard.appendChild(weatherCardItems);

            weatherCard.onclick = function () {
                weatherCard.remove();
            }

            cityInput.value = '';
            console.clear();
        }
    }
});