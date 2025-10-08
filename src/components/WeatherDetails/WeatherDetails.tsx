import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function WeatherDetails({ coords }) {
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

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-6 text-lg font-medium">
        Loading weather data...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 mt-6 text-lg font-medium">
        Error: {error instanceof Error ? error.message : "Something went wrong"}
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full">
      <Card className="flex flex-col items-center p-4">
        <CardHeader className="flex flex-col items-center">
          <WiHumidity className="text-4xl text-blue-500" />
          <CardTitle>Humidity</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 font-semibold text-lg">
          {weather.current.humidity}%
        </CardContent>
      </Card>

      <Card className="flex flex-col items-center p-4">
        <CardHeader className="flex flex-col items-center">
          <WiStrongWind className="text-4xl text-blue-500" />
          <CardTitle>Wind</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 font-semibold text-lg">
          {weather.current.wind_kph} km/h
        </CardContent>
      </Card>

      <Card className="flex flex-col items-center p-4">
        <CardHeader className="flex flex-col items-center">
          <WiBarometer className="text-4xl text-blue-500" />
          <CardTitle>Pressure</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 font-semibold text-lg">
          {weather.current.pressure_mb} hPa
        </CardContent>
      </Card>
    </div>
  );
}
