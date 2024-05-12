import React from 'react';
import { Modal, Button, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Styles from './DiscountModal.module.scss'; // Ensure you have this SCSS file
import { StyledTextField } from '../../assets/theme/theme';
import {theme} from '../../assets/theme/theme';
const DiscountModal = ({ open, handleClose, discountForm, handleChange,handleInputFocus,helperText,HandleAddDiscount }) => {

    const {promoCode,discountPercentage,disEndDate,disStartDate}=discountForm


 
    return (
        <Modal
            open={open}
            onClose={handleClose}
            className={Styles.modalContainer}
        >
            <div className={Styles.modalContent}>
                <div className={Styles.modalHeader}>
                    <h2 className={Styles.modalTitle}>Add Discount</h2>
                    <Button onClick={handleClose}>Close</Button>
                </div>
                <div className={Styles.modalBody}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <StyledTextField
                            theme={theme}
                                fullWidth
                                label="Promo Code"
                                variant="outlined"
                                error={!!promoCode.error}
                                disabled={promoCode.disable}
                                helperText={helperText && promoCode.error}
                                value={promoCode.value}
                                onFocus={() => handleInputFocus('promoCode', 'GI')}
                                onChange={(e) => handleChange('promoCode', e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Discount Percentage"
                                variant="outlined"
                                type="number"
                                value={discountPercentage.value}
                                onFocus={() => handleInputFocus('discountPercentage', 'GI')}
                                onChange={(e) => {
                                    const value = Math.max(0, Math.min(100, Number(e.target.value)));
                                    handleChange('discountPercentage', value);
                                }}
                                inputProps={{ min: "0", max: "100", step: "1" }} // HTML validation to ensure the input is between 0 and 100
                            />
                        </Grid>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    label="Discount Start Date"
                                    value={dayjs(disStartDate.value)}
                                    onFocus={() => handleInputFocus('disStartDate', 'GI')}

                                    onChange={(newValue) => handleChange('disStartDate', newValue)}
                                    renderInput={(params) => <StyledTextField      theme={theme} {...params} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DatePicker
                                    label="Discount End Date"
                                    value={dayjs(disEndDate.value)}
                                    onFocus={() => handleInputFocus('disEndDate', 'GI')}

                                    onChange={(newValue) => handleChange('disEndDate', newValue)}
                                    renderInput={(params) => <StyledTextField       theme={theme}{...params} />}
                                />
                            </Grid>
                        </LocalizationProvider>
                        <Grid item xs={12}>
                            <Button
                                className={Styles.Btn}
                                variant="contained"
                                color="primary"
                                onClick={() => HandleAddDiscount()}
                            >
                                Save Discount
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Modal>
    );
};

export default DiscountModal;
