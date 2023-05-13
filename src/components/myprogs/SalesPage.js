import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import { useQuill } from 'react-quilljs';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate  } from "react-router-dom";

const SalesPage = ({program}) => {
    const navigate = useNavigate();
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    const { quill, quillRef } = useQuill();
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }

    const [progId, setProgId] = useState("");
    const [salesPage, setSalesPage] = useState("");
    const [progOwner, setProgOwner] = useState("");
    
    useEffect(() => {
        if (quill) {
            fetchProgramQuill(quill);
        }
    }, [quill]); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProgramQuill = async (quill) => {
        const result = await axios.get(
            process.env.REACT_APP_API + "/university/program-sales/" + program._id
        );
        if (result.data.err) {
            toast.error(result.data.err);
        } else {
            if (sessionUser._id === result.data.owner) {
                setProgId(result.data._id ? result.data._id : "");
                setProgOwner(result.data.owner ? result.data.owner : "");
                setSalesPage(result.data.salesPage ? result.data.salesPage : "");
                quill.clipboard.dangerouslyPasteHTML(result.data.salesPage ? result.data.salesPage : "");
                quill.on('text-change', () => {
                    setSalesPage(quillRef.current.firstChild.innerHTML);
                });
            } else {
                toast.error("Sorry! You are not the owner of that program.")
                navigate("/myprograms");
            }
        }
    }

    const handleSubmit = async () => {
        if (sessionUser._id === progOwner) {
            const result = await axios.put(
                process.env.REACT_APP_API + "/university/update-program/" + progId,
                { salesPage },
                {
                    headers: {
                        authToken: token,
                    },
                }
            );
            if (result.data.err) {
                toast.error(result.data.err);
            } else {
                toast.success("Update saved!!!");
            }
        } else {
            toast.error("Sorry! You are not the owner of that program.")
            navigate("/myprograms");
        }
    }
    
    return ( 
        <div align="center">
            <Button
                type="default"
                size='large'
                style={{
                    margin: 10
                }}
                onClick={() => window.open(`/${program.saleSlug ? "p/" + program.saleSlug : ""}?refid=${sessionUser._id}`, '_blank', 'noreferrer')}
            >
                View Sales Page
            </Button>
            <div style={{ width: isMobile ? "100%" : "80%" }}>
                <div ref={quillRef} />
            </div>
            <Button
                type="primary"
                style={{
                    width: isMobile ? "100%" : 350,
                    height: isMobile ? 50 : 60,
                    fontSize: isMobile ? 18 : 24,
                    marginTop: 30
                }}
                onClick={() => handleSubmit()}
            >
                Update Sales Page
            </Button>
        </div>
     );
}
 
export default SalesPage;