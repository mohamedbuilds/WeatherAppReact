import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

type WeatherDetailsProps = {
  coords: {
    lat: string | number;
    lon: string | number;
  };
};

type ForecastDay = {
  date: string;
  day: {
    mintemp_c: number;
    maxtemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

type WeatherData = {
  forecast: {
    forecastday: ForecastDay[];
  };
};

export const WeatherForecast = ({ coords }: WeatherDetailsProps) => {
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

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-6 text-lg font-medium">
        Loading forecast...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 mt-6 text-lg font-medium">
        Error: {error instanceof Error ? error.message : "Something went wrong"}
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 mt-12 mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {weather?.forecast?.forecastday?.map((f: ForecastDay) => (
        <Card
          key={f.date}
          className="flex flex-col  !p-6 shadow-lg rounded-2xl transition-transform hover:scale-105"
        >
          <CardHeader className="mb-4">
            <CardTitle className="text-xl font-semibold text-gray-700 text-center">
              {new Date(f.date).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-3">
            <img
              src={f.day.condition.icon}
              alt={f.day.condition.text}
              className="w-16 h-16"
            />
            <p className="text-blue-600 font-semibold text-lg">
              {f.day.mintemp_c}°C / {f.day.maxtemp_c}°C
            </p>
            <p className="text-gray-500 text-sm">{f.day.condition.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
