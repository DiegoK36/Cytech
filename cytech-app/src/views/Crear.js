import React, { useState } from 'react';
import Axios from 'axios';
import '../css/Crear.css';

const Crear = () => {
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
    const { name, value, type } = e.target;
    let error = '';

    if (type === 'file') {
      const file = e.target.files[0];
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
      return; // Exit if there are validation errors
    }

    try {
      const response = await Axios.post('http://localhost:3001/api/crear-proyecto', formData);
      setSuccessMessage('Proyecto guardado con éxito');
      console.log('Proyecto guardado con éxito:', response.data);
    } catch (error) {
      setErrors({ api: 'Error al guardar el proyecto' });
      console.error('Error al guardar el proyecto:', error);
    }
  };
  return (
    <div className='crear-body'>
      <div className='volver-container1'>
        <a href="/">
        </a>
      </div>
      <div className="crear-container">
        <h2> Crea un nuevo <span className='degradado'>Proyecto</span></h2>
        <div>
          <form className="crear-form">
            <div className='column'>
              <div className="input-group">
                <label htmlFor="nombre">Nombre <span className="required">*</span></label>
                <input type="text" name="nombre" placeholder="Introduzca el nombre del proyecto" onChange={handleInputChange} value={formData.nombre} />
              </div>
              <div className="input-group">
                <label htmlFor="descripcion">Descripción <span className="required">*</span></label>
                <textarea name="descripcion" placeholder="Introduzca una descripción del proyecto" onChange={handleInputChange} value={formData.descripcion} />
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
                  <button type='button' className='neurotecnologia-button'>Neurotecnología</button>
                  <button type='button' className='protesis-button'>Prótesis</button>
                  <button type='button' className='medicina-button'>Medicina</button>
                  <button type='button' className='otros-button'>Otros</button>
                </div>
              </div>


            </div>
            <div className='column'>
              <div className="input-group">
                <label htmlFor="fechaNacimiento">Fecha Límite del Proyecto <span className="required">*</span></label>
                <input type="date" id="fechaNacimiento" name="fechaNacimiento" placeholder="DD/MM/AAAA" />
              </div>
              <div className="input-group">
                <label htmlFor="mail">Correo <span className="required">*</span></label>
                <input type="text" name="email" placeholder="Introduzca su correo electrónico" />
              </div>
              <div className="input-group">
                <label htmlFor="url">Instagram</label>
                <input type="url" name="url" placeholder="Introduzca la URL de su Instagram" />
              </div>
              <div className="input-group">
                <label htmlFor="url">YouTube</label>
                <input type="url" name="url" placeholder="Introduzca la URL de su YouTube" />
              </div>
              <div className="input-group">
                <label htmlFor="url">Facebook</label>
                <input type="url" name="url" placeholder="Introduzca la URL de su Facebook" />
              </div>
            </div>
          </form>
        </div>
        <div className="card1" id="card1">
          <div className="content">
            <span onClick={handleSubmit}>Crear Proyecto</span>
          </div>
        </div>
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
