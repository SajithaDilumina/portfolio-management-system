import React,{useState} from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from './SignUp.module.scss'
import { logo } from "../../assets/Images";
import SignUpFormComponent from '../../components/SignUpFormComponent/SignUpFormComponent'
import { validateFormData } from '../../helper/index'
import { UserService } from '../../Services/User.Service';
import { toast } from 'react-toastify';

const SignUp = () => {

    const INITIAL_REG_FORM={
        email:  { value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "", },
        fullName:  { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        password:  { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        address:  { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        country:  { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        jobCategory:  { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        dob:  { value: "", isRequired: true, disable: false, readonly: false, validator: "date", error: "", },
        mobile:  { value: "", isRequired: true, disable: false, readonly: false, validator: "number", error: "",charLength: [10], },
      }
    const [RegForm, setRegForm] = useState(INITIAL_REG_FORM);
    const navigate = useNavigate();
    const [helperText, setHelperText] = useState(true);

      
      const handleInputFocus=(property,section)=>{
        if (section === "GI")
        setRegForm({
          ...RegForm,
          [property]: {
            ...RegForm[property],
            error: null,
          },
        });
        
      }
      const HandleSignUp=async ()=>{
        const [validateData, isValid] = await validateFormData(RegForm);
        setRegForm(validateData);
        console.log("validateData",validateData,isValid)
        if(isValid){
          console.log("Login Success")
         const payload = {
            email: RegForm.email.value,
            fullName: RegForm.fullName.value,
            password: RegForm.password.value,
            address: RegForm.address.value,
            country: RegForm.country.value,
            jobCategory: RegForm.jobCategory.value,
            dob: RegForm.dob.value,
            mobile: RegForm.mobile.value,
          }
          
          UserService.Register(payload).then((res)=>{
            console.log('res',res)
            if(res.status === 201){
            toast.success("User Registered Successfully")
              navigate("/")
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
            setRegForm({
                ...RegForm,
                email: {
                  ...RegForm.email,
                  value: value,
                },
              });
            }
            if (property === "fullName") {
              setRegForm({
                  ...RegForm,
                  fullName: {
                    ...RegForm.fullName,
                    value: value,
                  },
                });
              }
              if (property === "address") {
                setRegForm({
                    ...RegForm,
                    address: {
                      ...RegForm.address,
                      value: value,
                    },
                  });
                }
                if (property === "password") {
                  setRegForm({
                      ...RegForm,
                      password: {
                        ...RegForm.password,
                        value: value,
                      },
                    });
                  }
                  if (property === "country") {
                    setRegForm({
                        ...RegForm,
                        country: {
                          ...RegForm.country,
                          value: value,
                        },
                      });
                    }
                    if (property === "jobCategory") {
                      setRegForm({
                          ...RegForm,
                          jobCategory: {
                            ...RegForm.jobCategory,
                            value: value,
                          },
                        });
                      }
                      if (property === "dob") {
                        const  DateValueString = new Date(value).toISOString().split('T')[0];
                        setRegForm({
                            ...RegForm,
                            dob: {
                              ...RegForm.dob,
                              value: DateValueString,
                            },
                          });
                        }
                        if (property === "mobile") {
                          setRegForm({
                              ...RegForm,
                              mobile: {
                                ...RegForm.mobile,
                                value: value,
                              },
                            });
                          }
      }

  return (
    <section className={`${styles.container} `}>
      <section className={`${styles.login}`}>
      <aside className={styles.logincard}>
        <aside className={styles.loginActions}>
          <aside className={styles.header}>
          <img className={styles.logo} src={logo} alt="logo" />
            <h1 style={{color:"white"}}>WELCOME TO PORTFOLIO MANAGEMENT  SYSTEM</h1>
          </aside>

            <SignUpFormComponent
            helperText={helperText}
            RegForm={RegForm}
            onInputHandleChange={onInputHandleChange}
            handleInputFocus={handleInputFocus}
            />
          <Button
            className={`${styles.primaryBtn} `}
            variant="contained"
            disabled={false}
            onClick={() => HandleSignUp()}
          >
           Register Your Account
          </Button>
          <Button
            className={`${styles.secondary} `}
            variant="contained"
            disabled={false}
            onClick={() => navigate("/")}
          >
              have an account? Sign IN Now
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

export default SignUp