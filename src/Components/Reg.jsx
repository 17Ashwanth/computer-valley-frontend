import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap';
import reg from '../Assests/login.svg'
import { registerAPI } from '../service/allAPI';
import Swal from 'sweetalert2';


function Reg() {
  const [userData, setUserData] = useState({
    username:"",
    address:"",
    gender:"",
    password:""
  })
  console.log(userData);

  const navigate = useNavigate()

  const handleRegister = async(e)=>{
    e.preventDefault()
    const {username,address,gender,password}= userData
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const addressPattern = /^[A-Za-z0-9,\s]+$/
    const genderPattern = /^[A-Za-z]+$/
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/

    if(!emailPattern.test(username)){
      Swal.fire({
        title: "Please enter a valid username",
        icon: "info",
        showConfirmButton: false,
        timer: 1500
      });
    } else if(!addressPattern.test(address)){
      Swal.fire({
        title: "Please enter a valid Address",
        icon: "info",
        showConfirmButton: false,
        timer: 1500
      });
    } else if(!genderPattern.test(gender)){
      Swal.fire({
        title: "Gender should only contain letters",
        icon: "info",
        showConfirmButton: false,
        timer: 1500
      });
    } else if(!passwordPattern.test(password)){
      Swal.fire({
        title: "Password should be at least 8 characters with at least one capital letter, one lowercase letter, one symbol, and one digit",
        icon: "info"
      });
    } else {
      const result= await registerAPI(userData)
      console.log(result);
      if(result.status===200){
        Swal.fire({
          title:'You Have Being Registerd Succesfully',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        setUserData({username:"",address:"",gender:"",password:""})
        navigate('/')
      } else {
        Swal.fire({
          title: "Oops! Invalid Form",
          text: `${result.response.data}`,
          icon: "error",
          showConfirmButton: false,
          timer: 1500
        });
      }
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
              <h1 className='text-white mb-4'>USER REGISTER</h1>
              <Form>
                <Form.Group style={{width:'100%'}} className=" ms-4 mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} name='username'  type="text" placeholder="Enter Your Username" />
                </Form.Group>
                <Form.Group style={{width:'100%'}} className=" ms-4 mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control value={userData.address} onChange={(e)=>setUserData({...userData,address:e.target.value})} name='address'  type="text" placeholder="Enter Your Address" />
                </Form.Group>

                <Form.Group style={{width:'100%'}} className=" ms-4 mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label className='text-white'>Gender</Form.Label>
                  <div>
                    <Form.Check className='text-white'
                      inline
                      label="Male"
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={userData.gender === "male"}
                      onChange={(e)=>setUserData({...userData,gender:e.target.value})}
                    />
                    <Form.Check className='text-white'
                      inline
                      label="Female"
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={userData.gender === "female"}
                      onChange={(e)=>setUserData({...userData,gender:e.target.value})}
                    />
                    <Form.Check className='text-white'
                      inline
                      label="Other"
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                      checked={userData.gender === "other"}
                      onChange={(e)=>setUserData({...userData,gender:e.target.value})}
                    />
                  </div>
                </Form.Group>
                
                <Form.Group style={{width:'100%'}} className=" ms-4 mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}  type="password" placeholder="Enter Your Password" />
                </Form.Group>
                <div className='d-flex justify-content-between ms-5'>
                  <div>
                    <button  onClick={handleRegister}  className='btn btn-dark mt-4'>REGISTER</button>
                    <p className='text-light mt-4'>Already User? Click Here to <Link style={{textDecoration:'none', color:'white'}} to={'/'}>Login</Link></p>
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

export default Reg
