import './Success.css';
import {useNavigate } from 'react-router-dom';
export default function Success() {
  const navigate = useNavigate();
  return (
    <div className="success-container">
      <h1>Giriş Başarılı!</h1>
      <p>Hoş geldiniz! Giriş işleminiz başarıyla tamamlandı.</p>


    <button className='succes-btn' onClick={() => navigate("/")}>Sign Up</button>
    </div>
  );
}