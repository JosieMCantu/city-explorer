
function getLocation(wholeArray) {
    return {
        formatted_query: wholeArray[0].display_name,
        latitude: wholeArray[0].lat,
        longitude: wholeArray[0].lon,
    };
}
function getWeather(weatherData) {
    const formattedResponse = weatherData.data.map(item => {
        return {
            forecast: item.weather.description,
            time: new Date(item.ts * 1000).toDateString(),
        };
    });
    const finalSlice = formattedResponse.slice(0, 7);
    return finalSlice;
}
function getReviews(formattedBusiness) {
    const formattedData = formattedBusiness.businesses.map(item => {
        return {
            name: item.name,
            image_url: item.image_url,
            price: item.price,
            rating: item.rating,
            url: item.url,
        };
    });
    return formattedData;
}

module.exports = { getLocation, getWeather, getReviews };


