import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/UserAuthContext";
import "./SignUp.css";

const SignUp = () => {
  const { error, SignUp, currentUser } = useAuth();
  const [err, setError] = useState("");
  const [backError, setBackError] = useState("");
  const [user, setUser] = useState({
    FullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect =
    (() => {
      console.log("here we go SignUp");
      if (err) {
        setInterval(() => {
          setBackError("");
        }, 5000);
        setBackError(error);
      }
    },
    [error, currentUser]);
  const UserHandler = (e) => {
    const { name, value } = e.target;
    setUser((pre) => {
      setUser((pre) => {
        return { ...pre, [name]: value };
      });
    });
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();
    //const {email, password, confirmPassword, FullName}
  };
};
