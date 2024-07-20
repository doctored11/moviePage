import React, { useState } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";
import { getProfile, loginUser, registerUser } from "../../api/authApi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleRegister = async () => {
    try {
        //todo будет валидация
      await registerUser({ email, password, name, surname });
      alert("Регистрация успешна!");
      onClose();
    } catch(er){
        alert("Ошибка регистрации: " + (er as Error).message);
    }
  };

  const handleLogin = async () => {
    try {
         //todo будет валидация
      await loginUser({ email, password });
      alert("Вход успешен!");
      onClose();
    } catch (error ) {
        alert("Ошибка входа: " + (error as Error).message);
    }
  };

  if (!isOpen) {
    return null;
  }
  //todo нормально сверсать
  const modalBlock = ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        {/* мб два поля всегда показывать а остальные только при регистрации */}
        {isRegister ? (
          <>
            <h3>Регистрация</h3>
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Фамилия"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <input
              type="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Зарегистрироваться</button>
            <button onClick={() => setIsRegister(false)}>
              Уже есть аккаунт? Войти
            </button>
          </>
        ) : (
          <>
            <h3>Вход</h3>
            <input
              type="email"
              placeholder="Почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Войти</button>
            <button onClick={() => setIsRegister(true)}>
              Нет аккаунта? Зарегистрироваться
            </button>
          </>
        )}
      </div>
    </div>,
    document.getElementById("modal") as Element
  );
  return modalBlock;
}
