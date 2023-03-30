import React, { useEffect } from 'react'
import { Button } from 'antd';
import { useQuill } from 'react-quilljs';
import { isMobile } from 'react-device-detect';

const SalesPage = ({program, setProgram, handleSubmit}) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    const { quill, quillRef } = useQuill();
    
    useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(program.salesPage ? program.salesPage : "");
            quill.on('text-change', () => {
                setProgram({
                    ...program,
                    salesPage: quillRef.current.firstChild.innerHTML
                })
            });
        }
    }, [quill]); // eslint-disable-line react-hooks/exhaustive-deps
    
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
                onClick={() => handleSubmit(program)}
            >
                Update Sales Page
            </Button>
        </div>
     );
}
 
export default SalesPage;