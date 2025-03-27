import React from "react";
import { Carousel } from "antd";
import styles from "./ImageSlider.module.css"; // Create a CSS module for styling

const ImageSlider = ({ images }) => {
  const transformedUrls = images.map((url) => url.replace('http://localhost:8000', process.env.NEXT_PUBLIC_API_BASE_URL));
  
  return (
    <Carousel autoplay dots={false}>
      {Array.isArray(images) && images.length > 0 ? (
        images.map((image, index) => (
          <div key={index} className={styles.imageContainer}>
            <img src={transformedUrls(image)} alt={`Property Image ${index + 1}`} className={styles.image} />
          </div>
        ))
      ) : (
        <div className={styles.noImages}>No images available</div> // Optional: Display a message if no images
      )}
    </Carousel>
  );
};

export default ImageSlider; 