import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';

export default function Login() {
  const {login} = useAuth();
  const {addPendingItem} = useCart();

  const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if(data.username === "admin" && data.password === "1234"){
      login(data.username, data.password);
      alertify.success("Giriş başarılı!");

      addPendingItem();
      navigate("/cart");
    }else{
      alertify.error("Kullanıcı adı veya parola hatalı!");
    }
  }
  
  return(
    <div className='container d-flex justify-content-center align-items-center' style={{height: "100vh"}}>
      <div className='card shadow p-4' style={{width: "400px"}}>
            <h2 className='text-center mt-4'>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-3'>
                <label className='form-label'>Username</label>
                <input
                {...register("username", {required: true})}
                className='form-control'
                placeholder='username giriniz'
                ></input>
                {errors.username && <small className='text-danger'>Username is required</small>}
              </div>
              <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input
                {...register("password", {required: true})}
                className='form-control'
                placeholder='password giriniz'
                ></input>
                {errors.password && <small className='text-danger'>Password is required</small>}
              </div>
              <button type='submit' className='btn btn-success w-100'>Login</button>
            </form>
      </div>
    </div>
  );
}

