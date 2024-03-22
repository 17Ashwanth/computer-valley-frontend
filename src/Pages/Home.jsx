import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Header from '../Components/Header'
import Card from 'react-bootstrap/Card';
import home from '../Assests/home.svg'
import { Link } from 'react-router-dom';
import { editProfileAPI } from '../service/allAPI';
import { BASE_URL } from '../service/baseURL';
import avatar from '../Assests/user.svg'
import Swal from 'sweetalert2';


function Home() {
  const [userProfile, setUserProfile]= useState({
    username:"",
    address:"",
    gender:"",
    password:"",
    profile:""
  })

  const [isUpdate,setIsUpdate] = useState(false)

  const [existingImage,setExistingImage]=useState("")

  const [preview,setpreview]= useState("")


  useEffect(()=>{
    const user = JSON.parse(sessionStorage.getItem("existsUser")) 

    setUserProfile({...userProfile,username:user.username,address:user.address,gender:user.gender,password:user.password,profile:""})
  
    setExistingImage(user.profile)


  },[isUpdate])

  useEffect(()=>{
    if(userProfile.profile){
      setpreview(URL.createObjectURL(userProfile.profile))
    }
    else
    {
      setpreview("")
    }
  },[userProfile.profile])


  const handleProfileUpdate = async()=>{
    const {username,address,gender,password,profile}=userProfile
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/


    if(!passwordPattern.test(password))
    {
      Swal.fire({
        title: "Password should be at least 8 characters with at least one capital letter, one lowercase letter, one symbol, and one digit",
        icon: "info"
      });    }
    else
    {
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("address",address)
      reqBody.append("gender",gender)
      reqBody.append("password",password)
      preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)

      const token = sessionStorage.getItem("token")
    if(preview){
      const reqHeader = {
        "Content-Type" : "multipart/form-data",
        "Authorization" :`Bearer ${token}`
      }
      const result = await editProfileAPI(reqBody,reqHeader)
/*       console.log(result);
 */      if(result.status === 200){
        Swal.fire({
          title:'Profile Updated Succesfully',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });        sessionStorage.setItem("existsUser",JSON.stringify(result.data))
        setIsUpdate(true)
      }
      else{
        Swal.fire({
          title: "Oops! Invalid Form",
          text: `${result.response.data}`,
          icon: "error",
          showConfirmButton: false,
          timer: 1500
        });      }
    }
    else{
      const reqHeader = {
        "Content-Type" : "application/json",
        "Authorization" :`Bearer ${token}`
      }
      const result = await editProfileAPI(reqBody,reqHeader)
/*       console.log(result);
 */      if(result.status === 200){
        Swal.fire({
          title:'Profile Updated Succesfully',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });                
        sessionStorage.setItem("existsUser",JSON.stringify(result.data))
        setIsUpdate(true)
    }
    else
    {
      Swal.fire({
        title: "Oops! Invalid Form",
        text: `${result.response.data}`,
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      });    }
    }
  }
}

  return (
    <>
    <Header/>
    <div style={{backgroundColor:'black'}} className=" mt-5 w-75 container rounded p-5 mb-5">
            <div className="row align-items-center">
              <Row>
                <Col className='d-flex  align-items-center' lg="6">
                  <div className="text-center text-light">
                  <h1 className="text-light text-center mb-4">WELCOME USER</h1>

                 <Link to={"/adduser"}>
                    <Card>
                    <Card.Img variant="top" src={home} />
                    <Card.Body>
                    <Card.Text>
                    <h3 style={{textDecoration:'none'}}>
                       Are You Ready Click On Here To Get Started!
                    </h3>                  
                    </Card.Text>
                    </Card.Body>
                    </Card>
                 </Link>

                  </div>
                </Col>
                <Col lg='6'>
                  <div className="d-flex align-items-center justify-content-center flex-column">
                  <h1 className='ms-3 mt-4 text-white'>Profile Update</h1>
                  <div className='d-flex justify-content-center'>
                  <label htmlFor='profile'>
                  <input onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})} type="file" id='profile' style={{display:'none'}} />
              
                   <img src={preview?preview:existingImage?`${BASE_URL}/uploads/${existingImage}`:avatar} alt="no-image" width={'200px'} height={'200px'} className='rounded-circle' />                  
                  </label>
            </div> 
                  <div className="mb-3 mt-3">
                  <h1 className='ms-3 mt-4 text-white'>Reset Password</h1>
                    <input value={userProfile.password} onChange={(e)=>setUserProfile({...userProfile,password:e.target.value})}id='password' className='form-control rounded' type="text" placeholder='Change the password' />
                  </div>
                  <button  onClick={handleProfileUpdate}  className='btn btn-dark rounded  ms-4 mt-4'>UPDATE</button>
                  </div>
                </Col>
              </Row>
                
              </div>
    </div>

    </>
  )
}

export default Home