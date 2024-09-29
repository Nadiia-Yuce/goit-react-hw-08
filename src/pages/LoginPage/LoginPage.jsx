import { useEffect } from "react";
import toast from "react-hot-toast";

import css from "./LoginPage.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import { selectIsLoggedIn, selectError } from "../../redux/auth/selectors.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectError);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Successful login!");
    }

    if (error) {
      toast.error("Login unsuccessful. Please verify your email and password.");
    }
  }, [isLoggedIn, error]);

  return (
    <div className={css.loginPageContainer}>
      <h1 className={css.pageTitle}>Wellcome back! </h1>
      <LoginForm />
      <p className={css.registration}>
        Don&apos;t have an account?
        <Link to="/registration" className={css.link}>
          Sigh up
        </Link>
        now!
      </p>
    </div>
  );
}
