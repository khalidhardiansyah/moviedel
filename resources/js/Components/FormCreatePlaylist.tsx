import { router, useForm } from "@inertiajs/react";
import React, { SyntheticEvent } from "react";

function FormCreatePlaylist() {
    const { data, setData } = useForm<{ name: string }>({
        name: "",
    });

    function submit(e: SyntheticEvent) {
        e.preventDefault();
        router.post("/playlist", data);
    }

    return (
        <form onSubmit={submit}>
            <h5 className=" first-letter:capitalize font-bold text-lg">
                new playlist
            </h5>
            <label htmlFor="name">Name:</label>
            <input
                name="name"
                value={data.name}
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
