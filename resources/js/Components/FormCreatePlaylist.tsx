import { useForm } from "@inertiajs/react";
import { SyntheticEvent } from "react";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";
import { TypeToast } from "@/types";
import { toast } from "react-toastify";
import InputError from "./InputError";

function FormCreatePlaylist() {
    const { data, setData, post, reset, processing, errors, isDirty } =
        useForm<{
            name: string;
        }>({
            name: "",
        });

    function submit(e: SyntheticEvent) {
        e.preventDefault();
        post(route("playlist.store"), {
            preserveScroll: true,
            onSuccess: (page) => {
                const typeToast =
                    page.props.flash.response.status || ("info" as TypeToast);
                toast[typeToast](page.props.flash.response.message);
            },
        });
    }

    return (
        <form onSubmit={submit} className="text-white">
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
            <InputError message={errors.name} />
            <PrimaryButton
                className=" mt-2 w-full"
                disabled={processing || !isDirty}
            >
                Save
            </PrimaryButton>
        </form>
    );
}

export default FormCreatePlaylist;
