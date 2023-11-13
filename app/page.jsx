import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

const MainPage = () => {
  return (
    <div className="home">
      <div className="home_container">
        <div className={styles.mainPage}>
          <h1>Todo App</h1>
          <h3>Create todo and do your work with peace</h3>
          <div>
            <Link href="/register">
              <button className="submitBtn">Register</button>
            </Link>
            <Link href="/login">
              <button className="submitBtn">Login</button>
            </Link>
          </div>
          <quotes>
            &quot;Never start your work in a listless manner&quot;
          </quotes>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
