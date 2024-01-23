import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../css/Crear.css';

const Crear = () => {

  const navigate = useNavigate();

  const handleCategoryClick = (categoria) => {
    setFormData({ ...formData, categoria });
  };

  useEffect(() => {
    const hasToken = !!localStorage.getItem('token');

    if (!hasToken) {
      navigate('/login');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    presupuesto: '',
    moneda: 'USD',
    imagen: null,
    categoria: '',
    fechaNacimiento: '',
    email: '',
    instagram: '',
    youtube: '',
    facebook: '',
  });

  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateInput = (name, value, type) => {
    let error = '';
    const regexForName = /^[a-zA-Z0-9\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/)?(www\.)?(instagram\.com|youtube\.com|facebook\.com)\/[a-zA-Z0-9(.?)]/;
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    switch (name) {
      case 'nombre':
        if (!regexForName.test(value)) {
          error = 'Caracteres inválidos en el Nombre';
        }
        break;
      case 'presupuesto':
        if (isNaN(value)) {
          error = 'El presupuesto debe ser un número';
        }
        break;
      case 'imagen':
        if (type === 'file' && value) {
          const fileExtension = value.name.split('.').pop().toLowerCase();
          if (!['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            error = 'Formato de imagen inválido';
          }
        }
        break;
      case 'fechaNacimiento':
        if (new Date(value) < oneMonthFromNow) {
          error = 'La fecha debe ser de un mes mínimo';
        }
        break;
      case 'email':
        if (!emailRegex.test(value)) {
          error = 'Formato de Correo Inválido';
        }
        break;
      case 'instagram':
      case 'youtube':
      case 'facebook':
        if (value && !urlRegex.test(value)) {
          error = `URL ${name} Inválida`;
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    let error = '';

    if (type === 'file') {
      const file = files[0];
      error = validateInput(name, file, type);
      setFormData({ ...formData, [name]: file });
    } else {
      error = validateInput(name, value, type);
      setFormData({ ...formData, [name]: value });
    }

    setErrors({ ...errors, [name]: error });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);

    if (Object.values(errors).some(error => error !== '')) {
      return; // Salir si hay errores de validación
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'imagen' && formData[key]) {
        data.append(key, formData[key], formData[key].name);
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await Axios.post('http://localhost:3001/api/crear-proyecto', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setSuccessMessage('Proyecto guardado con éxito');
        setFormData({
          nombre: '',
          descripcion: '',
          presupuesto: '',
          moneda: 'USD',
          imagen: null,
          categoria: '',
          fechaNacimiento: '',
          email: '',
          instagram: '',
          youtube: '',
          facebook: '',
        });
        setShowErrors(false);
      } else {
        setErrors({ api: 'Error al guardar el proyecto' });
      }
    } catch (error) {
      setErrors({ api: 'Error al guardar el proyecto' });
      console.error('Error al guardar el proyecto:', error);
    }
  };

  return (
    <div className='crear-body'>
      <div className="crear-container">
        <div className='volver-container'>
            <a href="/">
              <svg role="presentation" aria-hidden="true" viewBox="0 0 28 28" className='volver'>
                <path d="M11.5 25.2c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-1-.6-1.3L9.5 19 6 15.6l3.2.2h16.6c1.1 0 1.9-.7 1.9-1.8s-.8-1.8-1.9-1.8H9.2l-3.2.2 3.6-3.3 3.2-3.2c.3-.3.6-.8.6-1.3 0-1-.7-1.7-1.8-1.7-.4 0-.9.2-1.3.6L1 12.6c-.4.4-.6.9-.6 1.4s.2 1 .6 1.3l9.3 9.3c.3.4.8.6 1.2.6z" fill='white'></path>
              </svg>
            </a>
        <h2> Crea un nuevo <span className='degradado'>Proyecto</span></h2>
          </div>
        <div>
          <form className="crear-form">
            <div className='column'>
              <div className="input-group">
                <label htmlFor="nombre">Nombre <span className="required">*</span></label>
                <input type="text" name="nombre" placeholder="Introduzca el nombre del proyecto" onChange={handleInputChange} value={formData.nombre} className='input-size'/>
              </div>
              <div className="input-group">
                <label htmlFor="descripcion">Descripción <span className="required">*</span></label>
                <input name="descripcion" placeholder="Introduzca una descripción del proyecto" onChange={handleInputChange} value={formData.descripcion} />
              </div>
              <div className="input-group">
                <label htmlFor='presupuesto'>Presupuesto <span className="required">*</span></label>
                <div className="input-group-special">
                  <input type="number" name="presupuesto" placeholder="Introduzca el presupuesto del proyecto" onChange={handleInputChange} value={formData.presupuesto} />
                  <select name="moneda" className='monedas' onChange={handleInputChange} value={formData.moneda}>
                    <option value="USD">$</option>
                    <option value="EUR">€</option>
                    <option value="GBP">£</option>
                    <option value="JPY">¥</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="imagen">Imagen <span className="required">*</span></label>
                <input type="file" name="imagen" accept="image/*" onChange={handleInputChange} />
              </div>
              <div className="input-group">
                <label htmlFor="categoria">Categoría <span className="required">*</span></label>
                <div className="button-container">
                  <button
                    type='button'
                    className={`neurotecnologia-button ${formData.categoria === 'Neurotecnologia' ? 'selected' : ''}`}
                    onClick={() => handleCategoryClick('Neurotecnologia')}
                  >
                    Neurotecnología
                  </button>
                  <button
                    type='button'
                    className={`protesis-button ${formData.categoria === 'Protesis' ? 'selected' : ''}`}
                    onClick={() => handleCategoryClick('Protesis')}
                  >
                    Prótesis
                  </button>
                  <button
                    type='button'
                    className={`medicina-button ${formData.categoria === 'IA' ? 'selected' : ''}`}
                    onClick={() => handleCategoryClick('IA')}
                  >
                    IAs
                  </button>
                  <button
                    type='button'
                    className={`otros-button ${formData.categoria === 'Salud' ? 'selected' : ''}`}
                    onClick={() => handleCategoryClick('Salud')}
                  >
                    Salud
                  </button>
                </div>
              </div>


            </div>
            <div className='column'>
              <div className="input-group">
                <label htmlFor="fechaNacimiento">Fecha Límite del Proyecto <span className="required">*</span></label>
                <input type="date" id="fechaNacimiento" name="fechaNacimiento" placeholder="DD/MM/AAAA" onChange={handleInputChange} value={formData.fechaNacimiento} />
              </div>
              <div className="input-group">
                <label htmlFor="mail">Correo <span className="required">*</span></label>
                <input type="text" name="email" placeholder="Introduzca su correo electrónico" />
              </div>
              <div className="input-group">
                <label htmlFor="url">Instagram</label>
                <input type="url" name="instagram" placeholder="Introduzca la URL de su Instagram" onChange={handleInputChange} value={formData.instagram} />
              </div>
              <div className="input-group">
                <label htmlFor="url">YouTube</label>
                <input type="url" name="youtube" placeholder="Introduzca la URL de su YouTube" onChange={handleInputChange} value={formData.youtube} />
              </div>
              <div className="input-group">
                <label htmlFor="url">Facebook</label>
                <input type="url" name="facebook" placeholder="Introduzca la URL de su Facebook" onChange={handleInputChange} value={formData.facebook} />
              </div>
            </div>
          </form>
        </div>
            <button type="submit" className='bn634-hover bn34'>Crear mi Proyecto</button>
      </div>
      {showErrors && (
        <div className={`error-container ${Object.keys(errors).length > 0 ? 'visible' : ''}`}>
          <div className="error-message">{Object.values(errors)[0]}</div>
        </div>
      )}
      {successMessage && (
        <div className={`success-container ${successMessage ? 'visible' : ''}`}>
          <div className="success-message">{successMessage}</div>
        </div>
      )}
    </div>

  );
};

export default Crear;