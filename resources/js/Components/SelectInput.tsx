import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from "@headlessui/react";
import { Tick01Icon, ArrowDown01Icon } from "hugeicons-react";
import { useState } from "react";

function SelectInput() {
    const visibilities = [
        { id: 1, name: "private" },
        { id: 2, name: "public" },
    ];

    const [selected, setSelected] = useState(visibilities[0]);
    return (
        <div className="rounded-md border border-gray-300 shadow-sm py-2 ">
            <Listbox value={selected} onChange={setSelected}>
                <ListboxButton className=" relative  block capitalize w-full rounded-lg   px-3 text-left text-base/6 text-black focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25">
                    {selected.name}
                    <ArrowDown01Icon className=" group pointer-events-none absolute right-2.5 top-0" />
                </ListboxButton>
                <ListboxOptions
                    anchor="bottom"
                    transition
                    className="z-10 w-(--button-width)  rounded-xl bg-white shadow-md border p-1 [--anchor-gap:--spacing(2.5)] focus:outline-none transition duration-100 ease-in data-leave:data-closed:opacity-0"
                >
                    {visibilities.map((visibility) => (
                        <ListboxOption
                            key={visibility.id}
                            value={visibility}
                            className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-2 select-none data-focus:bg-gray-500/10"
                        >
                            <Tick01Icon className=" invisible group-data-selected:visible" />
                            <div className=" text-base/6 text-black capitalize">
                                {visibility.name}
                            </div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
        </div>
    );
}

export default SelectInput;
