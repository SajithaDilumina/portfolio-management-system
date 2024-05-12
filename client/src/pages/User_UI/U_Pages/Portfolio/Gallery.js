// Gallery.js
import React, { useEffect, useState } from 'react';
import { GalleryData } from './GalleryData';
import '../../Styles/gallery.css';
import { Gallery } from './GalleryData'; // Import Gallery array

const GalleryComponent = () => {
  const [data, setData] = useState([]);
  const [collection,setcollection] = useState([]);

  useEffect(() => {
    setData(GalleryData);
    setcollection([... new Set(GalleryData.map((item)=> item.title))])

  }, [])

  const gallery_filter =(itemData) =>{
      const filterData = GalleryData.filter((item)=> item.title == itemData );
      setData(filterData);
  }

  return (
    <div>
      <div className="gallerywrapper">
        <div className="filterItem">
          <ul>
            <li><button onClick={()=> setData(GalleryData)}>All</button></li>
            {
              collection.map((item)=> <li><button onClick={()=>{gallery_filter(item)}}>{item}</button></li>)
            }
          </ul>

        </div>
        <div className="galleryContaoner">
          {
            data.map((item) => <div key={item.id}  className="galleryItem"><img src={item.image} /> </div>)
          }
        </div>
      </div>
    </div>
  );
}

export default GalleryComponent;
