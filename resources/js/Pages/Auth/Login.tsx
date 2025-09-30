import BaseLink from "@/Components/BaseLink";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <div className=" grid place-items-center flex-1">
                <form
                    onSubmit={submit}
                    className=" bg-secondary p-5 rounded-md  text-white h-fit"
                >
                    <div className="text-center mb-2">
                        <h1 className="sub-heading">Welcome Back</h1>
                        <p>Log in to continue your journey.</p>
                    </div>
                    <div>
                        <InputLabel htmlFor="email" value="Email address" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={data.email}
                            className="mt-1 block w-full "
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full "
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 block">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData(
                                        "remember",
                                        (e.target.checked || false) as false
                                    )
                                }
                            />
                            <span className="ms-2 text-sm  text-gray-400">
                                Remember me
                            </span>
                        </label>
                    </div>

                    <div className="mt-3 flex items-center flex-wrap gap-y-2">
                        <PrimaryButton className="w-full" disabled={processing}>
                            Log in
                        </PrimaryButton>
                        {/* {canResetPassword && (
                            <div className=" flex items-center gap-x-1.5 w-full">
                                <span className=" italic text-sm">
                                    Forgot your password?
                                </span>
                                <BaseLink href={route("password.request")}>
                                    Reset it
                                </BaseLink>
                            </div>
                        )} */}

                        <div className=" flex items-center gap-x-1.5 w-full">
                            <span className="italic text-sm">New here?</span>

                            <BaseLink href={route("register")}>
                                Create an account
                            </BaseLink>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
