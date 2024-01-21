import React from 'react';
import '../css/Crear.css';

const Crear = () => {
  return (
    <div className='crear-body'>
      <div className='volver-container'>
                <a href="/">
                <svg role="presentation" aria-hidden="true" viewBox="0 0 28 28" className='volver'>
                <path d="M11.5 25.2c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-1-.6-1.3L9.5 19 6 15.6l3.2.2h16.6c1.1 0 1.9-.7 1.9-1.8s-.8-1.8-1.9-1.8H9.2l-3.2.2 3.6-3.3 3.2-3.2c.3-.3.6-.8.6-1.3 0-1-.7-1.7-1.8-1.7-.4 0-.9.2-1.3.6L1 12.6c-.4.4-.6.9-.6 1.4s.2 1 .6 1.3l9.3 9.3c.3.4.8.6 1.2.6z" fill='white'></path>
              </svg>
              
                <h3>  Volver</h3>
                </a>
              </div>
      <div className="crear-container">
        <h2> Crea un nuevo <span className='degradado'>proyecto</span></h2>
        <div>
            <form className="crear-form">
              <div className='column'>
                <div className="input-group">
                    <label htmlFor="nombre">Nombre <span className="required">*</span></label>
                    <input type="text" name="nombre" placeholder="Introduzca el nombre del proyecto" />
                </div>
                <div className="input-group">
                    <label htmlFor="descripcion">Descripción <span className="required">*</span></label>
                    <textarea name="descripcion" placeholder="Introduzca una descripción del proyecto" />
                </div>
                <div className="input-group">
                    <label htmlFor='presupuesto'>Presupuesto <span className="required">*</span></label>
                    <div className="input-group-special">
                        <input type="number" name="presupuesto" placeholder="Introduzca el presupuesto del proyecto" />
                        <select name="moneda">
                            <option value="USD">$</option>
                            <option value="EUR">€</option>
                            <option value="GBP">£</option>
                            <option value="JPY">¥</option>
                        </select>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="imagen">Imagen <span className="required">*</span></label>
                    <input type="file" name="imagen" accept="image/*" />
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
              <input type="text" name="email" placeholder="Introduzca su correo electrónico"/>
            </div>
                <div className="input-group">
                    <label htmlFor="url">Instagram</label>
                    <input type="url" name="url" placeholder="Introduzca la URL de su Instagram"/>
                </div>
                <div className="input-group">
                    <label htmlFor="url">YouTube</label>
                    <input type="url" name="url" placeholder="Introduzca la URL de su YouTube"/>
                </div>
                <div className="input-group">
                    <label htmlFor="url">Facebook</label>
                    <input type="url" name="url" placeholder="Introduzca la URL de su Facebook"/>
                </div>
                </div>
            </form>
        </div>
        <div class="card" id="card">
        <div class="content">
            <span>Crear Proyecto</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Crear;
