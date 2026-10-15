"use client"

import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FaGoogle, FaFacebook, FaStar, FaShieldAlt, FaShippingFast } from "react-icons/fa";
import Link from "next/link"
import freshCartImg from "../../../assets/img/2e5810ff3e-e750761ebcd4ae5907db.png"
import { useRouter } from "next/navigation"
import { loginSchema } from "@/schema/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ILogin } from "@/interface/login.interface"
import { LoginForm } from "@/services/login.service"
import { toast } from "@/components/ui/toast"
import { signIn } from "next-auth/react"

export default function login() {
  const router = useRouter()
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur"
  })


  async function handelLogin(values: ILogin) {
    const toastId = toast.add({
      type: "loading",
      title: "logging in…",
      description: "Please wait.",
      timeout: 0,
    })

    try {
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      })

      if (!response || response.error || !response.ok) {
        toast.update(toastId, {
          type: "error",
          title: "login failed",
          description: "wrong data.",
        })
        return
      }

      toast.update(toastId, {
        type: "success",
        title: "logged in",
        description: "has been logged successfully.",
      })


      reset()
      router.push("/")
    } catch {
      toast.update(toastId, {
        type: "error",
        title: "login failed",
        description: "wrong data.",
      })
    }
  }



  return (
    <div className='py-10'>
      <div className='container mx-auto max-w-7xl gap-12 p-4 grid grid-cols-1 lg:grid-cols-2'>
        <div className="text-center">
          <img src={freshCartImg.src} alt="freshcart" className="mb-6 h-96  rounded-2xl object-cover shadow-lg w-full mx-auto" />
          <h2 className="font-bold text-3xl text-gray-800">FreshCart - Your One-Stop Shop for Fresh Products</h2>
          <p className="text-lg mb-4 mt-4 text-gray-600 font-medium">Join thousands of happy customers who trust FreshCart for their daily grocery needs</p>
          <div className="my-8 flex gap-4 justify-center">
            <div className="flex gap-4 items-center mb-5">
              <div className="text-green-600 text-lg"><FaStar /></div>
              <div>
                <h2 className="text-gray-500 text-sm font-semibold">Premium Quality</h2>
              </div>
            </div>
            <div className="flex gap-4 items-center mb-5">
              <div className="text-green-600 text-lg"><FaShippingFast /></div>
              <div>
                <h2 className="text-gray-500 text-sm font-semibold">Fast Delivery</h2>
              </div>
            </div>
            <div className="flex gap-4 items-center mb-5">
              <div className="text-green-600 text-lg"><FaShieldAlt /></div>
              <div>
                <h2 className="text-gray-500 text-sm font-semibold">Secure Shopping</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='rounded-xl bg-white px-6 py-10 shadow-lg'>
          <h2 className='mb-2 text-center text-3xl text-gray-800 font-bold'><span className="text-green-600">Fresh</span>Cart</h2>
          <h3 className='mb-2 text-center text-2xl text-gray-800 font-bold'>Welcome Back!</h3>
          <p className='text-center font-semibold text-gray-700'>Sign in to continue your fresh shopping experience</p>
          <div className='mb-10 flex gap-2 mt-10 flex-col'>
            <button className='w-full border gap-3 border-e-gray-300 justify-center items-center flex rounded-lg py-2 px-4 font-medium text-gray-900 duration-200 hover:bg-gray-100'>
              <FaGoogle className="text-red-600 text-xl" />
              continue with Google
            </button>
            <button className='w-full border gap-3 border-e-gray-300 justify-center items-center flex rounded-lg py-2 px-4 font-medium text-gray-900 duration-200 hover:bg-gray-100'>
              <FaFacebook className="text-sky-700 text-xl" />
              continue with Facebook
            </button>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <div className="h-0.5 w-1/3 bg-gray-300"></div>
            <p className="font-semibold text-gray-600">or</p>
            <div className="h-0.5 w-1/3 bg-gray-300"></div>
          </div>
          <form className="mt-2" onSubmit={handleSubmit(handelLogin)}>
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
            <FieldGroup className="flex items-center gap-2">
              <Field orientation="horizontal">
                <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" className="w-4 h-4 checked:bg-green-600" />
                <FieldLabel htmlFor="terms-checkbox-basic" className="ms-2 font-semibold text-gray-700">
                  Keep me signed in
                </FieldLabel>
              </Field>
            </FieldGroup>
            <Button type="submit" className="bg-green-600 text-white w-full  py-7 font-semibold text-xl duration-150 hover:bg-green-700 mt-6">
              Sign In</Button>
          </form>
          <div className="my-4 border-t border-gray-200 pt-10 text-center">
            New to FreshCart? <Link href="/signup" className="font-medium text-green-600 hover:underline">
              Creat an account
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
