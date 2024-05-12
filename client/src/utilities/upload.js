import axios from 'axios';
import { toast } from 'react-toastify';

const upload = async (file) => {
   if (file === null||file === undefined) {
    console.error('No file selected');
    return;
}else{
   const type= file.type.split('/')[0];
  console.log("type",type)
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'content_perset');

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/mediacontentITP/${type}/upload`,
      data
    );
    const { url } = res.data;
    console.log(url)
    if(res.status === 200){
    toast.success('File uploaded successfully');
    }
    return url;
  } catch (err) {
    toast.error('Error uploading file: ' + err.message);
    console.log(err);
  }
}
};

export default upload;