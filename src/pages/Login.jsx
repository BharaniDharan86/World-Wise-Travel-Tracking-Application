import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../context/FakeUserContext";
import { useNavigate } from "react-router-dom";

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === true) navigate("/app");
  }, [isAuth]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              login(email, password);
            }}
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
