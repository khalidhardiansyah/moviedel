import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <>
            <Head title="Forgot Password" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="flex-1">
                <form
                    onSubmit={submit}
                    className=" bg-secondary p-5 rounded-md max  h-fit max-w-96 mx-auto"
                >
                    <div className="text-center">
                        <h1 className=" sub-heading">Forgot Your Password?</h1>
                        <p>
                            No worries. Enter your email address, and we’ll send
                            you a link to reset your password.
                        </p>
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="you@example.com"
                        className="mt-1 block w-full "
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />

                    <PrimaryButton
                        className="mt-4 w-full"
                        disabled={processing}
                    >
                        Email Password Reset Link
                    </PrimaryButton>
                </form>
            </div>
        </>
    );
}
