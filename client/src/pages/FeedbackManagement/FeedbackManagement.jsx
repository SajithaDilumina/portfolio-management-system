import React,{useState,useEffect} from 'react'
import FeedbackManagementTable from '../../components/FeedbackManagementTable/FeedbackManagementTable'
import { SCREEN_MODES } from '../../utilities/app.constants'    
import { useNavigate } from 'react-router-dom';
import { FeedBackService } from '../../Services/feedBack.Service';
import { toast } from 'react-toastify';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';
import {backgrounds} from '../../assets/Images/index'
const FeedbackManagement = () => {
    const [feedbacks, setFeedbacks] = useState([ ]);

    useEffect(() => {
        initialDataLoad()

    }, []);
    const initialDataLoad=(async()=>{
        FeedBackService.getAllFeedBack().then((res)=>{
            setFeedbacks(res.data)
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    })



    const handleRequest = (mode, feedbackId,detailId) => {
    if(mode === SCREEN_MODES.DELETE){
        FeedBackService.deleteSpecificFeedBack(feedbackId,detailId).then((res)=>{
            toast.success(res.data.message)
            initialDataLoad()
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }
    }


    const styles = StyleSheet.create({
        page: {
          flexDirection: 'column',
          backgroundColor: 'transparent', // Set background color to transparent
        
        },
        content: {
          position: 'relative', // Set position to relative to allow positioning of other elements
        },
        header: {
          fontSize: 24,
          textAlign: 'center',
          color: 'white',
          marginBottom: 10,
        },
        subtitle: {
          fontSize: 18,
          textAlign: 'left',
          color: 'white',
          padding: 5,
          marginBottom: 10,
        },
        tableContainer: {
          marginTop: 10,
        },
        table: {
           marginHorizontal: 10,
          display: 'table',
          width: 'auto',
          backgroundColor: 'white',
          marginBottom: 50,
        },
        tableRow: {
          flexDirection: 'row',
          backgroundColor: '#5aa6bd',
          borderBottomWidth: 1,
        },
        tableHeader: {
          width: '25%',
          padding: 5,
          backgroundColor: '#418ca3',
          textAlign: 'left',
          fontWeight: '700',
          fontSize: 13,

        },
        tableCell: {
         fontSize: 12,
          width: '25%',
          padding: 5,
          textAlign: 'left',
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
          details:{
            alignItems:'flex-start',
            display: 'flex',
          },
        tableSubtitle:{
            fontSize: 18,
            textAlign: 'center',
            color: 'white',
        }
      });
      
    const MyDocument = ({ data }) => (
        <Document>
          <Page size="A4" style={styles.page}>
          <View style={styles.container}>
            <Image src={backgrounds} style={styles.pageBackground} />
            <View style={styles.content}>
              <Text style={styles.header}>FeedBack Report</Text>
           
              <View style={styles.details}>
                    <Text style={styles.subtitle}>Total Post Count: {data.totalPosts}</Text>
                    <Text style={styles.subtitle}>Total Post with Feedbacks: {data.postWithFeedback}</Text>
                    <Text style={styles.subtitle}>Total Feedbacks: {data.feedbacks.reduce((total, element) => total + element.count, 0)}</Text>
                  </View>
                {/* Table */}
              <View style={styles.tableContainer}>
              <Text style={styles.tableSubtitle}>Feedback Summary For Individual Post</Text>
                <View style={styles.table}>
                  {/* Table Header */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Portfolio Name</Text>
                    <Text style={styles.tableHeader}>Avg. Responsibility</Text>
                    <Text style={styles.tableHeader}>Avg. Friendliness</Text>
                    <Text style={styles.tableHeader}>Avg. Creativity</Text>
                    <Text style={styles.tableHeader}>Avg. Reliability</Text>
                    <Text style={styles.tableHeader}>Avg. Overall Satisfaction</Text>
                    <Text style={styles.tableHeader}>Feedback Count</Text>
                </View>
                  {/* Table Body */}
                  {data.feedbacks.map((feedback, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{feedback.portfolioName}</Text>
                  <Text style={styles.tableCell}>{feedback.averageResponsibility.toFixed(1)}</Text>
                  <Text style={styles.tableCell}>{feedback.averageFriendliness.toFixed(1)}</Text>
                  <Text style={styles.tableCell}>{feedback.averageCreativity.toFixed(1)}</Text>
                  <Text style={styles.tableCell}>{feedback.averageReliability.toFixed(1)}</Text>
                  <Text style={styles.tableCell}>{feedback.averageOverallSatisfaction.toFixed(1)}</Text>
                  <Text style={styles.tableCell}>{feedback.count}</Text>
                </View>
              ))}
                </View>
              </View>
            </View>
            </View>
          </Page>
        </Document>
      );
    
    const generateReport = () => {
    FeedBackService.generateFeedbackReport().then(async (res)=>{
    console.log(res.data)
    if(res.status === 200){
        const data = res.data;
        const blob = await pdf(<MyDocument data={data} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'UserReport.pdf');
        document.body.appendChild(link);
        link.click();
        
        if(link.parentNode) link.parentNode.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success("Report Generated Successfully")
    }

    toast.success("Report Generated Successfully")
    }).catch((err)=>{
        toast.error(err.response.data.message)
    })
    }
  return (
    <div className="ml-64 mt-8 px-4">
    <h1 className="text-2xl font-bold mb-4">FeedBack Management</h1>

    <FeedbackManagementTable feedbacks={feedbacks} handleRequest={handleRequest} generateReport={generateReport}/>
    
    
</div>
  )
}

export default FeedbackManagement