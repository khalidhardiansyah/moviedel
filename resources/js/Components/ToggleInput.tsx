import { Switch } from "@headlessui/react";

interface ToggleInputProps {
    checkedValue: boolean;
    onSwitch: (value: boolean) => void;
}
function ToggleInput({ checkedValue, onSwitch }: ToggleInputProps) {
    return (
        <Switch
            defaultChecked={checkedValue}
            onChange={(e) => onSwitch(e)}
            className="group relative flex h-6 w-12 cursor-pointer rounded-full bg-blue-500/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-blue-500 data-focus:outline data-focus:outline-white"
        >
            <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-6"
            />
        </Switch>
    );
}

export default ToggleInput;
