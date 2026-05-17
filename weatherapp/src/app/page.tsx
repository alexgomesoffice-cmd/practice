"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type WeatherData = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
    humidity: number;
    wind_kph: number;
  };
};

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${city}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Failed to fetch weather");
      }

      setWeather(data);

      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 text-white flex flex-col items-center justify-center px-4">

      <h1 className="text-4xl font-bold mb-6">
        Weather App
      </h1>

      {/* Search */}
      <div className="flex gap-2 w-full max-w-md">
        <Input
          type="search"
          placeholder="Search a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Loading */}
      {loading && (
        <p className="mt-6 text-blue-300">Loading...</p>
      )}

      {/* Error */}
      {error && (
        <p className="mt-6 text-red-400">{error}</p>
      )}

      {/* Weather Card */}
      {weather && !loading && !error && (
        <div className="mt-8 w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 shadow-2xl">

          <div className="text-center">
            <h2 className="text-3xl font-bold">
              {weather.location.name}
            </h2>
            <p className="text-gray-300">
              {weather.location.country}
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <h1 className="text-7xl font-extrabold">
              {weather.current.temp_c}°
            </h1>
            <p className="mt-2 text-xl text-gray-200">
              {weather.current.condition.text}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-white/10 p-4 text-center">
              <p className="text-sm text-gray-300">Humidity</p>
              <h3 className="text-2xl font-semibold">
                {weather.current.humidity}%
              </h3>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 text-center">
              <p className="text-sm text-gray-300">Wind</p>
              <h3 className="text-2xl font-semibold">
                {weather.current.wind_kph} kph
              </h3>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}