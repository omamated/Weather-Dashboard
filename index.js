// tjis is for the weather

const weatherform = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey= "Apikeyhere";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherdata = await getweatherdata(city);
            displayWeatherInfo(weatherdata);
        }
        catch(error){
            console.error(error);
            displayerror(error.message);
        }
    }
    else{
        displayerror("Please put a city!!!");
    }
});

async function getweatherdata(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);
    if(!response.ok){   
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);
    displayerror(JSON.stringify(data));



}

function displayerror(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}