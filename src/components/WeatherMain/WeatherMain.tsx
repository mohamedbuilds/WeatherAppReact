import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import { WeatherForecast } from "../WeatherForecast/WeatherForecast";

export default function WeatherMain() {
  const [coords, setCoords] = useState({ lat: "30.0444", lon: "31.2357" }); // default Cairo
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          // لو المستخدم رفض أو حصل خطأ، خلي الإحداثيات default
          setCoords({ lat: "30.0444", lon: "31.2357" });
        }
      );
    }
  }, []);
  async function fetchWeatherData() {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=3c52797e52cc495bab4190142251908&q=${coords.lat},${coords.lon}&days=3&lang=en`
    );
    return response.data;
  }
  const {
    data: weather,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["weatherData", coords.lat, coords.lon], // خليها تعتمد على الإحداثيات
    queryFn: fetchWeatherData,
    enabled: !!coords.lat && !!coords.lon, // ما ينفذش إلا لما coords موجودة
  });

  // ✅ دالة البحث
  async function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/search.json?key=3c52797e52cc495bab4190142251908&q=${search}`
      );
      if (res.data.length > 0) {
        const city = res.data[0];
        setCoords({ lat: city.lat, lon: city.lon });
      } else {
        alert("City not found!");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching city data!");
    }
  }

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-6 text-lg font-medium">
        Loading weather data...
      </p>
    );
  if (isError)
    return (
      <p className="text-center text-red-500 mt-6 text-lg font-medium">
        Error: {error.message}
      </p>
    );
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-10">
      {/* Search Field */}
      <form
        onSubmit={handleSearch}
        className="mb-6 !mt-20 flex gap-2 w-full max-w-md justify-center"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter city name..."
          className="border border-gray-500 !p-3 rounded-2xl outline-0 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white !px-4 rounded hover:bg-blue-700 cursor-pointer"
        >
          Search
        </button>
      </form>

      <h2 className="text-4xl  font-extrabold text-blue-700 mb-10 !mt-20 text-center">
        Weather Forecast for {weather.location.name}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center !mt-10">
        {weather.forecast.forecastday.map((day) => (
          <Card
            key={day.date}
            className="w-72 hover:scale-105 !p-5 transition-transform shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100"
          >
            <CardHeader className="bg-blue-200 text-center py-4">
              <CardTitle className="text-xl font-semibold">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 py-8 text-center">
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="w-28 h-28"
              />
              <CardDescription className="text-gray-800 font-medium text-lg">
                {day.day.condition.text}
              </CardDescription>
              <p className="text-gray-700 font-semibold text-lg">
                {day.day.mintemp_c}°C / {day.day.maxtemp_c}°C
              </p>
              <p className="text-gray-500 text-sm">
                Wind: {day.day.maxwind_kph} km/h | Humidity:{" "}
                {day.day.avghumidity}%
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <WeatherDetails coords={coords} />
      <WeatherForecast coords={coords} />
    </div>
  );
}
