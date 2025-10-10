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

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    maxwind_kph: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface WeatherData {
  location: {
    name: string;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export default function WeatherMain() {
  const [coords, setCoords] = useState<{
    lat: string | number;
    lon: string | number;
  }>({
    lat: "30.0444",
    lon: "31.2357",
  });
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
          setCoords({ lat: "30.0444", lon: "31.2357" });
        }
      );
    }
  }, []);

  async function fetchWeatherData(): Promise<WeatherData> {
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
  } = useQuery<WeatherData, Error>({
    queryKey: ["weatherData", coords.lat, coords.lon],
    queryFn: fetchWeatherData,
    enabled: !!coords.lat && !!coords.lon,
  });

  async function handleSearch(e: React.FormEvent) {
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
      <p className="text-center text-gray-500 dark:text-gray-300 mt-6 text-lg font-medium">
        Loading weather data...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 dark:text-red-400 mt-6 text-lg font-medium">
        Error: {error instanceof Error ? error.message : "Something went wrong"}
      </p>
    );

  if (!weather) return null; // حماية إضافية

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-10">
      <form
        onSubmit={handleSearch}
        className="mb-6 !mt-20 flex gap-2 w-full max-w-md justify-center"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter city name..."
          className="border border-gray-500 dark:border-gray-600 !p-3 rounded-2xl outline-0 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button
          type="submit"
          className="bg-blue-600 dark:bg-blue-500 text-white !px-4 rounded hover:bg-blue-700 dark:hover:bg-blue-600 cursor-pointer transition"
        >
          Search
        </button>
      </form>

      <h2 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-10 !mt-20 text-center">
        Weather Forecast for {weather.location.name}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center !mt-10 !mb-10">
        {weather.forecast.forecastday.map((day: ForecastDay) => (
          <Card
            key={day.date}
            className="w-72 hover:scale-105 !p-5 transition-transform shadow-xl rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900"
          >
            <CardHeader className="bg-blue-200 dark:bg-gray-700 text-center py-4">
              <CardTitle className="text-xl font-semibold dark:text-white">
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
              <CardDescription className="text-gray-800 dark:text-gray-200 font-medium text-lg">
                {day.day.condition.text}
              </CardDescription>
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                {day.day.mintemp_c}°C / {day.day.maxtemp_c}°C
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
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
