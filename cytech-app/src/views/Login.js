import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/Logo_Cytech.png";
import "../css/Registro.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    contraseña: "",
  });

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Obtiene la función de navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3001/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          localStorage.setItem('token', result.token);
          localStorage.setItem('userId', result.user.id);
          navigate("/categorias"); // Navega a la página de categorías
        } else {
          const errorText = await response.text();
          console.error("Error en la respuesta del servidor:", errorText);
          setErrors({ general: errorText });
          setShowErrors(true);
        }
      } catch (error) {
        console.error("Error al conectarse con el servidor:", error);
      }
    } else {
      setShowErrors(true);
      setTimeout(() => setShowErrors(false), 10000); // Ocultar errores después de 10 segundos
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.usuario || !formData.contraseña) {
      newErrors.general = "Usuario y contraseña son obligatorios.";
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="volver-container">
            <a href="/">
              <svg
                role="presentation"
                aria-hidden="true"
                viewBox="0 0 28 28"
                className="volver"
              >
                <path
                  d="M11.5 25.2c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-1-.6-1.3L9.5 19 6 15.6l3.2.2h16.6c1.1 0 1.9-.7 1.9-1.8s-.8-1.8-1.9-1.8H9.2l-3.2.2 3.6-3.3 3.2-3.2c.3-.3.6-.8.6-1.3 0-1-.7-1.7-1.8-1.7-.4 0-.9.2-1.3.6L1 12.6c-.4.4-.6.9-.6 1.4s.2 1 .6 1.3l9.3 9.3c.3.4.8.6 1.2.6z"
                  fill="white"
                ></path>
              </svg>
            </a>
            <h2>
              {" "}
              Inicia Sesión en <span className="title">Cytech</span>
            </h2>
          </div>
          <div className="img-container">
            <img src={logo} alt="Cytech Logo" className="logo-login" />
          </div>
          <div className="input-group">
            <label htmlFor="usuario">
              Usuario <span className="required">*</span>
            </label>
            <input
              type="text"
              name="usuario"
              placeholder="Introduzca su nombre de usuario"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="contraseña">
              Contraseña <span className="required">*</span>
            </label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="contraseña"
                placeholder="Introduzca su contraseña"
                onChange={handleChange}
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
          </div>
          <button type="submit" className="bn634-hover bn34">
            Iniciar Sesión
          </button>
          <div className="login-link">
            ¿No tienes cuenta?{" "}
            <a href="/registro" className="login-link-a">
              Regístrate aquí.
            </a>
          </div>
        </form>
      </div>
      {showErrors && (
        <div
          className={`error-container ${
            Object.keys(errors).length > 0 ? "visible" : ""
          }`}
        >
          <div className="error-message">{Object.values(errors)[0]}</div>
        </div>
      )}
    </div>
  );
};

export default Login;
