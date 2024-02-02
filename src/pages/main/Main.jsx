import React, {useState} from 'react';
import * as styles from "./Main.styles"
import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {countries} from "../../data/countries"
import {cities} from "../../data/cities"
import PredictService from "../../api/PredictService";

const Main = () => {

    const [country, setCountry] = useState("")
    const [cityObject, setCityObject] = useState({})
    const [filteredCities, setFilteredCities] = useState([])
    const [weatherPredict, setWeatherPredict] = useState({})


    const handleCountryChange = (event) => {
        setFilteredCities(cities.filter(city => city.country === event.target.value))
        setCityObject({})
        setWeatherPredict({})
        setCountry(event.target.value)
    }

    const handleCityChange = (event) => {
        setCityObject(event.target.value)
        setWeatherPredict({})
    }

    const getWeatherPredict = async (event) => {
        event.preventDefault()
        const response = await PredictService.getWeatherPredict(cityObject.lat, cityObject.lon)
        if ('message' in response){
            console.log('error')
        } else {
            setWeatherPredict(response.data)
        }
    }


    return (
        <>
            <Box sx={styles.headerContainer}>
                <Typography variant="h3" mb={3} sx={{textAlign: 'center', color: 'white'}}>
                    PLAN YOUR DAY WITH CONFIDENCE
                </Typography>
                <Typography variant="h5" mb={3} sx={{textAlign: 'center', color: 'white'}}>
                    Stay informed with accurate and up-to-date weather forecasts
                </Typography>
            </Box>
            <Container sx={styles.selectContainer}>
                <Typography variant="h5" m={3} sx={{color: 'black'}}>
                    Select your country
                </Typography>
                <FormControl sx={{ width: '300px' }}>
                    <InputLabel id="country-input-label">Country</InputLabel>
                    <Select
                        labelId="country-input-label"
                        id="country-input"
                        value={country}
                        label="Country"
                        onChange={handleCountryChange}
                    >
                        {countries.map(country => (
                            <MenuItem value={country}>{country}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography variant="h5" m={3} sx={{color: 'black'}}>
                    Select your city
                </Typography>
                <FormControl sx={{ width: '300px' }}>
                    <InputLabel id="city-select-label">City</InputLabel>
                    <Select
                        disabled={country === "" || filteredCities.length === 0}
                        labelId="city-select-label"
                        id="city-select"
                        value={cityObject.city}
                        label="City"
                        onChange={handleCityChange}
                    >
                        {filteredCities.map(city => (
                            <MenuItem value={city}>{city.city}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button disabled={Object.keys(cityObject).length === 0}
                        sx={{ margin: 5 , backgroundColor: "#B8860B"}}
                        onClick={getWeatherPredict}
                        variant="contained">Get Weather</Button>
            </Container>
            <Box sx={styles.predictContainer}>
                <Typography hidden={Object.keys(weatherPredict).length === 0}
                            variant="h3" sx={{color: 'black'}}>
                    Tommorow Weather Predict For {cityObject.city}
                </Typography>
                <Typography hidden={Object.keys(weatherPredict).length === 0}
                            variant="h5" sx={{ color: 'black' }}>
                    Temperature: {weatherPredict.temperature}°C<br />
                    Humidity: {weatherPredict.humidity}%<br />
                    Wind Speed: {weatherPredict.windSpeed} km/h
                </Typography>
            </Box>
        </>
    );
};

export default Main;