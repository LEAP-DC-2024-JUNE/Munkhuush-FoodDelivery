"use client";

import { Button } from "@/components/ui/button";
import { login } from "@/utils/apiService";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
const Login = () => {
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
      try {
        const data = await login(values);
        localStorage.setItem("token", data.token);
        console.log("JWT token saved:", data.token);

        const decoded = jwtDecode(data.token);
        console.log("Decoded JWT", decoded);
        if (decoded.role === "USER") {
          router.push("/");
        } else if (decoded.role === "ADMIN") {
          router.push("/food-menu");
        }
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    },
  });
  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        className="flex flex-col gap-5 w-[300px]"
        onSubmit={formik.handleSubmit}
      >
        <input
          placeholder="Email"
          name="email"
          className="border rounded-2xl"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && <div>{formik.errors.email}</div>}
        <input
          placeholder="Password"
          name="password"
          className="border rounded-2xl"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && <div>{formik.errors.password}</div>}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
