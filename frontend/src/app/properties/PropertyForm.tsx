import React, { useState } from 'react';
import { useCreatePropertyMutation } from '../redux/slices/apiSlice';

const PropertyForm = () => {
    const [createProperty] = useCreatePropertyMutation();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        latitude: '',
        longitude: '',
        type: '',
        amenities: [],
        overview: {},
        rentDetails: '',
        termsOfStay: '',
        location: '',
        images: [] // For storing image files
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                for (let i = 0; i < formData.images.length; i++) {
                    data.append('images', formData.images[i]);
                }
            } else {
                data.append(key, formData[key]);
            }
        });

        try {
            await createProperty(data).unwrap();
            // Handle success (e.g., show a success message or refresh the property list)
        } catch (error) {
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Other input fields */}
            <input type="file" multiple onChange={handleFileChange} />
            <button type="submit">Create Property</button>
        </form>
    );
};

export default PropertyForm; 