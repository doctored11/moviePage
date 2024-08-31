import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";
import { getProfile, loginUser, registerUser } from "../../api/authApi";
import { Logo } from "../logo/Logo";
import {
  validateEmail,
  validatePassword,
  validateSecondPassword,
  validateName,
  validateSurname,
  validateForm,
} from "./validation";
import { useClickAway } from "../../components/сlickAwayZone/ClickAwayContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: ModalProps) {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [errors, setErrors] = useState<any>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const formErrors = validateForm(
      email,
      password,
      secondPassword,
      name,
      surname,
      isRegister
    );
    // setErrors(formErrors);
    setIsFormValid(Object.values(formErrors).every((error) => error === null));
  }, [email, password, secondPassword, name, surname, isRegister]);

  const { setIsVisible, setHandleClose } = useClickAway();

  useEffect(() => {
    setIsVisible(isOpen);
    setHandleClose(()=> onClose);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setSecondPassword("");
      setName("");
      setSurname("");
      setErrors({});
      setIsFormValid(false);
    }
  }, [isOpen]);

  const handleRegister = async () => {
    try {
      await registerUser({ email, password, name, surname });
      alert("Регистрация успешна!");
      onClose();
    } catch (er) {
      alert("Ошибка регистрации: " + (er as Error).message);
    }
  };

  const handleLogin = async () => {
    console.log("login");
    const formErrors = validateForm(email, password, "", "", "", isRegister);
    setErrors(formErrors);
    console.log(formErrors);
    if (
      Object.values(formErrors).some((error) => error !== "" && error !== null)
    ) {
      return;
    }
    try {
      console.log("login1");
      await loginUser({ email, password });
      alert("Вход успешен!");
      onClose();
    } catch (error) {
      console.log("login2");
      alert("Ошибка входа: " + (error as Error).message);
    }
  };

  const handleChange = (field: string, value: string) => {
    let error: string | null;
    switch (field) {
      case "email":
        error = validateEmail(value);
        setEmail(value);
        break;
      case "password":
        error = validatePassword(value);
        setPassword(value);
        break;
      case "secondPassword":
        error = validateSecondPassword(password, value);
        setSecondPassword(value);
        break;
      case "name":
        error = validateName(value);
        setName(value);
        break;
      case "surname":
        error = validateSurname(value);
        setSurname(value);
        break;
      default:
        break;
    }
    setErrors((prevErrors: any) => ({ ...prevErrors, [field]: error }));
  };

  if (!isOpen) {
    return null;
  }

  const modalBlock = ReactDOM.createPortal(
    //  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <button className={styles.closeButton} onClick={onClose}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
            fill="black"
          />
        </svg>
      </button>

      <Logo fontSize={28}></Logo>

      {isRegister ? (
        <>
          <input
            className={`${styles.input} ${errors.email && styles.errorInput}`}
            type="email"
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => handleChange("email", e.target.value)}
          />

          <input
            className={`${styles.input}  ${errors.name && styles.errorInput} `}
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <input
            className={`${styles.input} ${errors.surname && styles.errorInput}`}
            type="text"
            placeholder="Фамилия"
            value={surname}
            onChange={(e) => handleChange("surname", e.target.value)}
          />

          <input
            className={`${styles.input} ${
              errors.password && styles.errorInput
            }`}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <input
            className={`${styles.input} password   ${
              errors.secondPassword && styles.errorInput
            }`}
            type="password"
            placeholder="Подтвердите пароль"
            value={secondPassword}
            onChange={(e) => handleChange("secondPassword", e.target.value)}
          />

          <button
            onClick={handleRegister}
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
        </>
      ) : (
        <>
          <input
            className={`${styles.input} simpleTxt ${
              errors.email && styles.errorInput
            }`}
            type="email"
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => handleChange("email", e.target.value)}
          />

          <input
            className={`${styles.input} simpleTxt ${
              errors.seconpassworddPassword && styles.errorInput
            }`}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          {/* {errors.password && (
              <div className={styles.error}>{errors.password}</div>
            )} */}
          <button
            onClick={handleLogin}
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
        </>
      )}
    </div>,
    // </div>,
    document.getElementById("modal") as Element
  );
  return modalBlock;
}
