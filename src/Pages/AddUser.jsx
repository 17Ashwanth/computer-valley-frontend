import React, { useEffect, useState } from 'react'
import { Form  } from 'react-bootstrap';
import avatar from '../Assests/avatar.svg'
import { addUserAPI } from '../service/allAPI';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';



function AddUser() {

  const [capVal, setCapVal] = useState(null)

    const [userDetails, setuserDetails]=useState({
        slno:"",
        name:"",
        email:"",
        password:"",
        address:"",
        dob:new Date(),
        gender:"",
        hobbie:"",
        country:"",
        img:""
    })
/*     console.log(userDetails);
 */
    const [ preview, setPreview]=useState("")

    const [token,seToken] = useState("")


    

    useEffect(()=>{
        if(sessionStorage.getItem("token")) 
          {
            seToken(sessionStorage.getItem("token"))
          }
      },[])

      useEffect(()=>{
        if(userDetails.img)
        {
            setPreview(URL.createObjectURL(userDetails.img))//URL is predefined method in javascript which has createObjectURL method which can convert file into url
        } 
    
        },[userDetails.img,])
/*         console.log(preview);
 */
        const handleClose = () => {
            setuserDetails({
                slno:"",
                name:"",
                email:"",
                password:"",
                address:"",
                dob:"",
                gender:"",
                hobbie:"",
                country:"",
                img:""
            })
            setPreview("")
            setCapVal(false)
                }

        // function to add user
        const handleAdd = async (e)=>{
            e.preventDefault();
            const{
                slno,
                name,
                email,
                password,
                address,
                dob,
                gender,
                hobbie,
                country,
                img
            }= userDetails

            const slPattern = /^\d+$/
            const namePattern = /^[a-zA-Z\s]+$/
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/
            const addressPattern = /^[A-Za-z0-9,\s]+$/

            if(!slPattern.test(slno)){
              Swal.fire({
                title: "Please enter a valid Sl No",
                icon: "info",
                showConfirmButton: false,
                timer: 1500
              });
            } else if(!namePattern.test(name)){
              Swal.fire({
                title: "Please enter a valid Name",
                icon: "info",
                showConfirmButton: false,
                timer: 1500
              });
            } else if(!emailPattern.test(email)){
              Swal.fire({
                title: "Please enter a valid Email ID",
                icon: "info",
                showConfirmButton: false,
                timer: 1500
              });
            } else if(!passwordPattern.test(password)){
              Swal.fire({
                title: "Password should be at least 8 characters with at least one capital letter, one lowercase letter, one symbol, and one digit",
                icon: "info"
              });
            } else if(!addressPattern.test(address)){
              Swal.fire({
                title: "Please enter a valid Address",
                icon: "info",
                showConfirmButton: false,
                timer: 1500
              });
            } else if(!gender){
              Swal.fire({
                title: "Please Select Your Gender",
                icon: "info",
                showConfirmButton: false,
                timer: 1500
              });
            } else if(!hobbie){
              Swal.fire({
                title: "Please Select Atleast 1 Hobbie",
                icon: "info",
                showConfirmButton: false,
                timer: 1500
              });
            } else if(!country){
              Swal.fire({
                title: "Country is not Selected",
                icon: "info",
                showConfirmButton: false,
                timer: 1500
              });
            } else if(!dob){
              Swal.fire({
                title: "Date Of Birth is Essential",
                icon: "info",
                showConfirmButton: false,
                timer: 1500
              });
            } else if(!img){
              Swal.fire({
                title: "Profile Pitcure is  required",
                icon: "info",
                showConfirmButton: false,
                timer: 1500
              });
            }
            else
            {
                const reqBody = new FormData()

                reqBody.append("slno",slno)
                reqBody.append("name",name)
                reqBody.append("email",email)
                reqBody.append("password",password)
                reqBody.append("dob",dob)
                reqBody.append("gender",gender)
                reqBody.append("hobbie",hobbie)
                reqBody.append("country",country)
                reqBody.append("img",img)

                if(token)
                {
                    const reqHeader = {
                    "Content-Type" : "multipart/form-data",
                    "Authorization" :`Bearer ${token}`
                    }

                    const result = await addUserAPI(reqBody,reqHeader)
/*                     console.log(result);
 */                    if(result.status === 200)
                    {/*  console.log(result); */
                      Swal.fire({
                        title:'User Has Being Added Succesfully',
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    handleClose()
                    }
                    else
                    {
                      Swal.fire({
                        title: "Oops! Invalid Form",
                        text: `${result.response.data}`,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    handleClose()
                    }
        
                }
  
            }
        }

  return (
    <>
    
    <div style={{backgroundColor:'black'}} className=" mt-5 w-75 container rounded p-5 mb-5">
    <h1 className='text-white text-center mb-4 ms-1'>USER FORM SUBMITTING</h1>
        <div className="row align-items-center">
          <div className="col-lg-6">
          <h1 className='ms-3 mt-3 mb-4 text-white text-center' href="/">PICTURE UPLOAD</h1>
          <div className='d-flex justify-content-center'>
                  <label htmlFor='profile'>
                    <input  onChange={(e)=>setuserDetails({...userDetails,img:e.target.files[0]})}  type="file"  id='profile' style={{display:'none'}} />
                    <img className= 'rounded-circle' height={'200px'} width={'200px'} src={preview? preview:avatar} alt="no image"  />:
                  </label>
            </div>  
              <div className='d-flex justify-content-center'>
                <Link to={'/home'}>
                <button className='btn btn-dark mt-4 mb-4'>Back to Home</button>
                </Link> 
              </div>    
            </div>

          <div className="col-lg-6">
            <div className="d-flex align-items-center justify-content-center flex-column">
              <Form>

              <Form.Group style={{width:'100%'}} className="  mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control  value={userDetails.slno} onChange={(e)=>setuserDetails({...userDetails,slno:e.target.value})} name='slno'  type="number" placeholder="Enter Your SL No" />
                </Form.Group>

                <Form.Group style={{width:'100%'}} className="  mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Control value={userDetails.name} onChange={(e)=>setuserDetails({...userDetails,name:e.target.value})}  name='name'  type="text" placeholder="Enter Your Name" />
                </Form.Group>

                <Form.Group style={{width:'100%'}} className="  mb-3" controlId="exampleForm.ControlInput3">
                  <Form.Control value={userDetails.email} onChange={(e)=>setuserDetails({...userDetails,email:e.target.value})} name='email'  type="email" placeholder="Enter Your Email" />
                </Form.Group>

                <Form.Group style={{width:'100%'}} className="  mb-3" controlId="exampleForm.ControlInput4">
                  <Form.Control value={userDetails.password} onChange={(e)=>setuserDetails({...userDetails,password:e.target.value})}   type="password" placeholder="Enter Your Password" />
                </Form.Group>

                <Form.Group style={{width:'100%'}} className=" mb-3" controlId="exampleForm.ControlInput5">
                <Form.Control as="textarea" rows={3} value={userDetails.address} onChange={(e)=>setuserDetails({...userDetails,address:e.target.value})}  name='address' placeholder="Enter Your Address" />
                </Form.Group>


                <Form.Group style={{width:'100%'}} className="  mb-3" controlId="exampleForm.ControlInput6">
                  <Form.Label className='text-white'>Gender</Form.Label>
                  <div>
                    <Form.Check className='text-white'
                      inline
                      label="Male"
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                       checked={userDetails.gender === "male"}
                      onChange={(e)=>setuserDetails({...userDetails,gender:e.target.value})} 
                    />
                    <Form.Check className='text-white'
                      inline
                      label="Female"
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                       checked={userDetails.gender === "female"}
                      onChange={(e)=>setuserDetails({...userDetails,gender:e.target.value})} 
                    />
                    <Form.Check className='text-white'
                      inline
                      label="Other"
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                       checked={userDetails.gender === "other"}
                      onChange={(e)=>setuserDetails({...userDetails,gender:e.target.value})} 
                    />
                  </div>
                </Form.Group>

                <Form.Group style={{width:'100%'}} className="  mb-3" controlId="exampleForm.ControlInput7">
                <Form.Label className='text-white'>Hobbies</Form.Label>
                    <div>
                        <Form.Check
                        className='text-white'
                        inline
                        label="Reading Books"
                        type="checkbox"
                        id="reading"
                        name="hobbies"
                        value="reading"
                        checked={userDetails.hobbie.includes("reading")}
                        onChange={(e) => {
                            const value = e.target.value;
                            setuserDetails((prevUserData) => ({
                            ...prevUserData,
                            hobbie: prevUserData.hobbie.includes(value)
                                ? prevUserData.hobbie.filter((hobby) => hobby !== value)
                                : [...prevUserData.hobbie, value],
                            }));
                        }}
                        />
                        <Form.Check
                        className='text-white'
                        inline
                        label="Watching Movies"
                        type="checkbox"
                        id="movies"
                        name="hobbies"
                        value="movies"
                        checked={userDetails.hobbie.includes("movies")}
                        onChange={(e) => {
                            const value = e.target.value;
                            setuserDetails((prevUserData) => ({
                            ...prevUserData,
                            hobbie: prevUserData.hobbie.includes(value)
                                ? prevUserData.hobbie.filter((hobby) => hobby !== value)
                                : [...prevUserData.hobbie, value],
                            }));
                        }}
                        />
                        <Form.Check
                        className='text-white'
                        inline
                        label="Listening to Music"
                        type="checkbox"
                        id="music"
                        name="hobbies"
                        value="music"
                        checked={userDetails.hobbie.includes("music")}
                        onChange={(e) => {
                            const value = e.target.value;
                            setuserDetails((prevUserData) => ({
                            ...prevUserData,
                            hobbie: prevUserData.hobbie.includes(value)
                                ? prevUserData.hobbie.filter((hobby) => hobby !== value)
                                : [...prevUserData.hobbie, value],
                            }));
                        }}
                        />
                    </div>
                </Form.Group>


            <Form.Group style={{ width: '100%' }} className=" mb-3" controlId="exampleForm.ControlInput8">
            <Form.Label className='text-white'>Country</Form.Label>
            <Form.Control as="select"  value={userDetails.country} onChange={(e)=>setuserDetails({...userDetails,country:e.target.value})} >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="England">England</option>
            <option value="Australia">Australia</option>
            </Form.Control>
            </Form.Group>

            <Form.Group style={{ width: '100%' }} className="  mb-3" controlId="exampleForm.ControlInput9">
            <Form.Label className='text-white'>Date of Birth</Form.Label>
            <br />
            <DatePicker
            selected={userDetails.dob}
            onChange={(date) => setuserDetails({ ...userDetails, dob: date })}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            />
            </Form.Group>

            <ReCAPTCHA
            sitekey="6LeyF6EpAAAAAOG6M3qEFumyrmLUnVHQATH6Zs9-"
            onChange={(val) => setCapVal(val)}
            size="compact"
            />
                <div className='d-flex justify-content-between ms-5'>
                  <div>
                    <button  onClick={handleAdd}  className='btn btn-dark mt-4'disabled={!capVal}>SUBMIT</button>
                  </div> 
                  <div>
                  <button onClick={handleClose}   className='btn btn-dark mt-4'>CANCEL</button>
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

export default AddUser