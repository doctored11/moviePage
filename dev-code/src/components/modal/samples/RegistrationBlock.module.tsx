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
  secondPassword?: string;
  name?: string;
  surname?: string;
}

interface RegistrationBlockProps {
  formData: FormData;
  errors: Errors;
  handleChange: (field: string, value: string) => void;
  handleRegister: () => void;
  isFormValid: boolean;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
}
export function RegistrationBlock({
  formData,
  errors,
  handleChange,
  handleRegister,
  isFormValid,
  setIsRegister,
}: RegistrationBlockProps) {
  const { email, password, secondPassword, name, surname } = formData;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleRegister();
  };
  const block = (
    <form onSubmit={handleSubmit} className={styles.formContainer} key={"registr"}>
      <input
        className={`${styles.input} ${errors.email && styles.errorInput}`}
        type="email"
        placeholder="Почта"
        value={email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
        onBlur={(e) => handleChange("email", e.target.value)}
        autoComplete="email"
      />

      <input
        className={`${styles.input}  ${errors.name && styles.errorInput} `}
        type="text"
        placeholder="Имя"
        value={name || ""}
        onChange={(e) => handleChange("name", e.target.value)}
        autoComplete="given-name"
      />

      <input
        className={`${styles.input} ${errors.surname && styles.errorInput}`}
        type="text"
        placeholder="Фамилия"
        value={surname || ""}
        onChange={(e) => handleChange("surname", e.target.value)}
        autoComplete="family-name"
      />

      <input
        className={`${styles.input} ${errors.password && styles.errorInput}`}
        type="password"
        placeholder="Пароль"
        value={password || ""} 
        onChange={(e) => handleChange("password", e.target.value)}
        autoComplete="new-password"
      />

      <input
        className={`${styles.input} password   ${
          errors.secondPassword && styles.errorInput
        }`}
        type="password"
        placeholder="Подтвердите пароль"
        value={secondPassword || ""}
        onChange={(e) => handleChange("secondPassword", e.target.value)}
        autoComplete="new-password"
      />

      <button
        type="submit"
        className={`btn btn--active ${styles.mainBtn}`}
        disabled={!isFormValid}
      >
        Зарегистрироваться
      </button>
      <button
        onClick={() => setIsRegister(false)}
        className={`${styles.secondBtn}`}
      >
        Уже есть аккаунт? Войти
      </button>
    </form>
  );
  return block;
}
