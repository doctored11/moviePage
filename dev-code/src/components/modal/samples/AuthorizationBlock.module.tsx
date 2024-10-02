import React, { FormEvent } from "react";
import styles from "../modal.module.css";
interface FormData {
  email: string;
  password: string;
  secondPassword?: string;
  name?: string;
  surname?: string;
}

interface Errors {
  email?: string;
  password?: string;
}

interface AuthorizationBlockProps {
  formData: FormData;
  errors: Errors;
  handleChange: (field: string, value: string) => void;
  handleLogin: () => void;
  isFormValid: boolean;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}
export function AuthorizationBlock({
  formData,
  errors,
  handleChange,
  handleLogin,
  isFormValid,
  setIsRegister,
}: AuthorizationBlockProps) {
  const { email, password, secondPassword, name, surname } = formData;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const block = (
    <form onSubmit={handleSubmit} className={styles.formContainer} key={"autorize"}>
      <input
        className={`${styles.input} simpleTxt ${
          errors.email && styles.errorInput
        }`}
        type="email"
        placeholder="Почта"
        value={email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={(e) => handleChange("email", e.target.value)}
         autoComplete="email"
      />

      <input
        className={`${styles.input} simpleTxt ${
          errors.password ? styles.errorInput : ""
        }`}
        type="password"
        placeholder="Пароль"
        value={password || ""}
        onChange={(e) => handleChange("password", e.target.value)}
        autoComplete="current-password"
      />
      {/* {errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )} */}
      <button
        type="submit"
        className={`btn btn--active ${styles.mainBtn}`}
        disabled={!isFormValid}
      >
        Войти
      </button>
      <button
        onClick={() => setIsRegister(true)}
        className={`${styles.secondBtn}`}
      >
        Нет аккаунта? Зарегистрироваться
      </button>
    </form>
  );
  return block;
}
