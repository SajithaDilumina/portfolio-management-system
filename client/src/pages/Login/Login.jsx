import React, {  useState } from "react";
import styles from "./Login.module.scss"
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { Grid, Button } from '@mui/material'
import { logo } from "../../assets/Images";

import LoginFomComponent from "../../components/LoginFomComponent/LoginFomComponent";
import { validateFormData } from "../../helper/index";
import { UserService } from "../../Services/User.Service";
import { toast } from "react-toastify";

const Login = () => {

    const INITIAL_LOGIN_FORM={
        email:  { value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "", },
        password:  { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
      }
    const [LoginForm, setLoginForm] = useState(INITIAL_LOGIN_FORM);
    const navigate = useNavigate();
    const [helperText, setHelperText] = useState(true);
  


const handleLogin = async () => {
  const [validateData, isValid] = await validateFormData(LoginForm);
  setLoginForm(validateData);
  if(isValid){
      const payload = {
            email: LoginForm.email.value,
            password: LoginForm.password.value,
      }
    UserService.Login(payload).then((res)=>{
      console.log('res',res)
      if(res.status === 200){
        localStorage.setItem("token",res.data.data.access_token)
        localStorage.setItem("user",JSON.stringify(res.data.data.user))
        if(res.data.data.user.role === "ADMIN"){
          toast.success("User Login Successfully")
          navigate("/UserManagement")
        }
      else{
        toast.success("User Login Successfully")
        navigate("/home")
      }
      }
    }).catch((err)=>{
      console.log("err",err)
      toast.error(err)
    })
  }
}

const onInputHandleChange = (property, value) => {
    setHelperText(true);
    if (property === "email") {
      setLoginForm({
          ...LoginForm,
          email: {
            ...LoginForm.email,
            value: value,
          },
        });
      }
      if (property === "password") {
        setLoginForm({
            ...LoginForm,
            password: {
              ...LoginForm.password,
              value: value,
            },
          });
        }

}

const handleInputFocus=(property,section)=>{
  if (section === "GI")
  setLoginForm({
    ...LoginForm,
    [property]: {
      ...LoginForm[property],
      error: null,
    },
  });
  
}
const HandleSignUp=()=>{
    navigate("/signup")
}
  return (
    <section
      className={`${styles.container} `}
    >
        <section className={`${styles.login}`}>
        <aside className={styles.logincard}>
          <aside className={styles.loginActions}>
            <aside className={styles.header}>
            <img className={styles.logo} src={logo} alt="logo" />
              <h1 style={{color:"white"}}>WELCOME TO PORTFOLIO MANAGEMENT  SYSTEM</h1>
            </aside>

<LoginFomComponent
   helperText={helperText}
   LoginForm={LoginForm}
   onInputHandleChange={onInputHandleChange}
   handleInputFocus={handleInputFocus}
/>
        <Button
              className={`${styles.primaryBtn} `}
              variant="contained"
              disabled={false}
              onClick={() => handleLogin()}
            >
             Login  Into Your Account
            </Button>
            <Button
              className={`${styles.secondary} `}
              variant="contained"
              disabled={false}
              onClick={() => navigate("/signup")}
            >
            Don't have an account? Sign Up Now
            </Button>
            <div className={styles.loginFooter}>
              <p>
              Optimize your investments with our Portfolio Management System. Track, analyze, and manage your diverse assets effortlessly for informed decision-making.
              </p>
            </div>
          </aside>
        </aside>
      </section>
    </section>
  )
}

export default Login