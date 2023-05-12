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
    const queryParams = new URLSearchParams(window.location.search);
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }
    
    const refid = queryParams.get("refid");

    if (!localStorage.getItem("refid") || localStorage.getItem("refid") === "null") {
        localStorage.setItem("refid", refid);
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

    return ( 
        <div align="center">
            <div style={{ width: isMobile ? "100%" : "80%", padding: 20 }} >
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
                onClick={() => navigate('../program/' + program.slug + "?noRedirect=1")}
            >
                Click Here To Enroll
            </Button><br />
        </div>
     );
}
 
export default SalesProgram;