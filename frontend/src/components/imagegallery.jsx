import {useEffect, useState } from "react";
import { getBrandImages } from "../services/api";

export default function ImageGallery({ brandName }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [images, setImages] = useState([]);
    // const images = data?.filter(item => item.image).map(item => item.image) || [];

    useEffect(() => {
        if (!brandName) return;

        getBrandImages(brandName)
            .then((data) => {
                setImages(Array.isArray(data) ? data : []);
                setCurrentIndex(0); // reset to first image when brand changes
        })

        .catch((error) => 
            console.error("Error fetching brand images:", error));
            setImages([]);
    }, [brandName]
        );
        
        useEffect(() => {
            if (images.length <= 1) return;

            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
            }, 3000);

            return () => clearInterval(interval);
         }, [images]);

        if (images.length === 0) return <p style={{textAlign: "center"}}>No images available for {brandName}.</p>;
    
        const currentImg = images[currentIndex];
        const imagePath = `http://127.0.0.1:8000${currentImg}`;
    
        return(
            <div style={{ 
                width: "100%",
                marginTop: "20px",
                height: "300px",
                textAlign: "center",
                marginBottom: "20px"}}>
            
                <img 
                    src={imagePath} 
                    alt={`${brandName} Runway Image`}
                    style ={{
                        height: "100%",
                        borderRadius: "8px",
                        objectFit: "cover"
                }}/>
            </div>
    );
};