import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { WiHumidity, WiStrongWind, WiBarometer } from "react-icons/wi";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type WeatherDetailsProps = {
  coords: {
    lat: string | number;
    lon: string | number;
  };
};

export default function WeatherDetails({ coords }: WeatherDetailsProps) {
  async function fetchWeatherData() {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=3c52797e52cc495bab4190142251908&q=${coords.lat},${coords.lon}&days=3&lang=en`
    );
    return response.data;
  }

  const { data: weather, isLoading, isError, error } = useQuery({
    queryKey: ["weatherData", coords.lat, coords.lon],
    queryFn: fetchWeatherData,
    enabled: !!coords.lat && !!coords.lon,
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
    <div className="max-w-6xl mx-auto px-6 !mt-12 !mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <Card className="flex flex-col items-center !p-8 shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center mb-6">
          <WiHumidity className="text-5xl text-blue-500 mb-3" />
          <CardTitle className="text-xl font-semibold">Humidity</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 font-semibold text-lg">
          {weather.current.humidity}%
        </CardContent>
      </Card>

      <Card className="flex flex-col items-center !p-8 shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center mb-6">
          <WiStrongWind className="text-5xl text-blue-500 mb-3" />
          <CardTitle className="text-xl font-semibold">Wind</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 font-semibold text-lg">
          {weather.current.wind_kph} km/h
        </CardContent>
      </Card>

      <Card className="flex flex-col items-center !p-8 shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col items-center mb-6">
          <WiBarometer className="text-5xl text-blue-500 mb-3" />
          <CardTitle className="text-xl font-semibold">Pressure</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 font-semibold text-lg">
          {weather.current.pressure_mb} hPa
        </CardContent>
      </Card>
    </div>
  );
}
