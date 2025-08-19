import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 lg:flex lg:justify-center lg:flex-col">
                <h1 className="heading text-center">Account</h1>
                <div className=" p-4  sm:p-8 lg:self-center lg:min-w-2/4 bg-secondary rounded-md shadow">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className=" p-4  sm:p-8 lg:self-center lg:min-w-2/4 bg-secondary rounded-md shadow">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className=" p-4  sm:p-8 lg:self-center lg:min-w-2/4 bg-secondary rounded-md shadow">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </div>
    );
}
