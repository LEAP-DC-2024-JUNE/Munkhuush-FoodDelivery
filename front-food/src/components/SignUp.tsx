"use client";

import { Button } from "@/components/ui/button";
import { signup } from "@/utils/apiService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useFormik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
export const SignUp = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email(),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    phoneNumber: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    role: Yup.string().required("Role is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      address: "",
      role: "USER",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { confirmPassword, ...signupData } = values;
        console.log(signupData);
        signup(signupData);
        toast("New account has been created ");
        router.push("/login");
      } catch (error) {
        alert("Signup failed:" + error.message);
      }
    },
  });
  return (
    <div className="flex gap-12 items-center pl-[100px] py-5">
      <form
        className="flex flex-col gap-6 w-[416px]"
        onSubmit={formik.handleSubmit}
      >
        <img
          src="./icons/login-chevron.svg"
          alt="chevron"
          className="w-[36px] h-[36px]"
        />
        <div className="flex flex-col gap-1">
          <label className="text-2xl font-semibold">Create your account</label>
          <p className="text-muted-foreground">
            Sign up to explore your favorite dishes.
          </p>
        </div>
        <input
          placeholder="Email"
          name="email"
          className="px-4 border rounded-md h-9"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && (
          <div className="text-red-500">{formik.errors.email}</div>
        )}
        <input
          placeholder="Password"
          name="password"
          className="px-4  border rounded-md h-9"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && (
          <div className="text-red-500">{formik.errors.password}</div>
        )}
        <input
          placeholder="Confirm your password"
          name="confirmPassword"
          className="border px-4  rounded-md h-9"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        {formik.errors.confirmPassword && (
          <div className="text-red-500">{formik.errors.confirmPassword}</div>
        )}
        <input
          placeholder="Phone number"
          name="phoneNumber"
          className="border px-4  rounded-md h-9"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
        />
        {formik.errors.phoneNumber && (
          <div className="text-red-500">{formik.errors.phoneNumber}</div>
        )}

        <input
          placeholder="Address"
          name="address"
          className="border px-4  rounded-md h-9"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        {formik.errors.address && (
          <div className="text-red-500">{formik.errors.address}</div>
        )}
        <Button type="submit">Let's go</Button>
        <div className="flex gap-3 justify-center">
          <span className="text-muted-foreground ">
            Already have an account?
          </span>
          <Link className="text-blue-500" href={"/login"}>
            Log in
          </Link>
        </div>
      </form>
      <img src="./loginPage.svg" alt="banner" />
    </div>
  );
};
