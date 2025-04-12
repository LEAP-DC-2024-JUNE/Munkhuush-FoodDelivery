"use client";

import { Button } from "@/components/ui/button";

import { useFormik } from "formik";
import * as Yup from "yup";
import { signup } from "@/utils/apiService";
import { useRouter } from "next/navigation";
const Signup = () => {
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
  const router = useRouter();
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
    onSubmit: (values) => {
      const { confirmPassword, ...signupData } = values;
      console.log(signupData);
      signup(signupData);
      router.push("/login");
    },
  });
  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        className="flex flex-col w-[300px] gap-4"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="email">Email</label>
        <input
          name="email"
          className="border rounded-xl"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && <div>{formik.errors.email}</div>}
        <label htmlFor="password">Password</label>
        <input
          name="password"
          className="border rounded-2xl"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && <div>{formik.errors.password}</div>}
        <label htmlFor="password">Confirm Password</label>
        <input
          name="confirmPassword"
          className="border rounded-2xl"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        {formik.errors.confirmPassword && (
          <div>{formik.errors.confirmPassword}</div>
        )}

        <label htmlFor="phoneNumber">Phone</label>
        <input
          name="phoneNumber"
          className="border rounded-2xl"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
        />
        {formik.errors.phoneNumber && <div>{formik.errors.phoneNumber}</div>}
        <label htmlFor="address">Address</label>
        <input
          name="address"
          className="border rounded-2xl"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        {formik.errors.address && <div>{formik.errors.address}</div>}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default Signup;
