  /* eslint-disable no-unused-expressions */
  import React from 'react'
  import Styles from './FeedbackUserView.module.scss'
  import RadialBarChart from '../../components/RadialBarChart/RadialBarChart'
  import { useEffect } from 'react'
  import { useNavigate, useParams } from "react-router-dom";
  import { FeedBackService } from '../../Services/feedBack.Service'
  import { toast } from 'react-toastify'
  import { Grid } from '@mui/material'
  import PortfolioCard from '../../components/PortfolioCard/PortfolioCard'
  import FeedbackCard from '../../components/FeedbackCard/FeedbackCard'
  import FeedbackModal from '../../components/FeedbackModal/FeedbackModal'
  import { useState } from 'react'
  import { validateFormData } from '../../helper/index'
import { max } from 'moment';
  const FeedbackUserView = () => {
    const [averageRatings, setAverageRatings] = React.useState({
      averageResponsibility: 0,
      averageFriendliness: 0,
      averageCreativity: 0,
      averageReliability: 0,
      averageOverallSatisfaction: 0
    })


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
    const [postDetails, setPostDetails] = React.useState({})
    const [feedbackDetails, setFeedbackDetails] = React.useState([])
    const [feedbackForm, setFeedbackForm] = useState(INITIAL_FEEDBACK_FORM);
    const [openModal, setOpenModal] = useState(false);
    const [helperText, setHelperText] = useState(true);
    const [mode, setMode] = useState(null);
   
    const { id,userID } = useParams(); 
    useEffect(() => {
      
      getInitialData()
    }, [])
    

    const getInitialData = () => {
   
      const postID= id
    
    FeedBackService.getAverageRatingsForPost(postID).then((response) => {

      if(response.data){
        const scaledRatings = {
          averageResponsibility: response.data.averageResponsibility * 20, // scale from 1-5 to 0-100
          averageFriendliness: response.data.averageFriendliness * 20,
          averageCreativity: response.data.averageCreativity * 20,
          averageReliability: response.data.averageReliability * 20,
          averageOverallSatisfaction: response.data.averageOverallSatisfaction * 20
        };
        setAverageRatings(scaledRatings);
      }
    }).catch((error) => {
      toast.error(error)
    })

FeedBackService.getPostDetailsAndFeedback(postID).then((response) => {
  if(response.data){
    setPostDetails(response.data.post);
    setFeedbackDetails(response.data.feedbacks[0].feedbackDetails);
  }
}).catch((error) => {
      toast.error(error)
})

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
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  if(isValid){
    const postID= id
 const payload={
  postID: postID,
  feedbackDetails:[{  
      name: feedbackForm.name.value,
      email: feedbackForm.email.value,
      responsibility: feedbackForm.responsibility.value,
      friendliness: feedbackForm.friendliness.value,
      creativity: feedbackForm.creativity.value,
      reliability: feedbackForm.reliability.value,
      overallSatisfaction: feedbackForm.overallSatisfaction.value,
      comments: feedbackForm.comments.value,
      FeedBackedUserID: user._id}
      
    ],
    
 }
    FeedBackService.addFeedBack(payload).then((res)=>{
      toast.success(res.data.message)
      getInitialData()
      setOpenModal(false);
      setFeedbackForm(INITIAL_FEEDBACK_FORM);
  }).catch((err)=>{
      toast.error(err.response.data.message)
  })
  }else{
    toast.error("Please fill all the required fields")
  }
}

const handleRequest = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  setFeedbackForm({
    ...feedbackForm,
    name: { ...feedbackForm.name, value: user.fullName},
    email: { ...feedbackForm.email, value: user.email}
  });
  
  setMode("CREATE");
  setOpenModal(true);

}
    return (
      <div className={Styles.container}>
        <Grid container spacing={2}>
        <Grid item xs={12} md={2} >
        <section className={Styles.FeedbackUserView}>
           <PortfolioCard data={postDetails} handleRequest={handleRequest}/>
          </section>
        </Grid>
        <Grid item xs={12} md={10}>
        <Grid item xs={12} md={12} sx={{ background:"white",margin:"1rem"}}>
        <section className={Styles.RadialBarChart}>
        <Grid item xs={12} md={2} sx={{ background:"white",margin:"1rem"}}>
        <RadialBarChart rating={averageRatings.averageResponsibility} label="Responsibility" />
        </Grid>
        <Grid item xs={12} md={2} sx={{ background:"white",margin:"1rem"}}>
        <RadialBarChart rating={averageRatings.averageFriendliness} label="Friendliness" />
        </Grid>
        <Grid item xs={12} md={2} sx={{ background:"white",margin:"1rem"}}>
        <RadialBarChart rating={averageRatings.averageCreativity} label="Creativity" />
        </Grid>
        <Grid item xs={12} md={2} sx={{ background:"white",margin:"1rem"}}>
        <RadialBarChart rating={averageRatings.averageReliability} label="Reliability" />
        </Grid>
        <Grid item xs={12} md={2} sx={{ background:"white",margin:"1rem"}}>
        <RadialBarChart rating={averageRatings.averageOverallSatisfaction} label="Overall Satisfaction" />
        </Grid>
         </section>   
        </Grid>
        <Grid item xs={12} md={12} sx={{ background:"white",margin:"1rem"}} >
                    <Grid container spacing={2}>
                        {feedbackDetails.map((feedback, index) => (
                            <Grid item xs={6} key={index}>
                                <FeedbackCard feedback={feedback} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
        </Grid>
        </Grid>


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

  export default FeedbackUserView