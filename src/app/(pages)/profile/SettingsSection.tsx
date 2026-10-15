"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSave, FaUser } from "react-icons/fa";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { profileSchema, type ProfileValues } from "@/schema/signup.schema";
import { updateUserData } from "@/services/updateUserData.service";
import { useSession } from "next-auth/react";
import { IoLockClosedSharp } from "react-icons/io5";
import { changePasswordSchema, type ChangePasswordValues } from "@/schema/changePassword.schema";
import { changePassword } from "@/services/changePassword.service";
import { signIn } from "next-auth/react";

export default function SettingsSection() {
    const { data: session, update } = useSession();
    const [isSaving, setIsSaving] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const { control, reset, handleSubmit, formState: { dirtyFields } } = useForm<ProfileValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
        mode: "onBlur",
    });
    const {
        control: passwordControl,
        reset: resetPasswordForm,
        handleSubmit: handlePasswordSubmit,
    } = useForm<ChangePasswordValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: "",
        },
        mode: "onBlur",
    });

    useEffect(() => {
        reset({
            name: session?.user?.name ?? "",
            email: session?.user?.email ?? "",
            phone: session?.user?.phone ?? "",
        });
    }, [reset, session?.user?.email, session?.user?.name, session?.user?.phone]);

    async function handlePasswordForm(values: ChangePasswordValues) {
        const toastId = toast.add({
            type: "loading",
            title: "Changing password…",
            description: "Please wait.",
            timeout: 0,
        });
        setIsChangingPassword(true);

        try {
            await changePassword(values);
            const loginResult = await signIn("credentials", {
                email: session?.user?.email,
                password: values.password,
                redirect: false,
            });

            if (!loginResult || loginResult.error || !loginResult.ok) {
                throw new Error("Password changed, but automatic sign-in failed. Please sign in again.");
            }
        } catch (error) {
            toast.update(toastId, {
                type: "error",
                title: "Password change failed",
                description: error instanceof Error ? error.message : "Unable to change password.",
            });
            setIsChangingPassword(false);
            return;
        }

        resetPasswordForm();
        toast.update(toastId, {
            type: "success",
            title: "Password changed",
            description: "Your password changed and you are still signed in.",
        });
        setIsChangingPassword(false);
    }

    async function handleForm(values: ProfileValues) {
        const toastId = toast.add({
            type: "loading",
            title: "Saving changes…",
            description: "Please wait.",
            timeout: 0,
        });
        setIsSaving(true);

        try {
            const changes: Partial<ProfileValues> = {};
            if (dirtyFields.name && values.name.trim()) changes.name = values.name.trim();
            if (dirtyFields.email && values.email.trim()) changes.email = values.email.trim();
            if (dirtyFields.phone && values.phone.trim()) changes.phone = values.phone.trim();

            if (Object.keys(changes).length === 0) {
                throw new Error("Change at least one field before saving");
            }

            const response = await updateUserData(changes);
            const updatedUser = response.user ?? response.data?.user ?? response.data ?? {};
            const updatedValues = {
                name: changes.name || updatedUser.name || session?.user?.name || "",
                email: changes.email || updatedUser.email || session?.user?.email || "",
                phone: changes.phone || updatedUser.phone || session?.user?.phone || "",
            };
            await update({ user: updatedValues });
            reset(updatedValues);
            toast.update(toastId, {
                type: "success",
                title: "Changes saved",
                description: "Your profile has been updated successfully.",
            });
        } catch (error) {
            toast.update(toastId, {
                type: "error",
                title: "Save failed",
                description: error instanceof Error ? error.message : "Unable to update profile.",
            });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <section>
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
                <p className="mt-1 text-gray-500 text-sm font-medium">Update your profile information and change your password</p>
            </div>
            <div className="rounded-3xl border border-gray-100 bg-white shadow-sm ">
                <div className="border-b border-gray-100 p-6 sm:p-8">
                    <div className="flex items-center gap-4">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-green-100 text-green-600"><FaUser size={28} /></div>
                        <div>
                            <h3 className="font-bold text-gray-900">Profile Information</h3>
                            <p className="text-gray-500">Update your personal details</p>
                        </div>
                    </div>
                </div>
                <form className="mt-2 p-6 sm:p-8" onSubmit={handleSubmit(handleForm)}>
                    <div className="mb-4">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-gray-800 text-lg">Full Name</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="enter your name"
                                        autoComplete="off"
                                        className="focus-visible:border-green-500 w-full rounded-lg border border-gray-200 px-4 py-6 duration-150"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="mt-2">
                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-gray-800 text-lg">Email Address</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="enter your email"
                                        autoComplete="email"
                                        className="focus-visible:border-green-500 w-full rounded-lg border border-gray-200 px-4 py-6 duration-150"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="mt-4">
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-gray-800 text-lg">Phone Number</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="tel"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="01xxxxxxxxx"
                                        autoComplete="off"
                                        className="focus-visible:border-green-500 w-full rounded-lg border border-gray-200 px-4 py-6 duration-150"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="pt-4">
                        <button disabled={isSaving} type="submit" className="bg-green-600 text-white duration-150 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold shadow-lg shadow-green-600/25">
                            <FaSave />
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
                <div className="p-6 bg-gray-50">
                    <h3 className="mb-4 font-bold text-gray-900">Account Information</h3>
                    <div className="text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500">User ID</span>
                            <span className="text-gray-700 font-mono">{session?.user?.id}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-gray-500">Role</span>
                            <span className="rounded-lg bg-green-100 px-3 py-1 font-medium text-green-700 capitalize">user</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-3xl mt-6 border border-gray-100 bg-white shadow-sm ">
                <div className="border-b border-gray-100 p-6 sm:p-8">
                    <div className="flex items-center gap-4">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600"><IoLockClosedSharp size={23} /></div>
                        <div>
                            <h3 className="font-bold text-gray-900">Change Password</h3>
                            <p className="text-gray-500">Update your account password</p>
                        </div>
                    </div>
                </div>
                <form className="mt-2 p-6 sm:p-8" onSubmit={handlePasswordSubmit(handlePasswordForm)}>
                    <div className="mb-4">
                        <Controller
                            name="currentPassword"
                            control={passwordControl}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-gray-800 text-lg">Current Password</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="enter your Current Password"
                                        autoComplete="off"
                                        className="focus-visible:border-amber-500 w-full rounded-lg border border-gray-200 px-4 py-6 duration-150"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <Controller
                            name="password"
                            control={passwordControl}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-gray-800 text-lg">New Password</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="enter your Current New Password"
                                        autoComplete="off"
                                        className="focus-visible:border-amber-500 w-full rounded-lg border border-gray-200 px-4 py-6 duration-150"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <Controller
                            name="rePassword"
                            control={passwordControl}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-gray-800 text-lg">Confirm New Password</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Confirm New Password"
                                        autoComplete="off"
                                        className="focus-visible:border-amber-500 w-full rounded-lg border border-gray-200 px-4 py-6 duration-150"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </div>
                    <div className="pt-4">
                        <button disabled={isChangingPassword} type="submit" className="bg-amber-600 text-white duration-150 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold shadow-lg shadow-amber-600/25">
                            <IoLockClosedSharp />
                            {isChangingPassword ? "Changing..." : "Change Password"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
