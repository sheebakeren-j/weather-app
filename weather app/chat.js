const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', async () => {
    const APIKey = '7eb6cfbbd76b4a6e8a84dbada6e9ad8b';
    const city = document.querySelector('.search-box input').value;
    if (city === '') return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
        const data = await response.json();

        if (data.cod === '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        error404.classList.remove('active');
        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (data.weather[0].main) {
            case 'Clear':
                image.src = './clear.png';
                break;
            case 'Rain':
                image.src = './rain.png';
                break;
            case 'Snow':
                image.src = './snow.png';
                break;
            case 'Clouds':
                image.src = './cloud.png';
                break;
            case 'Mist':
            case 'Haze':
                image.src = './mist.png';
                break;
            default:
                image.src = './cloud.png';
        }

        temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
        description.innerHTML = `${data.weather[0].description}`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${parseInt(data.wind.speed)} km/h`;
    } catch (err) {
        console.log(err);
    }
});
