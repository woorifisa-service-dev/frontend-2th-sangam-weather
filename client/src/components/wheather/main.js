(async () => {
  try {
    document.querySelector('#loader').classList.add('loading');
    const result = await (await fetch('/weather')).json();
    const weatherIcon = document.createElement('img');
    weatherIcon.src = './src/public/img/weather/' + result.icon + '.png';
    weatherIcon.classList.add('image-thumbnail');
    document.querySelector('.image-box').prepend(weatherIcon);
    let temperatureTextBox = document.getElementById('temperature-box');
    let humidityTextBox = document.getElementById('humidityText-box');
    let speedTextBox = document.getElementById('speedText-box');
    let rainTextBox = document.getElementById('rainText-box');

    temperatureTextBox.innerText = Math.ceil(result.temp);
    humidityTextBox.innerText = result.humidity;
    speedTextBox.innerText = result.speed;
    rainTextBox.innerText = result.rain;
    const isRain = result.rain ? true : false;
    useWeather(result.temp, isRain);
    await recommendRestaurant(result.temp, isRain);
    document.querySelector('#loader').classList.remove('loading');
  } catch (error) {
    console.error(error);
    alert('서버에 문제가 생겼습니다.');
  }
})();