"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { login } from "../APIs/auth";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextInput from "../utils/TextInput/TextInput";

const RegisterPage = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (formik) => {
    const isValid = await formik.validateForm(formik.values);
    onSubmit(formik.values, isValid);
  };

  const onSubmit = async (newData, errors) => {
    const isFormValid = Object.values(errors).every(
      (value) => value === undefined
    );
    if (isFormValid) {
      const sendingData = {
        email: newData?.email,
        password: newData?.password,
      };
      handleLogin(sendingData);
    } else {
      toast.error("Fills form correctly!");
    }
  };

  const handleLogin = async (data) => {
    try {
      const res = await login(data);
      {
        res?.status === 201 && toast.success("Successfully login");
      }
      router.push("/todo", { scroll: false });
    } catch (error) {
      {
        error?.response?.status === 400 &&
          toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <>
      <div className="home">
        <div className="home_container">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formik) => {
              const { errors, touched, isValid, dirty } = formik;
              return (
                <Form className={styles.login}>
                  <p>Welcome back</p>
                  <h2>Login</h2>
                  <TextInput
                    label="Email"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    touched={touched}
                    error={errors.email}
                  />
                  <TextInput
                    label="Password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    touched={touched}
                    error={errors.password}
                    type="password"
                  />
                  <button
                    className="submitBtn"
                    type="submit"
                    onClick={() => handleSubmit(formik)}
                  >
                    Login
                  </button>
                  <div>
                    Do not have have an account{" "}
                    <Link href="/register">Register</Link>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default RegisterPage;
