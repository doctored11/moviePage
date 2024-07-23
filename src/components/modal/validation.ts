// текст оставил - думал сначала выводить текст ошибки но в макет не ложится
export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Почта обязательна";
    if (!emailRegex.test(email)) return "Неверный формат ввода";
    return null;
  };
  
  export const validatePassword = (password: string): string | null => {
    if (!password) return "Пароль обязателен";
    if (password.length < 6) return "Пароль короткий";
    return null;
  };
  
  export const validateSecondPassword = (password: string, secondPassword: string): string | null => {
    if (!secondPassword) return "Повторите пароль";
    if (password !== secondPassword) return "Пароли различаются";
    return null;
  };
  
  export const validateName = (name: string): string | null => {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!name) return "Имя обязательно";
    if (!nameRegex.test(name)) return "Введите валидное имя";
    return null;
  };
  
  export const validateSurname = (surname: string): string | null => {
    const surnameRegex = /^[a-zA-Z]+$/;
    if (!surname) return null
    if (!surnameRegex.test(surname)) return "Введите корректную фамилию";
    return null;
  };
  
  
  export const validateForm = (email: string, password: string, secondPassword: string, name: string, surname: string, isRegister: boolean): any => {
    const errors: any = {};
    errors.email = validateEmail(email);
    errors.password = validatePassword(password);
    if (isRegister) {
      errors.secondPassword = validateSecondPassword(password, secondPassword);
      errors.name = validateName(name);
      errors.surname = validateSurname(surname);
    }
    return errors;
  };
  