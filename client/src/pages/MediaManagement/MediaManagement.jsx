import React, { useState, useEffect } from 'react';
import MediaContentTable from '../../components/MediaContentTable/MediaContentTable';
import { MediaService } from '../../Services/Media.Service';
import { toast } from 'react-toastify';
import MediaModal from '../../components/MediaModal/MediaModal';
import { SCREEN_MODES } from '../../utilities/app.constants'; // Assuming SCREEN_MODES is used similarly here
import upload from '../../utilities/upload';
import { validateFormData } from '../../helper/FormValidators';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';
import {backgrounds} from '../../assets/Images/index'

const MediaManagement =  () => {
    const INITIAL_MEDIA_FORM = {
        _id: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "" },
        title: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
        description: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
        type: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
        category: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
        content: { value: "", isRequired: true, disable: false, readonly: false, validator: "null", error: "" },
    };

    const [media, setMedia] = useState([]);
    const [mediaForm, setMediaForm] = useState(INITIAL_MEDIA_FORM);
    const [openModal, setOpenModal] = useState(false);
    const [helperText, setHelperText] = useState(true);
    const [mode, setMode] = useState(null);

    useEffect(() => {
        fetchMedia();
    }, []);

    
    const fetchMedia = () => {
        MediaService.getAllMedia()
            .then(response => {
                if (response.status === 200) {
                    setMedia(response.data);
                } else {
                    toast.error("Failed to fetch media");
                }
            })
            .catch(error => {
                toast.error("Error fetching media: " + error.message);
            });
    };

    const handleRequest = (action, mediaId) => {
        console.log("Action:", action, "Media ID:", mediaId);
        setMode(action);
        if (action === SCREEN_MODES.CREATE) {
            setMediaForm(INITIAL_MEDIA_FORM);
            setOpenModal(true);
        } else if (action === SCREEN_MODES.EDIT && mediaId) {
            MediaService.GetMedia(mediaId)
                .then(response => {
                    if (response.status === 200) {
                        console.log("data", response.data)
                        setMediaForm({
                            _id: { value: response.data.media._id, isRequired: false, disable: false, readonly: true, validator: "text", error: "" },
                            title: { value: response.data.media.title, isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
                            description: { value: response.data.media.description, isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
                            type: { value: response.data.media.type, isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
                            category: { value: response.data.media.category, isRequired: true, disable: false, readonly: false, validator: "text", error: "" },
                            content: { value: response.data.media.content, isRequired: true, disable: false, readonly: false, validator: "null", error: "" },
                            
                        });
                        setOpenModal(true);
                    }
                })
                .catch(error => {
                    toast.error("Error fetching media details: " + error.message);
                });
        }else if(action === SCREEN_MODES.DELETE && mediaId){
            MediaService.DeleteMedia(mediaId).then((res) => {
                toast.success(res.data.message);
                fetchMedia();
            }).catch((error) => {
                toast.error(error)
            });
        }
    };

    const handleCloseModal = () => {
        setMediaForm(INITIAL_MEDIA_FORM);
        setOpenModal(false);
    };

    const handleInputFocus = (property) => {
        setMediaForm({
            ...mediaForm,
            [property]: {
                ...mediaForm[property],
                error: null,
            },
        });
    };

    const onInputHandleChange = (property, value) => {
        console.log("first", property, value)
        setMediaForm({
            ...mediaForm,
            [property]: {
                ...mediaForm[property],
                value: value,
            },
        });
    };

    const HandleBtnResponse = async(mode) => {
        setHelperText(true)
        if (mode === SCREEN_MODES.CREATE) {
            const [validateData, isValid] = await validateFormData(mediaForm);
            setMediaForm(validateData);
           
            if(isValid){
                const userString = localStorage.getItem('user');
                const user = JSON.parse(userString);
                const userId = user._id;

                const payload = {
                    userId:userId,
                    title: mediaForm.title.value,
                    description: mediaForm.description.value,
                    type: mediaForm.type.value,
                    category: mediaForm.category.value,
                    content: mediaForm.content.value,
                }
                MediaService.AddMedia(payload).then((res) => {
                    toast.success(res.data.message);
                    fetchMedia();
                    setOpenModal(false);
                    setMediaForm(INITIAL_MEDIA_FORM);
                }).catch((error) => {
                    toast.error(error)
                });
            }
            }
            if(mode === SCREEN_MODES.EDIT){
                const [validateData, isValid] = await validateFormData(mediaForm);
                setMediaForm(validateData);
                if(isValid){
                    const userString = localStorage.getItem('user');
                    const user = JSON.parse(userString);
                    const userId = user._id;
    
                    const payload = {
                        userId: userId,
                        title: mediaForm.title.value,
                        description: mediaForm.description.value,
                        type: mediaForm.type.value,
                        category: mediaForm.category.value,
                        content: mediaForm.content.value,
                    }
                    MediaService.UpdateMedia(mediaForm._id.value, payload).then((res) => {
                        toast.success(res.data.message);
                        fetchMedia();
                        setOpenModal(false);
                        setMediaForm(INITIAL_MEDIA_FORM);
                    }).catch((error) => {
                        toast.error(error)
                    });
                }
            }
        }       
        
    
const generateReport = () => {
    MediaService.getReportMedia().then(async (res) => {
        const blob = await pdf(<MediaReportDocument data={res.data.data} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'MediaContentReport.pdf');
        document.body.appendChild(link);
        link.click();
        
        // Cleanup: remove the link and revoke the URL
        link.parentNode.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success("Report generated successfully");
    }).catch((error) => {
        toast.error(error)
    });
}



const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'transparent', 
       
    },
    content: {
        position: 'relative', // Set position to relative to allow positioning of other elements
      },
    header: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: 'white', // Dark grey for better readability
    },
    tableContainer: {
        flexDirection: 'column',
        margin: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        backgroundColor: '#418ca3', // Light grey
        borderTopWidth: 2,
        borderRightWidth: 2,
        borderLeftWidth: 2,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        backgroundColor: '#5aa6bd',
    },
    tableCellHeader: {
        fontSize: 12,
        flex: 1,
        padding: 5,
        textAlign: 'left',
        fontWeight: '700',
        backgroundColor: '#418ca3',
    },
    tableCell: {
        fontSize: 10,
        flex: 1,
        padding: 5,
        textAlign: 'left',
        color: 'white',
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
      table: {
        marginHorizontal: 10,
       display: 'table',
       width: 'auto',
       backgroundColor: 'white',
       marginBottom: 50,
     },
     tableSubtitle:{
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    }
});



