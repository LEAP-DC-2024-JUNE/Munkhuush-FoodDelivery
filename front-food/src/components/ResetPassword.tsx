"use client";

import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  useEffect(() => {
    if (!token) {
      setInvalidToken(true);
      setTimeout(() => {
        router.push("/forgot-password");
      }, 4000);
    }
  }, [token, router]);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setServerError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/password/reset-password`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token,
              newPassword: values.newPassword,
            }),
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Request failed");
        setSuccess(true);
      } catch (err: any) {
        setServerError(err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });
  if (invalidToken) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Invalid Reset Link</h2>
        <p className="text-gray-600">
          The password reset link is invalid or missing. Redirecting you to{" "}
          <Link href="/forgot-password" className="text-blue-600 underline">
            Forgot Password
          </Link>
          ...
        </p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex gap-12 items-center pl-[100px] py-5">
        <div className="flex flex-col gap-6 w-[416px]">
          <img
            src="./icons/login-chevron.svg"
            alt="chevron"
            className="w-[36px] h-[36px]"
          />
          <div className="flex flex-col gap-1">
            <label className="text-2xl font-semibold">Password Reset</label>
            <p className="text-muted-foreground">
              ✅ Your password has been updated. You can now login.
            </p>
          </div>

          <Button onClick={() => router.push("/login")} className="w-full">
            Login
          </Button>
        </div>
        <img src="./loginPage.svg" alt="banner" />
      </div>
    );
  }

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
          <label className="text-2xl font-semibold">Create new password</label>
          <p className="text-muted-foreground">
            Set a new password with a combination of letters and numbers for
            better security.
          </p>
        </div>

        <div>
          <input
            placeholder="New Password"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            className="border rounded-md h-9 px-3 w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="text-red-500">{formik.errors.newPassword}</div>
          )}
        </div>

        <div>
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            className="border rounded-md h-9 px-3 w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500">{formik.errors.confirmPassword}</div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
            className="w-4 h-4"
          />
          <label htmlFor="showPassword" className="text-sm text-gray-600">
            Show password
          </label>
        </div>

        {serverError && <div className="text-red-500">{serverError}</div>}

        <Button type="submit" disabled={formik.isSubmitting} className="w-full">
          {formik.isSubmitting ? "Creating…" : "Create password"}
        </Button>
      </form>

      <img src="./loginPage.svg" alt="banner" />
    </div>
  );
};
