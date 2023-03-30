import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import { isMobile } from 'react-device-detect';

const SalesProgram = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }
    const [program, setProgram] = useState({});
    
    useEffect(() => {
        fetchProgram();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProgram = async () => {
        const result = await axios.get(
            process.env.REACT_APP_API + "/university/program/" + slug
        );
        if (result.data.err) {
            toast.error(result.data.err);
        } else {
            setProgram(result.data);
        }
    }

    const handleEnroll = () => {
        if (token) {
            navigate('../program/' + program.slug);
        } else {
            navigate("/login", { state: { from: "/program/" + program.slug }});
        }
    }

    return ( 
        <div align="center">
            <div style={{ width: "80%", padding: 20 }} >
                <ReactQuill
                    value={program.salesPage ? program.salesPage : ""}
                    readOnly={true}
                    modules={{ toolbar: [] }}
                />
            </div>
            <Button
                type="primary"
                size="large"
                style={{
                    height: 70,
                    fontSize: 24,
                    paddingLeft: 40,
                    paddingRight: 40,
                    marginBottom: 50,
                    width: isMobile ? "100%" : "50%",
                }}
                onClick={handleEnroll}
            >
                Click Here To Enroll
            </Button><br />
        </div>
     );
}
 
export default SalesProgram;