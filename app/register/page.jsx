"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import {useRouter} from 'next/router';
import TextInput from "@/app/components/TextInput/page";
import styles from "./styles.module.css";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../APIs/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "../components/Loading/Loading";

const RegisterPage = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    name: "",
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
        name: newData?.name,
        email: newData?.email,
        password: newData?.password,
      };
      handleRegisteration(sendingData);
    } else {
      toast.error("Fills form correctly!");
    }
  };

  const handleRegisteration = async (data) => {
    try {
      const res = await register(data);
      {
        res?.status === 201 && toast.success("Successfully Registered");
      }
      router.push("/todo");
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
                <Form className={styles.register}>
                  <h2>Register</h2>
                  <TextInput
                    label="Name"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    touched={touched}
                    error={errors.name}
                  />
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
                    Register
                  </button>
                  <p>
                    Aleady have an account <Link href="/login">login</Link>
                  </p>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={10000} />
    </>
  );
};

export default RegisterPage;
