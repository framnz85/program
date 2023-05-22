import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import { isMobile } from 'react-device-detect';

const SalesProgram = ({setShowTab}) => {
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
    
    const [salesPage, setSalesPage] = useState({});
    
    useEffect(() => {
        fetchProgram();
        setShowTab(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProgram = async () => {
        const program = await axios.get(
            process.env.REACT_APP_API + "/university/program/" + slug
        );
        if (program.data.err) {
            toast.error(program.data.err);
        }else{
            const result = await axios.get(
                process.env.REACT_APP_API + "/university/program-sales/" + program.data._id
            );
            if (result.data.err) {
                toast.error(result.data.err);
            } else {
                setSalesPage(result.data.salesPage);
            }
        }
    }

    return ( 
        <div align="center">
            <div style={{ width: isMobile ? "100%" : "80%", padding: 20 }} >
                <ReactQuill
                    value={salesPage ? salesPage : ""}
                    readOnly={true}
                    modules={{ toolbar: [] }}
                />
            </div>
            <Button
                type="primary"
                size="large"
                style={{
                    height: isMobile ? 50 : 70,
                    fontSize: isMobile ? 20 : 24,
                    paddingLeft: 40,
                    paddingRight: 40,
                    marginBottom: 50,
                    width: isMobile ? "90%" : "50%",
                }}
                onClick={() => window.open("../program/" + slug + "?noRedirect=1", "_parent")}
            >
                Click Here To Avail The Program
            </Button><br />
        </div>
     );
}
 
export default SalesProgram;