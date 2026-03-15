/* eslint-disable no-unused-vars */

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./Login.css";
import { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const formData = {
  email: '',
  password: '',
  terms: false,
  name: ''
}

export default function Login() {
  const [form, setForm] = useState(formData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value
    }));

   
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? "" : "Geçerli bir email giriniz"
      }));
    }

    if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/;
      setErrors((prev) => ({
        ...prev,
        password: passwordRegex.test(value) ? "" : "Şifre en az 4 karakter, büyük harf ve sayı içermelidir"
      }));
    }
  };

  const handlePost = async () => {
  try {
    const response = await axios.post(
      "https://69b1a26fadac80b427c5d51e.mockapi.io/api/v1/users",
      {
        email: form.email,
        password: form.password,
        name: form.name || "Yeni Kullanıcı"
      }
    );

    console.log("POST başarılı:", response.data);
    alert("Kullanıcı başarıyla oluşturuldu!");

  } catch (error) {
    console.error("POST hatası:", error);
    setErrors({ general: "POST isteği gönderilemedi" });
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.email || errors.password) return;

    try {
      const response = await axios.get(
        "https://69b1a26fadac80b427c5d51e.mockapi.io/api/v1/users"
      );

      const user = response.data.find(
        (item) =>
          item.email === form.email &&
          item.password === form.password
      );

      if (user) {
        navigate("/success");
      } else {
        setErrors({ general: "Email veya şifre yanlış" });
      }
    } catch (error) {
      setErrors({ general: "Sunucuya bağlanırken hata oluştu" });
    }
  };

  return (
    <div className="page">
      <div className="login-box">
        <p className="login-title">Sign In</p>

        {errors.general && <p className="error">{errors.general}</p>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="Email">Email:</Label>
            <Input
              id="Email"
              name="email"
              placeholder="email adresinizi giriniz"
              type="email"
              onChange={handleChange}
              value={form.email}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </FormGroup>

          <FormGroup>
            <Label for="Password">Password:</Label>
            <Input
              id="Password"
              name="password"
              placeholder="kayıtlı şifrenizi giriniz"
              type="password"
              onChange={handleChange}
              value={form.password}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </FormGroup>

          <FormGroup check>
            <Input
              id="Checkbox"
              name="terms"
              type="checkbox"
              onChange={handleChange}
              checked={form.terms}
            />
            <Label check for="Checkbox">
              Şartları Okudum ve Kabul Ediyorum
            </Label>
          </FormGroup>

          <FormGroup>
            <Button className='login-box button' disabled={!form.terms}>
              Giriş Yap
            </Button>
          </FormGroup>
          <Button
            className='login-box button'
             disabled={!form.terms || errors.email || errors.password}
             onClick={handlePost}
>
             Kayıt Ol
          </Button>
        </Form>
      </div>
    </div>
  );
}