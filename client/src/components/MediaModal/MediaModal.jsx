/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import React,{useState} from 'react';
import { Modal, Button, Grid, MenuItem, InputLabel, FormControl, Input, FormHelperText ,LinearProgress} from '@mui/material';
import { StyledTextField, theme } from '../../assets/theme/theme'; // Assuming these are styled components and theme from your project
import Styles from './MediaModal.module.scss'; // Your modal styles
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import upload from '../../utilities/upload';
import axios from 'axios';
import { toast } from 'react-toastify';

const MediaModal = ({ open, handleClose, mediaForm, handleInputFocus, helperText, onInputHandleChange, HandleBtnResponse, mode }) => {

        const [file, setFile] = useState(null);
        const [isDisable, setIsDisable] = useState(false);
        const [isloading, setIsLoading] = useState(false);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file){
           toast.error('No file selected');
        } else{
            setFile(file);
        }
    };
    const handleFileUpload = async () => {
        if(file){
        try {   setIsLoading(true);
                setIsDisable(true);
                const response = await upload(file);
                onInputHandleChange('content', response); 
                setIsLoading(false);
            } catch (error) {
                toast.error('Error uploading file: ' + error.message);
                console.error('Error uploading file: ', error);
                onInputHandleChange('content', '');
            }
        }else{
            toast.error('No file selected');
        }
      
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={Styles.modalContainer}
        >
            <div className={Styles.modalContent}>
                <div className={Styles.modalHeader}>
                    <h2 className={Styles.modalTitle}> Media Content</h2>
                    <span className={Styles.modalCloseButton} onClick={handleClose}>X</span>
                </div>
                <div className={Styles.modalBody}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Title"
                                placeholder="Enter Media Title"
                                size="small"
                                value={mediaForm.title.value}
                                error={!!mediaForm.title.error}
                                required={mediaForm.title.isRequired}
                                helperText={helperText && mediaForm.title.error}
                                onFocus={() => handleInputFocus('title', 'GI')}
                                onChange={(event) => onInputHandleChange('title', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Description"
                                placeholder="Enter Description"
                                size="small"
                                value={mediaForm.description.value}
                                multiline
                                rows={4}
                                error={!!mediaForm.description.error}
                                required={mediaForm.description.isRequired}
                                helperText={helperText && mediaForm.description.error}
                                onFocus={() => handleInputFocus('description', 'GI')}
                                onChange={(event) => onInputHandleChange('description', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField
                                select
                                theme={theme}
                                fullWidth
                                label="Type"
                                value={mediaForm.type.value}
                                error={!!mediaForm.type.error}
                                required={mediaForm.type.isRequired}
                                helperText={helperText && mediaForm.type.error}
                                onFocus={() => handleInputFocus('type', 'GI')}
                                onChange={(event) => onInputHandleChange('type', event.target.value)}
                            >
                                <MenuItem value="Image">Image</MenuItem>
                                <MenuItem value="Video">Video</MenuItem>
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField
                                select
                                theme={theme}
                                fullWidth
                                label="Category"
                                value={mediaForm.category.value}
                                error={!!mediaForm.category.error}
                                required={mediaForm.category.isRequired}
                                helperText={helperText && mediaForm.category.error}
                                onFocus={() => handleInputFocus('category', 'GI')}
                                onChange={(event) => onInputHandleChange('category', event.target.value)}
                            >
                                <MenuItem value="Blog">Blog</MenuItem>
                                <MenuItem value="YouTube">YouTube</MenuItem>
                                <MenuItem value="Photography">Photography</MenuItem>
                            </StyledTextField>
                        </Grid>
                        <Grid item xs={9}>
                            <StyledTextField
                                theme={theme}
                                    fullWidth
                                    id="content-upload"
                                    type="file"
                                    onChange={handleFileChange}
                                    onFocus={() => handleInputFocus('content')}
                                />
                          {isloading && <LinearProgress />}
                        </Grid>
                        <Grid item xs={3}>
                           <Button className={Styles.upload} onClick={handleFileUpload} disabled={isDisable} >  Upload File</Button>
                        </Grid>
                        <Grid container justifyContent="flex-end" item xs={12}>
                            {mode && mode === 'CREATE' && <Button className={Styles.Btn} onClick={() => {HandleBtnResponse('CREATE'),setIsDisable(false)}}>Add Media</Button>}
                            {mode && mode === 'EDIT' && <Button className={Styles.Btn} onClick={() => {HandleBtnResponse('EDIT'),setIsDisable(false)}}>Update Media</Button>}
                            <Button className={Styles.CBtn} onClick={handleClose}>Cancel</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Modal>
    );
};

export default MediaModal;
