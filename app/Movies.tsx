"use client";

import { Movie } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { MovieRow } from "./MovieRow";

const fetchMovies = async () => {
    const res = await fetch("/api/movies");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const movies = await res.json() as Movie[];
    return movies;
}

export const Movies = () => {
    const { data: movies, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: ["movies"],
        queryFn: fetchMovies,
    })

    if (isLoading) return <div>Loading...</div>
    if (isError || !isSuccess) return <div>Error: {error?.message}</div>

    return <div style={{ display: "flex", gap: "1em", flexDirection: "column" }}>
        {movies.map((movie) => (
            <MovieRow key={movie.id} movie={movie} />
        ))}
    </div>;
}