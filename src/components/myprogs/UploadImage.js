import React from 'react'
import { toast } from 'react-toastify';

const UploadImage = ({image, setImage, setImageOk}) => {
    const handleChange = (e) => {
        const data = new FileReader();
        data.addEventListener('load', () => {
            setImage(data.result);
        });
        data.readAsDataURL(e.target.files[0]);
        data.onload = (e) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = () => {
                const {
                    height,
                    width
                } = image;
                if (height !== 450 || width !== 850) {
                    toast.error("Height must be exactly 450 pixel and Width must be exactly 850px.");
                    setImageOk(false);
                    return;
                }
                toast.success("Image was successfully saved!");
                setImageOk(true);
            };
        };
    }
    return ( 
        <div style={{marginBottom: 50}}>
            {image && <><img src={image} height={"250"} alt="Uploads" /><br /><br /></>}
            <input
                type='file'
                accept="image/*"
                onChange={handleChange}
                style={{ border: "1px solid #999999" }}
            />
        </div>
     );
}
 
export default UploadImage;