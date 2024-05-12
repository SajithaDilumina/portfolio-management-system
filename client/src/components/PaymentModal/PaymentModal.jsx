import React,{useState} from 'react';
import { Modal, Button, Grid ,Typography} from '@mui/material';
import Styles from './PaymentModal.module.scss';
import { StyledTextField, theme } from '../../assets/theme/theme'; // Assume theme is imported as in your example
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { toast } from 'react-toastify';
import LinearProgress from '@mui/material/LinearProgress';
import upload from '../../utilities/upload';
import { SCREEN_MODES } from '../../utilities/app.constants';
const PaymentModal = ({ mode,open, handleClose, paymentForm, handleInputFocus, helperText, onInputHandleChange, handlePaymentSubmit  }) => {
    const [file, setFile] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const  [promoCodeValid, setPromoCodeValid] = useState(false);

const applyPromoCode=()=>{
    if(promoCode){
        if(promoCode === paymentForm.promoCode.value){
            onInputHandleChange('amount', paymentForm.postAmount.value - (paymentForm.postAmount.value * paymentForm.discountPercentage.value/100));
            toast.success('Promo code applied successfully');
            setPromoCodeValid(true)
        }else{
            toast.error('Promo code is not valid');
            setPromoCodeValid(false)
        }
      
        }else{
            toast.error('Please enter promo code');
            setPromoCodeValid(false)
        }

}


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
                onInputHandleChange('bankSlipUrl', response); 
                setIsLoading(false);
            } catch (error) {
                toast.error('Error uploading file: ' + error.message);
                console.error('Error uploading file: ', error);
                onInputHandleChange('bankSlipUrl', '');
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
            <div className={Styles.modalContent} style={{
        maxHeight: '95vh', // Maximum height to ensure it doesn't overflow the viewport
        overflowY: 'auto' // Scroll inside modal if content is too long
    }}>
                <div className={Styles.modalHeader}>
                    <h2 className={Styles.modalTitle}>Payment Details</h2>
                    <span className={Styles.modalCloseButton} onClick={handleClose}>X</span>
                </div>
                <div className={Styles.modalBody}>
            {mode !== SCREEN_MODES.EDIT && (
                <>
                 <Typography variant="h6" sx={{fontWeight:"bold"}} gutterBottom>
                        Discount Details
                    </Typography>
                    <Grid container spacing={2} sx={{marginTop:"1rem"}}>
                        <Grid item xs={12} md={6}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Post Amount"
                                placeholder="Enter Post Amount"
                                size="small"
                                value={paymentForm.postAmount?.value}
                                disabled={paymentForm.postAmount.disabled}
                                error={!!paymentForm.postAmount.error}
                                helperText={helperText && paymentForm.postAmount.error}
                                onFocus={() => handleInputFocus('postAmount')}
                                
                                // onChange={(event) => onInputHandleChange('postAmount', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Discount Percentage %"
                                placeholder="Enter Discount Percentage"
                                size="small"
                                
                                disabled={paymentForm.discountPercentage?.disabled}
                                value={paymentForm.discountPercentage?.value}
                                error={!!paymentForm.discountPercentage.error}
                                helperText={helperText && paymentForm.discountPercentage.error}
                                onFocus={() => handleInputFocus('discountPercentage')}
                                // onChange={(event) => onInputHandleChange('discountPercentage', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                                 <StyledTextField
                                 label="Discount Start Date"
                                           value={paymentForm.disStartDate?.value}
                                            theme={theme}
                                            fullWidth
                                            size="small"
                                            disabled={paymentForm.disStartDate.disabled}
                                            error={!!paymentForm.disStartDate.error}
                                            helperText={helperText && paymentForm.disStartDate.error}
                                            onFocus={() => handleInputFocus('disStartDate')}
                                        />
                        </Grid>
                        <Grid item xs={12} md={6}>
                                    <StyledTextField
                                    label="Discount End Date"
                                        value={paymentForm.disEndDate?.value}
                                            theme={theme}
                                            fullWidth
                                            size="small"
                                            disabled={paymentForm.disEndDate.disabled}
                                            error={!!paymentForm.disEndDate.error}
                                            helperText={helperText && paymentForm.disEndDate.error}
                                            onFocus={() => handleInputFocus('disEndDate')}
                                        />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Promo Code"
                                placeholder="Enter Promo Code"
                                size="small"
                                value={promoCode}
                                // error={!!paymentForm.promoCode.error}
                                // required={false}
                                // helperText={helperText && paymentForm.promoCode.error}
                                onFocus={() => handleInputFocus('promoCode')}
                                onChange={(event) => { setPromoCode(event.target.value)}}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                        <Button className={Styles.Btn} onClick={applyPromoCode} disabled={promoCodeValid} >Apply PromoCode</Button>

                            </Grid>
                    </Grid>
                    </>
                )}
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#ccc', margin: '20px 0' }}></div>
                    <Typography variant="h6" sx={{fontWeight:"bold"}} gutterBottom>
                        Please Fill Below Payment Details
                    </Typography>
                    <Grid container spacing={4} sx={{marginTop:"1rem"}}>
                        
                        <Grid item xs={12} md={6}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Amount"
                                placeholder="Enter Amount"
                                size="small"
                                value={paymentForm.amount.value}
                                error={!!paymentForm.amount.error}
                                required={true}
                                helperText={helperText && paymentForm.amount.error}
                                onFocus={() => handleInputFocus('amount')}
                                onChange={(event) => onInputHandleChange('amount', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    value={new moment(paymentForm.date.value)}
                                    onChange={(newValue) => onInputHandleChange('date', newValue)}
                                    renderInput={(params) => (
                                        <StyledTextField
                                            {...params}
                                            theme={theme}
                                            fullWidth
                                            size="small"
                                            error={!!paymentForm.date.error}
                                            required={true}
                                            helperText={helperText && paymentForm.date.error}
                                            onFocus={() => handleInputFocus('date')}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Bank"
                                placeholder="Enter Bank Name"
                                size="small"
                                value={paymentForm.bank.value}
                                error={!!paymentForm.bank.error}
                                required={true}
                                helperText={helperText && paymentForm.bank.error}
                                onFocus={() => handleInputFocus('bank')}
                                onChange={(event) => onInputHandleChange('bank', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Branch"
                                placeholder="Enter Branch Name"
                                size="small"
                                value={paymentForm.branch.value}
                                error={!!paymentForm.branch.error}
                                required={true}
                                helperText={helperText && paymentForm.branch.error}
                                onFocus={() => handleInputFocus('branch')}
                                onChange={(event) => onInputHandleChange('branch', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <StyledTextField
                                theme={theme}
                                    fullWidth
                                    id="content-upload"
                                    type="file"
                                    onChange={handleFileChange}
                                    onFocus={() => handleInputFocus('slipUrl')}
                                />
                          {isloading && <LinearProgress />}
                        </Grid>
                        <Grid item xs={3}>
                           <Button className={Styles.Btn} onClick={handleFileUpload} disabled={isDisable} >  Upload Slip File</Button>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <StyledTextField
                                theme={theme}
                                fullWidth
                                label="Remark"
                                placeholder="Enter Remark"
                                size="small"
                                value={paymentForm.remark.value}
                                error={!!paymentForm.remark.error}
                                required={true}
                                helperText={helperText && paymentForm.remark.error}
                                onFocus={() => handleInputFocus('remark')}
                                onChange={(event) => onInputHandleChange('remark', event.target.value)}
                            />
                        </Grid>
                        <Grid container justifyContent="flex-end" item xs={12} md={12}>
                            <Button className={Styles.Btn} onClick={handlePaymentSubmit}>Submit Payment</Button>
                            <Button className={Styles.CBtn} onClick={handleClose}>Cancel</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Modal>
        
    );
};

export default PaymentModal;
