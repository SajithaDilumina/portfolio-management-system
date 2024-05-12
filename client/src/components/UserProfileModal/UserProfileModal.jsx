import React from 'react';
import { Modal,Button } from '@mui/material';
import Styles from './UserProfileModal.module.scss';
import { Grid } from '@mui/material'
import { StyledTextField, theme } from '../../assets/theme/theme' // Import theme here
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { SCREEN_MODES } from '../../utilities/app.constants';
const UserProfileModal = ({ open, handleClose, UserForm,handleInputFocus,helperText,onInputHandleChange,HandleBtnResponse,mode }) => {
    console.log("UserForm", UserForm);
    const email = UserForm.email;
    const password = UserForm.password;
    const fullName = UserForm.fullName;
    const dob = UserForm.dob;
    const address = UserForm.address;
    const country = UserForm.country;
    const jobCategory = UserForm.jobCategory;
    const mobile = UserForm.mobile;
    const role = UserForm.role;


    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={Styles.modalContainer}

        >
            <div className={Styles.modalContent} >
                <div className={Styles.modalHeader}>
                    <h2 className={Styles.modalTitle}>User Profile</h2>
                    <span className={Styles.modalCloseButton} onClick={handleClose}>X</span>
                </div>
                <div className={Styles.modalBody}>
                <Grid container spacing={4}>
         
         <Grid item xs={12} md={12}>
           <StyledTextField
             theme={theme} // Pass the theme object here
             fullWidth
             label="Full Name"
             placeholder="Enter User Full Name"
             size="small"
             value={fullName.value}
             error={!!fullName.error}
             disabled={fullName.disable}
             required={fullName.isRequired}
             helperText={helperText && fullName.error}
             onFocus={() => handleInputFocus('fullName', 'GI')}
             onChange={(event) => onInputHandleChange('fullName', event.target.value)}
           />
         </Grid>
         <Grid item xs={12} md={6}>
           <StyledTextField
             theme={theme} // Pass the theme object here
             fullWidth
             label="User Email"
             placeholder="Enter User Email"
             size="small"
             value={email.value}
             error={!!email.error}
             disabled={email.disable}
             required={email.isRequired}
             helperText={helperText && email.error}
             onFocus={() => handleInputFocus('email', 'GI')}
             onChange={(event) => onInputHandleChange('email', event.target.value)}
           />
         </Grid>
         
         <Grid item xs={12} md={6}>
           <StyledTextField
             theme={theme} // Pass the theme object here
             fullWidth
             label="Mobile Number"
             placeholder="Enter Mobile Number"
             size="small"
             value={mobile.value}
             error={!!mobile.error}
             disabled={mobile.disable}
             required={mobile.isRequired}
             helperText={helperText && mobile.error}
             onFocus={() => handleInputFocus('mobile', 'GI')}
             onChange={(event) => onInputHandleChange('mobile', event.target.value)}
           />
         </Grid>
         <Grid item xs={12} md={12}>
           <StyledTextField
             theme={theme} // Pass the theme object here
             fullWidth
             label="Address"        
             placeholder="Enter Address"
             size="small"
             value={address.value}
             error={!!address.error}
             disabled={address.disable}
             required={address.isRequired}
             helperText={helperText && address.error}
             onFocus={() => handleInputFocus('address', 'GI')}
             onChange={(event) => onInputHandleChange('address', event.target.value)}
           />
         </Grid>
         <Grid item xs={12} md={6}>
           <StyledTextField
             theme={theme} // Pass the theme object here
             fullWidth
             label="Country"
             placeholder="Enter Country"
             size="small"
             value={country.value}
             error={!!country.error}
             disabled={country.disable}
             required={country.isRequired}
             helperText={helperText && country.error}
             onFocus={() => handleInputFocus('country', 'GI')}
             onChange={(event) => onInputHandleChange('country', event.target.value)}
           />
         </Grid>
         
         <Grid item xs={12} md={6}>
           <StyledTextField
             theme={theme} // Pass the theme object here
             fullWidth
             label="job Category"        
             placeholder="Enter job Category"
             size="small"
             value={jobCategory.value}
             error={!!jobCategory.error}
             disabled={jobCategory.disable}
             required={jobCategory.isRequired}
             helperText={helperText && jobCategory.error}
             onFocus={() => handleInputFocus('jobCategory', 'GI')}
             onChange={(event) => onInputHandleChange('jobCategory', event.target.value)}
           />
         </Grid>
         {/* <Grid item xs={12} md={6}>
           <StyledTextField
             theme={theme} // Pass the theme object here
             fullWidth
             label="password"
             placeholder="Enter password"
             size="small"
             value={password.value}
             error={!!password.error}
             disabled={password.disable}
             required={password.isRequired}
             helperText={helperText && password.error}
             onFocus={() => handleInputFocus('password', 'GI')}
             onChange={(event) => onInputHandleChange('password', event.target.value)}
           />
         </Grid> */}
         <Grid item xs={12} md={6}>
           <StyledTextField
             theme={theme} // Pass the theme object here
             fullWidth
             label="Role" 
             placeholder="Enter Role" 
             size="small"
             value={role.value}
             error={!!role.error}
             disabled={role.disable}
             required={role.isRequired}
             helperText={helperText && role.error}
             onFocus={() => handleInputFocus('role', 'GI')}
             onChange={(event) => onInputHandleChange('role', event.target.value.toUpperCase())}
           />
         </Grid>
         
         <Grid item xs={12} md={12}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DatePicker
           label="Date OF Birth"
           value={new moment(dob.value)}
           onChange={(newValue) => onInputHandleChange('dob', newValue)}
           textField={(params) => (
             <StyledTextField
               {...params}
               theme={theme}
               fullWidth
               size="small"
               error={!!dob.error}
               disabled={dob.disable}
               required={dob.isRequired}
               helperText={helperText && dob.error}
               onFocus={() => handleInputFocus('dob', 'GI')}
             />
             
           )}
         />
       </LocalizationProvider>
     </Grid>
     <Grid container justifyContent="flex-end" item xs={12} md={12}>
        {mode&& mode===SCREEN_MODES.CREATE && <Button className={Styles.Btn} onClick={()=>{HandleBtnResponse(SCREEN_MODES.CREATE)}}>Add New User</Button>}
        {mode&& mode===SCREEN_MODES.EDIT &&     <Button className={Styles.Btn} onClick={()=>{HandleBtnResponse(SCREEN_MODES.EDIT)}}>Update User</Button>}
        <Button className={Styles.CBtn}onClick={()=>{handleClose()}}>Cancel</Button>
    </Grid>
       </Grid>
       
                </div>
            </div>
        </Modal>
    );
};

export default UserProfileModal;
