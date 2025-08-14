import { router, useForm } from "@inertiajs/react";
import React, { SyntheticEvent } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";

function FormCreatePlaylist() {
    const { data, setData } = useForm<{ name: string }>({
        name: "",
    });

    function submit(e: SyntheticEvent) {
        e.preventDefault();
        router.post("/playlist", data);
    }

    return (
        <form onSubmit={submit} className="text-white">
            <p className="sub-heading">new playlist</p>
            <InputLabel htmlFor="Playlist" value="Playlist name" />
            <TextInput
                id="Playlist"
                type="Playlist"
                name="Playlist"
                placeholder="Cult movie"
                value={data.name}
                className="mt-1 block w-full "
                autoComplete="username"
                isFocused={true}
                onChange={(e) => setData("name", e.target.value)}
            />
            <PrimaryButton className=" mt-2 w-full">Save</PrimaryButton>
        </form>
    );
}

export default FormCreatePlaylist;
