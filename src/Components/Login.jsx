import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap';
import reg from '../Assests/login.svg'
import { loginAPI } from '../service/allAPI';
import Swal from 'sweetalert2';


function Login() {
  const [userData, setUserData] = useState({
    username:"",
    password:""
})

  const navigate = useNavigate()

  // function to login

  const handleLogin = async(e)=>{
  e.preventDefault()

  const {username,password}= userData
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/

  if(!emailPattern.test(username)){
    Swal.fire({
      title: "Invalid Username  or Password.",
      icon: "info",
      showConfirmButton: false,
      timer: 1500
    });  }else if(!passwordPattern.test(password)){
      Swal.fire({
        title: "Invalid Username  or Password.",
        icon: "info"
      });
   } else
  {
      const result = await loginAPI(userData)
      console.log(result);

      if(result.status===200){
          sessionStorage.setItem("existsUser",JSON.stringify(result.data.existsUser))
          sessionStorage.setItem("token",result.data.token)

          Swal.fire({
            title:'You Have Being Login Succesfully',
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });          setUserData({username:"",password:""})
          navigate('/home')     
      }
      else
      {
        Swal.fire({
          title: "Oops! Invalid Form",
          text: `${result.response.data}`,
          icon: "error",
          showConfirmButton: false,
          timer: 1500
        });      }
  }
  
}
  return (
    <>
    <div style={{backgroundColor:'black'}} className=" mt-5 w-75 container rounded p-5 mb-5">
      <div className="row align-items-center">
          <div className="col-lg-6">
              <img src={reg} style={{width:'100%'}} alt="" />
          </div>
          <div className="col-lg-6">
              <div className="d-flex align-items-center justify-content-center flex-column">
              <h1 className='text-white mb-4'>USER LOGIN</h1>

                  <Form>

                        <Form.Group style={{width:'100%'}} className=" ms-4 mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control  value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})}   type="text" placeholder="Enter Your Username" />
                        </Form.Group>

                        <Form.Group style={{width:'100%'}} className=" ms-4 mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}  type="password" placeholder="Enter Your Password" />
                        </Form.Group>

                     <div className='d-flex justify-content-between ms-5'>
                        <div>
                            <button  onClick={handleLogin}  className='btn btn-dark mt-4'>LOGIN</button>
                            <p className='text-light mt-4'>New User? Click Here to <Link style={{textDecoration:'none', color:'white'}} to={'/reg'}>Sign Up</Link></p>
                        </div> 
                     </div>
                      
                   </Form>
              </div>
          </div>
      </div>
  </div>
  

  </>
  )
}

export default Login