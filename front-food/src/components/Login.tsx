"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/utils/apiService";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
type DecodedToken = {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  // add any other properties your token includes
};
export const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email(),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLogin(true);
      try {
        const data = await login(values);
        localStorage.setItem("token", data.token);
        console.log("JWT token saved:", data.token);

        const decoded = jwtDecode<DecodedToken>(data.token);
        console.log("Decoded JWT", decoded);
        if (decoded.role === "USER") {
          router.push("/");
        } else if (decoded.role === "ADMIN") {
          router.push("/food-menu");
        }
      } catch (error: any) {
        // alert("Login failed: " + error.message);
        toast("Login failed:  Wrong username or password");
      } finally {
        setIsLogin(false);
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
          onClick={() => router.push("/")}
          src="./icons/login-chevron.svg"
          alt="chevron"
          className="w-[36px] h-[36px]"
        />
        <div className="flex flex-col gap-1">
          <label className="text-2xl font-semibold">Log in</label>
          <p className="text-muted-foreground">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <input
          placeholder="Email"
          name="email"
          className="border rounded-md h-9"
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
          className="border rounded-md h-9"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && (
          <div className="text-red-500">{formik.errors.password}</div>
        )}
        <Link
          className="text-sm underline text-secondary-foreground w-[123px]"
          href={"/forgot-password"}
        >
          Forgot password?
        </Link>
        <Button disabled={isLogin} type="submit">
          {!isLogin ? "Let's go" : "Logging in"}
        </Button>
        <div className="flex gap-3 justify-center">
          <span className="text-muted-foreground ">Don’t have an account?</span>
          <Link className="text-blue-500" href={"/signup"}>
            Sign up
          </Link>
        </div>
      </form>
      <img src="./loginPage.svg" alt="banner" />
    </div>
  );
};
