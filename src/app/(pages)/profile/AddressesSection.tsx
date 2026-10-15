"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FaCity } from "react-icons/fa6";
import { FaPhoneAlt, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdEdit, MdPlace } from "react-icons/md";
import { X } from "lucide-react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { IAddress } from "@/interface/address.interface";
import { addAddressSchema, type AddAddressValues } from "@/schema/address.schema";
import { addAddress } from "@/services/addressesAction/addAddress.action";
import { removeAddress } from "@/services/addressesAction/removeAddress.action";

export default function AddressesSection({ addresses }: { addresses: IAddress[] }) {
    const router = useRouter();
    const [isAddressOpen, setIsAddressOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { control, handleSubmit, reset } = useForm<AddAddressValues>({
        resolver: zodResolver(addAddressSchema),
        defaultValues: {
            city: "",
            details: "",
            phone: "",
            name: "",
        },
        mode: "onBlur",
    });

    async function handleAddAddress(address: AddAddressValues) {
        setIsSubmitting(true);
        try {
            await addAddress(address);
            reset();
            setIsAddressOpen(false);
            setIsSubmitting(false);
            router.refresh();
        } catch (error) {
            setIsSubmitting(false);
        }
    }

    function openAddAddress() {
        reset({
            city: "",
            details: "",
            phone: "",
            name: "",
        });
        setIsAddressOpen(true);
    }

    async function removeUserAddress(addressId: string) {
        try {
            await removeAddress(addressId);
            router.refresh();
        } catch (error) {
        }
    }

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your saved delivery addresses</p>
                </div>
                <button onClick={openAddAddress} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-green-600/25 duration-150 hover:bg-green-700">
                    <IoMdAdd size={20} />
                    Add Address
                </button>
            </div>
            {addresses.length === 0 ? (
                <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center">
                    <div className="flex items-center justify-center px-4">
                        <div className="max-w-md text-center">
                            <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-gray-100 text-gray-400"><MdPlace size={40} /></div>
                            <h2 className="mb-3 text-2xl font-bold text-gray-900">No Addresses Yet</h2>
                            <p className="mb-8 font-medium text-gray-500">Add your first delivery address to make checkout faster and easier.</p>
                            <button type="button" onClick={openAddAddress} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3.5 font-semibold text-white shadow-lg duration-150 hover:bg-green-800">
                                <IoMdAdd size={20} /> Add Your First Address
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                        <div key={address._id} className="group hover:border-green-200 hover:shadow-lg rounded-2xl border border-gray-100 bg-white p-5 shadow-sm duration-200">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex flex-1 gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl group-hover:bg-green-200 bg-green-50 duration-200 text-green-600"><MdPlace size={20} /></div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="mb-1 font-bold text-gray-900">{address.name}</h3>
                                        <p className="mb-3 text-sm text-gray-600">{address.details}</p>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1.5 font-medium"><FaPhoneAlt size={12} />{address.phone}</span>
                                            <span className="flex items-center gap-1.5 font-medium"><FaCity />{address.city}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 duration-200 hover:bg-green-400 hover:text-green-800"
                                        >
                                            <MdEdit />
                                        </button>
                                        <button onClick={() => removeUserAddress(address._id)} className="h-9 w-9 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 duration-200 hover:bg-red-400 hover:text-red-800">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isAddressOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
                    onClick={(event) => {
                        if (event.target === event.currentTarget && !isSubmitting) {
                            setIsAddressOpen(false);
                        }
                    }}
                >
                    <section
                        aria-labelledby="add-address-title"
                        aria-modal="true"
                        className="my-auto w-full max-w-142.5 rounded-[28px] bg-white p-7 shadow-2xl sm:p-9"
                        role="dialog"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900" id="add-address-title">
                                Add New Address
                            </h2>
                            <button
                                aria-label="Close dialog"
                                className="flex size-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 disabled:opacity-50"
                                disabled={isSubmitting}
                                onClick={() => setIsAddressOpen(false)}
                                type="button"
                            >
                                <X size={21} />
                            </button>
                        </div>
                        <form className="space-y-5" onSubmit={handleSubmit(handleAddAddress)}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name} className="text-slate-700">
                                            Address Name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            autoFocus
                                            id={field.name}
                                            type="text"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="e.g. Home, Office"
                                            autoComplete="off"
                                            className="mt-2 h-14 rounded-2xl border-gray-200 px-4 focus-visible:border-green-500"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="details"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name} className="text-slate-700">
                                            Full Address
                                        </FieldLabel>
                                        <textarea
                                            {...field}
                                            id={field.name}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Street, building, apartment..."
                                            autoComplete="off"
                                            className="mt-2 min-h-27 w-full resize-y rounded-2xl border border-gray-200 px-4 py-3 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 placeholder:text-gray-400 aria-invalid:border-destructive"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name} className="text-slate-700">
                                                Phone Number
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="tel"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="01xxxxxxxxx"
                                                autoComplete="off"
                                                className="mt-2 h-14 rounded-2xl border-gray-200 px-4 focus-visible:border-green-500"
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="city"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name} className="text-slate-700">
                                                City
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id={field.name}
                                                type="text"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Cairo"
                                                autoComplete="off"
                                                className="mt-2 h-14 rounded-2xl border-gray-200 px-4 focus-visible:border-green-500"
                                            />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                                <button
                                    className="h-14 rounded-2xl bg-gray-100 font-semibold text-slate-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
                                    disabled={isSubmitting}
                                    onClick={() => setIsAddressOpen(false)}
                                    type="button"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="h-14 rounded-2xl bg-green-600 font-semibold text-white shadow-lg shadow-green-600/20 transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    disabled={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting ? "Adding..." : "Add Address"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </>
    );
}
