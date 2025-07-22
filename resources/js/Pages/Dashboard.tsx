import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ playlists }) {
    console.log(playlists);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <ul>
                {playlists.map((playlist) => (
                    <li>
                        <p className=" text-xl font-medium uppercase my-4">
                            {playlist.name}
                        </p>
                        <div className="flex space-x-3">
                            {playlist.collections.map((movie) => (
                                <div className="movie">
                                    <img
                                        className="w-28"
                                        src={movie.poster}
                                        alt={movie.title}
                                    />
                                    <p>{movie.original_title}</p>
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </AuthenticatedLayout>
    );
}
