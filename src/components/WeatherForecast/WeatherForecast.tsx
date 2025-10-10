import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export const WeatherForecast = ({ coords }) => {
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
      <p className="text-center text-gray-500 mt-6">Loading forecast...</p>
    );
  if (isError)
    return (
      <p className="text-center text-red-500 mt-6">
        Error: {error instanceof Error ? error.message : "Something went wrong"}
      </p>
    );

  return (
    <div className="flex justify-around mt-10 w-full">
      {weather.forecast.forecastday.map((f) => (
        <Card key={f.date} className="text-center p-4">
          <CardHeader>
            <CardTitle className="text-gray-700 font-semibold ">
              {new Date(f.date).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <img
              src={f.day.condition.icon}
              alt={f.day.condition.text}
              className="w-10 h-10"
            />
            <p className="text-blue-600 font-semibold">
              {f.day.mintemp_c}°C / {f.day.maxtemp_c}°C
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
