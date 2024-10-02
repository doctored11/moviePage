import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";
import {
  getFavoritesFilms,
  getProfile,
  loginUser,
  registerUser,
} from "../../api/authApi";
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
import { RegistrationBlock } from "./samples/RegistrationBlock.module";
import { AuthorizationBlock } from "./samples/AuthorizationBlock.module";

interface FormData {
  email: string;
  password: string;
  secondPassword?: string;
  name?: string;
  surname?: string;
  isRegister: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ isOpen, onClose }: ModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [registrarionText, setRegistrarionText] = useState(
    "Регистрация завершена"
  );

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    secondPassword: "",
    name:"",
    surname:"",
    isRegister: false,
  });

  const [errors, setErrors] = useState<any>({});
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const formErrors = validateForm({
      email,
      password,
      secondPassword,
      name,
      surname,
      isRegister,
    });

    setIsFormValid(Object.values(formErrors).every((error) => error === null));
  }, [email, password, secondPassword, name, surname, isRegister]);

  const { setIsVisible, setHandleClose } = useClickAway();

  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: "",
        password: "",
        secondPassword: "",
        name: "",
        surname: "",
        isRegister: false,
      });

      setIsVisible(isOpen);
      setHandleClose(() => onClose);
    }
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

  function validateForm(formData: FormData) {
    const errors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      secondPassword: formData.isRegister
        ? validateSecondPassword(
            formData.password,
            formData.secondPassword || ""
          )
        : null,
      name: formData.isRegister ? validateName(formData.name || "") : null,
      surname: formData.isRegister
        ? validateSurname(formData.surname || "")
        : null,
    };

    return errors;
  }

  if (!isOpen) {
    return null;
  }
  const handleRegister = async () => {
    try {
      await registerUser({ email, password, name, surname });
      setRegistrarionText("Регистрация завершена");
      setShowSuccessMessage(true);

      // onClose();
    } catch (er) {
      setRegistrarionText("Ошибка регистрации");
      setShowSuccessMessage(true);
      console.error("Ошибка регистрации: " + (er as Error).message);
    }
  };

  const handleLogin = async () => {
    const formErrors = validateForm({
      email,
      password,
      secondPassword: "",
      name: "",
      surname: "",
      isRegister,
    });

    setErrors(formErrors);

    if (
      Object.values(formErrors).some((error) => error !== "" && error !== null)
    ) {
      return;
    }
    try {
      await loginUser({ email, password });
      await getFavoritesFilms();
      setErrors({});
      console.log("Вход успешен!");
      onClose();
    } catch (error) {
      console.error("Ошибка входа: " + (error as Error).message);
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        password: "не верные данные",
      }));
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

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

  const renderSuccessScreen = (
    <div className={`${styles.successContent} ${styles.formContainer}`}>
      <h2 className={` ${styles.modalTxtBold}`}>{registrarionText}</h2>
      <p className={` ${styles.modalTxt}`}>
        Используйте вашу электронную почту для входа
      </p>
      <button
        className={`btn btn--active ${styles.mainBtn}`}
        onClick={() => {
          setIsRegister(false);
          setShowSuccessMessage(false);
        }}
      >
        Войти
      </button>
    </div>
  );

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

      {showSuccessMessage ? (
        renderSuccessScreen
      ) : isRegister ? (
        <RegistrationBlock
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleRegister={handleRegister}
          isFormValid={isFormValid}
          setIsRegister={setIsRegister}
        />
      ) : (
        <AuthorizationBlock
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleLogin={handleLogin}
          isFormValid={isFormValid}
          setIsRegister={setIsRegister}
        />
      )}
    </div>,
    // </div>,
    document.getElementById("modal") as Element
  );
  return modalBlock;
}
