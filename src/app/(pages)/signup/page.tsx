"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import userImg from "../../../assets/img/review-author.webp"
import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { HiUserAdd } from "react-icons/hi";
import { FaGoogle, FaFacebook, FaStar, FaShieldAlt, FaShippingFast } from "react-icons/fa";
import Link from "next/link"
import { SignupForm } from "@/services/signup.service"
import { signupSchema } from "@/schema/signup.schema"
import { ISignup } from "@/interface/signup.interface"
import { useRouter } from "next/navigation"


export default function Signup() {
    const router = useRouter()
    const { control, handleSubmit, reset } = useForm<ISignup>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",
        },
        mode: "onBlur"
    })
    async function handelSignUp(valus: ISignup) {
        const toastId = toast.add({
            type: "loading",
            title: "Creating account…",
            description: "Please wait.",
            timeout: 0,
        })

        try {
            const response = await SignupForm(valus)

            if (!response) {
                toast.update(toastId, {
                    type: "error",
                    title: "Signup failed",
                    description: "user already exists.",
                })
                return
            }

            toast.update(toastId, {
                type: "success",
                title: "Account created",
                description: "Your account has been created successfully.",
            })
            reset()
            router.push("/login")
        } catch {
            toast.update(toastId, {
                type: "error",
                title: "Signup failed",
                description: "The account could not be created.",
            })
        }
    }



    return (
        <div className='py-10'>
            <div className='container mx-auto max-w-7xl gap-12 p-4 grid grid-cols-1 lg:grid-cols-2'>
                <div>
                    <h1 className="font-bold text-4xl text-gray-800">Welcome to <span className="text-green-600">FreshCart</span></h1>
                    <p className="text-xl mb-4 mt-4 text-gray-700 font-medium">Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.</p>
                    <ul className="my-8 list-unstyled">
                        <li className="flex gap-4 items-center mb-5">
                            <div className="text-green-600 text-lg bg-green-200 rounded-full flex items-center justify-center w-12 h-12"><FaStar /></div>
                            <div>
                                <h2 className="text-gray-800 text-lg font-semibold">Premium Quality</h2>
                                <p className="text-gray-600">Premium quality products sourced from trusted suppliers.</p>
                            </div>
                        </li>
                        <li className="flex gap-4 items-center mb-5">
                            <div className="text-green-600 text-lg bg-green-200 rounded-full flex items-center justify-center w-12 h-12"><FaShippingFast /></div>
                            <div>
                                <h2 className="text-gray-800 text-lg font-semibold">Fast Delivery</h2>
                                <p className="text-gray-600">Same-day delivery available in most areas</p>
                            </div>
                        </li>
                        <li className="flex gap-4 items-center mb-5">
                            <div className="text-green-600 text-lg bg-green-200 rounded-full flex items-center justify-center w-12 h-12"><FaShieldAlt /></div>
                            <div>
                                <h2 className="text-gray-800 text-lg font-semibold">Secure Shopping</h2>
                                <p className="text-gray-600">Your data and payments are completely secure</p>
                            </div>
                        </li>
                    </ul>
                    <div className="rounded-md bg-white p-4 shadow">
                        <div className="flex mb-4 items-center gap-4">
                            <img src={userImg.src} alt="user" className="w-12 h-12 rounded-full" />
                            <div>
                                <h3 className="text-gray-800 font-medium">Sarah Johnson</h3>
                                <div className="text-yellow-300 flex gap-1">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 italic font-medium">"FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"</p>
                    </div>
                </div>
                <div className='rounded-xl bg-white px-6 py-10 shadow-lg'>
                    <h2 className='mb-2 text-center text-3xl text-gray-800 font-semibold'>Create Your Account</h2>
                    <p className='text-center font-semibold text-gray-700'>Start your fresh journey with us today</p>
                    <div className='mb-10 flex gap-2 mt-10'>
                        <button className='flex-1 border gap-3  border-e-gray-300 justify-center items-center flex rounded-lg py-2 px-4 font-semibold text-gray-900 duration-200 hover:bg-gray-100'>
                            <FaGoogle className="text-red-600 text-xl" />
                            Google
                        </button>
                        <button className='flex-1 border gap-3 border-e-gray-300 justify-center items-center flex rounded-lg py-2 px-4 font-semibold text-gray-900 duration-200 hover:bg-gray-100'>
                            <FaFacebook className="text-sky-700 text-xl" />
                            Facebook
                        </button>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                        <div className="h-0.5 w-1/3 bg-gray-300"></div>
                        <p className="font-semibold text-gray-600">or</p>
                        <div className="h-0.5 w-1/3 bg-gray-300"></div>
                    </div>
                    <form className="mt-2" onSubmit={handleSubmit(handelSignUp)}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-gray-800 text-lg">Name*</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="enter your name"
                                        autoComplete="off"
                                        className="px-2 py-5 mb-5 rounded-sm border border-gray-300 focus-visible:border-green-500"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-gray-800 text-lg">Email*</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="enter your email"
                                        autoComplete="off"
                                        className="px-2 py-5 mb-5 rounded-sm border border-gray-300 focus-visible:border-green-500"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-gray-800 text-lg">Password*</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="enter your password"
                                        autoComplete="off"
                                        className="px-2 py-5 rounded-sm mb-5 border border-gray-300 focus-visible:border-green-500"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="rePassword"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-gray-800 text-lg">Confirm Password*</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="confirm your password"
                                        autoComplete="off"
                                        className="px-2 py-5 mb-5 rounded-sm border border-gray-300 focus-visible:border-green-500"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name} className="text-gray-800 text-lg">Phone Number*</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="tel"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="enter your number"
                                        autoComplete="off"
                                        className="px-2 py-5 rounded-sm mb-5 border border-gray-300 focus-visible:border-green-500"
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <FieldGroup className="flex items-center gap-2">
                            <Field orientation="horizontal">
                                <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" className="w-4 h-4 checked:bg-green-600" />
                                <FieldLabel htmlFor="terms-checkbox-basic" className="ms-2 font-semibold text-gray-700">
                                    I agree to the
                                    <Link href="/terms" className="text-green-700 hover:underline">Terms of Service</Link>
                                    and
                                    <Link href="/privacy" className="text-green-700 hover:underline"> Privacy Policy</Link>
                                    *
                                </FieldLabel>
                            </Field>
                        </FieldGroup>
                        <Button type="submit" onClick={() => { Signup() }} className="bg-green-600 text-white w-full  py-5 font-semibold duration-150 hover:bg-green-700 mt-6">
                            <HiUserAdd />Create My Account</Button>
                    </form>
                    <div className="my-4 border-t border-gray-200 pt-10 text-center">
                        Aleardy have an account? <Link href="/login" className="font-medium text-green-600 hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