// PDF Document Component
const MediaReportDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
        <View style={styles.container}>  
            <Image src={backgrounds} style={styles.pageBackground} />
            <View style={styles.content}>
            <Text style={styles.header}>Media Content Report</Text>
            <View style={styles.summarySection}>
                <Text>Total Media: {data.totals.totalMedia}</Text>
                <Text>Total Likes: {data.totals.totalLikes}</Text>
                <Text>Total Dislikes: {data.totals.totalDislikes}</Text>
                <Text>Total Video Count: {data.totals.totalVideos}</Text>
                <Text>Total Image Count: {data.totals.totalImages}</Text>
           
                </View>
            <View style={styles.tableContainer}>
            <Text style={styles.tableSubtitle}> Individual Media Content Details  </Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableCellHeader, { flex: 2 }]}>Title</Text>
                    <Text style={[styles.tableCellHeader, { flex: 2 }]}>Description</Text>
                    <Text style={[styles.tableCellHeader, { flex: 2 }]}>Type</Text>
                    <Text style={styles.tableCellHeader}>Likes</Text>
                    <Text style={styles.tableCellHeader}>Dislikes</Text>
                </View>
                {data.mediaDetails.map(media => (
                    <View key={media._id} style={styles.tableRow}>
                        <Text style={[styles.tableCell, { flex: 2 }]}>{media.title}</Text>
                        <Text style={[styles.tableCell, { flex: 2 }]}>{media.description}</Text>
                        <Text style={[styles.tableCell, { flex: 2 }]}>{media.type}</Text>
                        <Text style={styles.tableCell}>{media.likeCount}</Text>
                        <Text style={styles.tableCell}>{media.dislikeCount}</Text>
                    </View>
                ))}
                 </View>

            </View>
                 <View style={styles.tableContainer}>
            <Text style={styles.tableSubtitle}>  Media Catagories Details  </Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={[styles.tableCellHeader, { flex: 2 }]}>Category</Text>
                    <Text style={[styles.tableCellHeader, { flex: 2 }]}>Count</Text>
               
                </View>
                {data.categoryDetails.map(Category => (
                    <View key={Category._id} style={styles.tableRow}>
                        <Text style={[styles.tableCell, { flex: 2 }]}>{Category._id}</Text>
                        <Text style={[styles.tableCell, { flex: 2 }]}>{Category.count}</Text>
                     
                    </View>
                ))}
                 </View>
                 
            </View>
            </View>
            </View>
        </Page>
    </Document>
);
    return (
        <div className="ml-64 mt-8 px-4">
            <h1 className="text-2xl font-bold mb-4">Media Management</h1>
            <MediaContentTable media={media} handleRequest={handleRequest} generateReport={generateReport} />
            <MediaModal
                open={openModal}
                handleClose={handleCloseModal}
                mediaForm={mediaForm}
                helperText={helperText}
                onInputHandleChange={onInputHandleChange}
                handleInputFocus={handleInputFocus}
                HandleBtnResponse={HandleBtnResponse}
                mode={mode}
            />
        </div>
    );
};

export default MediaManagement;
