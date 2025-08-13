import { router, useForm } from "@inertiajs/react";
import React, { SyntheticEvent } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";

function FormCreatePlaylist() {
    const { data, setData } = useForm<{ name: string }>({
        name: "",
    });

    function submit(e: SyntheticEvent) {
        e.preventDefault();
        router.post("/playlist", data);
    }

    return (
        <form onSubmit={submit} className="text-slate-900">
            <p className="sub-heading">new playlist</p>
            <InputLabel htmlFor="Playlist" value="Playlist name" />
            <TextInput
                id="Playlist"
                type="Playlist"
                name="Playlist"
                placeholder="Cult movie"
                value={data.name}
                className="mt-1 block w-full text-gray-700"
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData("name", e.target.value)}
            />
            <button
                className="bg-blue-300 rounded-md py-3 w-full mt-4"
                type="submit"
            >
                Save
            </button>
        </form>
    );
}

export default FormCreatePlaylist;
