"use client";

import { Button } from "@/components/ui/button";

import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";

export const ForgotPassword = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setServerError(null);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/password/forgot-password`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: values.email }),
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Request failed");
        setEmailSent(true);
      } catch (err: any) {
        setServerError(err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (emailSent) {
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
            <label className="text-2xl font-semibold">
              Please verify Your Email
            </label>
            <p className="text-muted-foreground">
              We just sent an email to {formik.values.email}. Click the link in
              the email to verify your account.
            </p>
          </div>

          <Button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full"
          >
            {formik.isSubmitting ? "Resending…" : "Resend link"}
          </Button>

          <div className="flex gap-3 justify-center">
            <span className="text-muted-foreground">
              Don’t have an account?
            </span>
            <Link className="text-blue-500" href="/signup">
              Sign up
            </Link>
          </div>
        </form>
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
          <label className="text-2xl font-semibold">Reset your password</label>
          <p className="text-muted-foreground">
            Enter your email to receive a password reset link.
          </p>
        </div>
        <input
          placeholder="Email"
          name="email"
          type="email"
          className="border rounded-md h-9 px-3"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500">{formik.errors.email}</div>
        )}

        {serverError && <div className="text-red-500">{serverError}</div>}

        <Button type="submit" disabled={formik.isSubmitting} className="w-full">
          {formik.isSubmitting ? "Sending…" : "Send Reset Link"}
        </Button>

        <div className="flex gap-3 justify-center">
          <span className="text-muted-foreground">Don’t have an account?</span>
          <Link className="text-blue-500" href="/signup">
            Sign up
          </Link>
        </div>
      </form>
      <img src="./loginPage.svg" alt="banner" />
    </div>
  );
};
