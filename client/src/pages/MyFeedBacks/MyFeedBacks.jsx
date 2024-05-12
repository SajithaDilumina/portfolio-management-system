import React, { Children } from 'react'
import Styles from './MyFeedBacks.module.scss'
import FeedbackManagementTable2 from '../../components/FeedbackManagementTable/FeedbackManagementTable2'
import { useState } from 'react'
import { FeedBackService } from '../../Services/feedBack.Service'
import { toast } from 'react-toastify'
import { SCREEN_MODES } from '../../utilities/app.constants'
import { useEffect } from 'react'
import FeedbackModal from '../../components/FeedbackModal/FeedbackModal'
import { validateFormData } from '../../helper/index';

const MyFeedBacks = () => {
    const INITIAL_FEEDBACK_FORM = {
        name: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
        email: { value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "" },
        responsibility : { value: "", isRequired: true, disable: false, readonly: false, validator: "number", error: "" },
        friendliness: { value: "", isRequired: true, disable: false, readonly: false, validator: "number", error: "" },
        creativity: { value: "", isRequired: true, disable: false, readonly: false, validator: "number", error: "" },
        reliability: { value: "", isRequired: true, disable: false, readonly: false, validator: "number", error: "" },
        overallSatisfaction: { value: "", isRequired: true, disable: false, readonly: false, validator: "number", error: "" },
        comments: { value: "", isRequired: true, disable: false, readonly: false, validator: "comment", error: "",max: 100 }

    };
    
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbackForm, setFeedbackForm] = useState(INITIAL_FEEDBACK_FORM);
    const [openModal, setOpenModal] = useState(false);
    const [helperText, setHelperText] = useState(true);
    const [feedbackId, setFeedbackId] = useState(null);
    const [detailId, setDetailId] = useState(null);

    const [mode, setMode] = useState(null);


    
    useEffect(() => {

        initialDataLoad()

    }, []);
    const initialDataLoad=(async()=>{
                // Get the user object from local storage
const userString = localStorage.getItem('user');
const user = JSON.parse(userString);
const userId = user._id;


        FeedBackService.getFeedbacksByLoginUser(userId).then((res)=>{
            setFeedbacks(res.data)
            console.log("res",res)
        }).catch((err)=>{
            // toast.error("No Any From Feedbacks Added")
        })
    })

    const handleRequest = (mode, feedbackId,detailId) => {
        if(mode === SCREEN_MODES.DELETE){
            FeedBackService.deleteSpecificFeedBack(feedbackId,detailId).then((res)=>{
                toast.success(res.data.message)
                initialDataLoad()
            }).catch((err)=>{
                toast.error(err)
            })
        }

        if(mode === SCREEN_MODES.EDIT){
            setMode(SCREEN_MODES.EDIT);
            setFeedbackId(feedbackId);
            setDetailId(detailId);
            FeedBackService.getSpecificFeedbackDetail(feedbackId,detailId).then((res)=>{
                const feedbackData = res.data;
                setFeedbackForm({
                    name: { value: feedbackData.name, isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
                    email: { value: feedbackData.email, isRequired: true, disable: false, readonly: false, validator: "email", error: "" },
                    responsibility : { value: feedbackData.responsibility, isRequired: true, disable: false, readonly: false, validator: "number", error: "" },
                    friendliness: { value: feedbackData.friendliness, isRequired: true, disable: false, readonly: false, validator: "number", error: "" },
                    creativity: { value: feedbackData.creativity, isRequired: true, disable: false, readonly: false, validator: "number", error: "" },
                    reliability: { value: feedbackData.reliability, isRequired: true, disable: false, readonly: false, validator: "number", error: "" },
                    overallSatisfaction: { value: feedbackData.overallSatisfaction, isRequired: true, disable: false, readonly: false, validator: "number", error: "" },
                    comments: { value: feedbackData.comments, isRequired: true, disable: false, readonly: false,  validator: "comment", error: "",max: 100}  

            })
            setOpenModal(true);

        }).catch((err)=>{
            toast.error(err)
        })
                    

        }
    }



        const handleCloseModal = () => {
            setFeedbackForm(INITIAL_FEEDBACK_FORM);
            setOpenModal(false);
        };  
        
        const onInputHandleChange=(property,value)=>{
            setHelperText(true);          
            setFeedbackForm({
                ...feedbackForm,
                [property]: {
                    ...feedbackForm[property],
                    value: value
                }
            });
        }

        
    const handleInputFocus=(property,section)=>{
        if (section === "GI")
            setFeedbackForm({
          ...feedbackForm,
          [property]: {
            ...feedbackForm[property],
            error: null,
          },
        });
        
      }
      const HandleBtnResponse=async (mode)=>{
        const [validateData, isValid] = await validateFormData(feedbackForm);
        setFeedbackForm(validateData);
        if(isValid){

     
        if(mode === SCREEN_MODES.EDIT){

            const payload={
                name: feedbackForm.name.value,
                email: feedbackForm.email.value,
                responsibility: feedbackForm.responsibility.value,
                friendliness: feedbackForm.friendliness.value,
                creativity: feedbackForm.creativity.value,
                reliability: feedbackForm.reliability.value,
                overallSatisfaction: feedbackForm.overallSatisfaction.value,
                comments: feedbackForm.comments.value
            }

            FeedBackService.updateSpecificFeedBack(feedbackId,detailId,payload).then((res)=>{
                toast.success(res.data.message)
                initialDataLoad()
                setOpenModal(false);
            }).catch((err)=>{
                toast.error(err.response.data.message)
            })
        }
    }
      }
  return (
    <div className={Styles.container}>
    <h1 className="text-2xl font-bold mb-4">My FeedBacks</h1>
        <FeedbackManagementTable2 feedbacks={feedbacks} handleRequest={handleRequest} generateReport={{}}/>
        <FeedbackModal
                open={openModal}
                handleClose={handleCloseModal}
                FeedbackForm={feedbackForm}
                mode={mode}
                onInputHandleChange={onInputHandleChange}
                helperText={helperText}
                handleInputFocus={handleInputFocus} 
                HandleBtnResponse={HandleBtnResponse}
            />
    </div>
  )
}

export default MyFeedBacks