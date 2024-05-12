import React from 'react';
import { Modal, Button, Grid, Rating } from '@mui/material';
import { StyledTextField, theme } from '../../assets/theme/theme';
import Styles from './FeedbackModal.module.scss';
import { SCREEN_MODES } from '../../utilities/app.constants';

const FeedbackModal = ({ open, handleClose, FeedbackForm, handleInputFocus, helperText, onInputHandleChange, HandleBtnResponse, mode }) => {
    const { name, email, responsibility, friendliness, creativity, reliability, overallSatisfaction, comments } = FeedbackForm;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={Styles.modalContainer}
        >
            <div className={Styles.modalContent}>
                <div className={Styles.modalHeader}>
                    <h2 className={Styles.modalTitle}>Feedback</h2>
                    <span className={Styles.modalCloseButton} onClick={handleClose}>X</span>
                </div>
                <div className={Styles.modalBody}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Name"
                                placeholder="Enter Name"
                                size="small"
                                value={name.value}
                                error={!!name.error}
                                disabled={name.disable}
                                required={name.isRequired}
                                helperText={helperText && name.error}
                                onFocus={() => handleInputFocus('name', 'GI')}
                                onChange={(event) => onInputHandleChange('name', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Email"
                                placeholder="Enter Email"
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
                            <Rating
                                name="responsibility"
                                value={Number(responsibility.value)}
                                onChange={(event, newValue) => {
                                    onInputHandleChange('responsibility', newValue);
                                }}
                                disabled={responsibility.disable}
                                size="large"
                                sx={{
                                    "& .MuiRating-icon": {
                                        fontSize: "1.5rem",  // Adjust size as needed
                                    }
                                }}
                            />
                            <div className={Styles.ratingLabel}>Responsibility ({responsibility.value || 0}/5)</div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Rating
                                name="friendliness"
                                value={Number(friendliness.value)}
                                onChange={(event, newValue) => {
                                    onInputHandleChange('friendliness', newValue);
                                }}
                                disabled={friendliness.disable}
                                size="large"
                                sx={{
                                    "& .MuiRating-icon": {
                                        fontSize: "1.5rem",  // Adjust size as needed
                                    }
                                }}
                            />
                            <div className={Styles.ratingLabel}>Friendliness ({friendliness.value || 0}/5)</div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Rating
                                name="creativity"
                                value={Number(creativity.value)}
                                onChange={(event, newValue) => {
                                    onInputHandleChange('creativity', newValue);
                                }}
                                sx={{
                                    "& .MuiRating-icon": {
                                        fontSize: "1.5rem",  // Adjust size as needed
                                    }
                                }}
                                disabled={creativity.disable}
                                size="large"
                            />
                            <div className={Styles.ratingLabel}>Creativity ({creativity.value || 0}/5)</div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Rating
                                name="reliability"
                                value={Number(reliability.value)}
                                onChange={(event, newValue) => {
                                    onInputHandleChange('reliability', newValue);
                                }}
                                disabled={reliability.disable}
                                size="large"
                                sx={{
                                    "& .MuiRating-icon": {
                                        fontSize: "1.5rem",  // Adjust size as needed
                                    }
                                }}
                            />
                            <div className={Styles.ratingLabel}>Reliability ({reliability.value || 0}/5)</div>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Rating
                                name="overallSatisfaction"
                                value={Number(overallSatisfaction.value)}
                                onChange={(event, newValue) => {
                                    onInputHandleChange('overallSatisfaction', newValue);
                                }}
                                disabled={overallSatisfaction.disable}
                                sx={{
                                    "& .MuiRating-icon": {
                                        fontSize: "1.5rem",  // Adjust size as needed
                                    }
                                }}
                                size="large"
                            />
                            <div className={Styles.ratingLabel}>Overall Satisfaction ({overallSatisfaction.value || 0}/5)</div>
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Comments"
                                placeholder="Enter any comments"
                                multiline
                                rows={4}
                                value={comments.value}
                                error={!!comments.error}
                                disabled={comments.disable}
                                helperText={helperText && comments.error}
                                onFocus={() => handleInputFocus('comments', 'GI')}
                                onChange={(event) => onInputHandleChange('comments', event.target.value)}
                            />
                        </Grid>
                        <Grid container justifyContent="flex-end" item xs={12}>
                            {mode && mode === SCREEN_MODES.CREATE && <Button className={Styles.Btn} onClick={() => HandleBtnResponse(SCREEN_MODES.CREATE)}>Submit Feedback</Button>}
                            {mode && mode === SCREEN_MODES.EDIT  && <Button className={Styles.Btn} onClick={() => HandleBtnResponse(SCREEN_MODES.EDIT)}>Update Feedback</Button>}
                            <Button className={Styles.CBtn} onClick={handleClose}>Cancel</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Modal>
    );
};

export default FeedbackModal;
