import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import PaymentTable from '../../components/PaymentTable/PaymentTable'
import { PaymentService } from '../../Services/Payment.Service';
import { toast } from 'react-toastify';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';
import {backgrounds} from '../../assets/Images/index'
const PaymentManagement = () => {
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        initialData()
    }, [])
    
    const initialData=()=>{
        PaymentService.getAllPayments().then((res)=>{
            console.log("res",res.data)
            setPayments(res.data);
        }).catch((error)=>{
            console.error("Error fetching payments:",error);
        });
    }
    const handleRequest=(mode,payment)=>{
        console.log("first",mode,payment)
        // if(mode===SCREEN_MODES.CREATE){
        //     navigate('/reservations')
        //     // setPaymentForm(INITIAL_PAYMENT_FORM);
        //     // setMode(SCREEN_MODES.CREATE);
        //     // setOpenModal(true);
        // }
        // if(mode===SCREEN_MODES.EDIT){
        //     PaymentService.getPaymentDetailsById(payment).then((res)=>{
        //         console.log("res",res.data)
        //         setPaymentForm({...PaymentForm,
        //             _id: { value: res.data._id, isRequired: true, disable: false, readonly: false, validator: "null", error: "", },
        //             amount: { value: res.data.amount, isRequired: true, disable: false, readonly: false, validator: "number", error: "", },
        //             date: { value: res.data.date, isRequired: true, disable: false, readonly: false, validator: "date", error: "", },
        //             bank: { value: res.data.bank, isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        //             branch: { value: res.data.branch, isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
        //             remark: { value: res.data.remark, isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
        //             reservationId: { value: res.data.reservationId, isRequired: true, disable: false, readonly: false, validator: "null", error: "", },
        //             ServiceProviderId: { value: res.data.ServiceProviderId, isRequired: true, disable: false, readonly: false, validator: "null", error: "", },
        //             bankSlipUrl: { value: res.data.bankSlipUrl, isRequired: true, disable: false, readonly: false, validator: "null", error: "", },
        //             UserId: { value: res.data.UserId, isRequired: true, disable: false, readonly: false, validator: "null", error: "", },
        //             promoCode:{ value: res.data.promoCode, isRequired: false, disable: true, readonly: true, validator: "null", error: "", },
        //             postAmount:{ value: res.data.postAmount, isRequired: false, disable: true, readonly: true, validator: "null", error: "", },
                    
                    
        //         });
    
        //     }).catch((error)=>{
        //         console.error("Error fetching payment:",error);
        //         toast.error("Error fetching payment");
        //     });
        //     setMode(SCREEN_MODES.EDIT);
        //     setOpenModal(true);
        // }
    
        // if(mode===SCREEN_MODES.DELETE){
        //     PaymentService.deletePayment(payment).then((res)=>{
        //         console.log("Payment deleted successfully",res.data);
        //         toast.success("Payment deleted successfully");
        //         initialData();
        //     }).catch((error)=>{
        //         console.error("Error deleting payment:",error);
        //         toast.error("Error deleting payment");
        //     });
        // }
    
    }



// Define your styles outside of the component for better performance
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'transparent',
    },
    content: {
        position: 'relative',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: 'white',
    },
    tableContainer: {
        flexDirection: 'column',
        margin: 10,
    },
    tableHeader: {
      color: 'white',
      width: '25%',
      padding: 5,
      backgroundColor: '#418ca3',
      textAlign: 'left',
      fontWeight: '700',
      fontSize: 13,
    },
    tableRow: {
      flexDirection: 'row',
      backgroundColor: '#5aa6bd',
      borderBottomWidth: 1,
    },
    tableCell: {
      color: 'white',
      fontSize: 12,
       width: '25%',
       padding: 5,
       textAlign: 'left',
     },
    summarySection: {
        marginTop: 20,
        padding: 10,
        color: 'white',
    },
    pageBackground: {
      position: 'absolute',
      minWidth: '100%',
      minHeight: '100%',
      display: 'block',
      height: '100%',
      width: '100%',
      zIndex: -100, // Set z-index to make sure the background is behind other elements
  
    },
    container:{
      position: 'relative',
      minHeight: '100%',
    },
    tableSubtitle:{
      fontSize: 18,
      textAlign: 'center',
      color: 'white',
  },
  table: {
    marginHorizontal: 10,
   display: 'table',
   width: 'auto',
   backgroundColor: 'white',
   marginBottom: 50,
  },
  });
  
const ReportDocument = ({ data }) => (
  <Document>
    {Object.entries(data).map(([userId, userInfo]) => (
      <Page key={userId} size="A4" style={styles.page}>
        <View style={styles.container}>
          <Image src={backgrounds} style={styles.pageBackground} />
          <Text style={styles.header}>Payment Report for {userInfo.user.fullName}</Text>
          <View style={styles.summarySection}>
            <Text>Total Discount: {userInfo.totalDiscount.toFixed(2)}</Text>
            <Text>Total Amount Paid: {userInfo.totalAmountPaid.toFixed(2)}</Text>
            <Text>Payment Count: {userInfo.payments.length}</Text>
          </View>
          <View style={styles.tableContainer}>
            <Text style={styles.tableSubtitle}>Payment Details</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Amount</Text>
                <Text style={styles.tableHeader}>Date</Text>
                <Text style={styles.tableHeader}>Bank</Text>
                <Text style={styles.tableHeader}>Branch</Text>
                <Text style={styles.tableHeader}>Remark</Text>
              </View>
              {userInfo.payments.map((payment, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{payment.amount}</Text>
                  <Text style={styles.tableCell}>{new Date(payment.date).toLocaleDateString()}</Text>
                  <Text style={styles.tableCell}>{payment.bank}</Text>
                  <Text style={styles.tableCell}>{payment.branch}</Text>
                  <Text style={styles.tableCell}>{payment.remark}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    ))}
  </Document>
);

    const generateReport=async ()=>{
        PaymentService.getAdminReportData().then(async (res) => {
            console.log('res', res.data)
            try {
              const blob = await pdf(<ReportDocument data={res.data} />).toBlob();
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'PaymentReport.pdf');
              document.body.appendChild(link);
              link.click();
          
              // Cleanup: remove the link and revoke the URL
              link.parentNode.removeChild(link);
              URL.revokeObjectURL(url);
              toast.success("Report generated successfully");
            } catch (error) {
              toast.error("Error generating report: " + error.message);
            }
          }).catch((error) => {
            console.error("Error generating report:", error);
            toast.error("Error generating report");
          })

    }
  return (
    <div className="ml-64 mt-8 px-4">
    <h1 className="text-2xl font-bold mb-4">Payment Management</h1>
    <PaymentTable  payments={payments} handleRequest={handleRequest} generateReport={generateReport}/>
        </div>
  )
}

export default PaymentManagement