import { Actor, Movie } from "@/types"
import { useQueries } from "@tanstack/react-query";

const fetchActor = async (id: string) => {
    const request = await fetch(`/api/actors/${id}`);
    if (!request.ok) {
        throw new Error("Failed to fetch actor " + id);
    };

    const actor = await request.json() as Actor
    return actor
}

export const MovieRow = ({ movie }: { movie: Movie }) => {
    const actorsQueries = useQueries({
        queries: movie.actors.map((id) => ({
            queryKey: ["actors", id],
            queryFn: () => fetchActor(id),
        }))
    })

    if (actorsQueries.some((q) => q.isLoading)) return <div>Loading...</div>
    if (actorsQueries.some((q) => q.isError)) return <div>Error</div>

    const actorData = actorsQueries.map((q) => q.data);

    return <div>
        <div><strong>{movie.title}</strong></div>
        <div style={{ display: "flex", gap: "1em" }}>
            {actorData.map(
                (actor) => actor ? <div key={actor.id}>{actor.name}</div> : null)}
        </div>
    </div>
}