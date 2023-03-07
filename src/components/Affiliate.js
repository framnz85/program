import React, {useState} from 'react'
import { Button, Input, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';

const Affiliate = () => {
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    
    const [copied, setCopied] = useState("Copy to Clipboard");

    const copyClipboard = (num) => {
        const copyText = document.getElementById("myInput" + num);
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(copyText.value);
        setCopied("Copied")
    }

    return ( 
        <div style={{display: isMobile ? "block" : "flex", justifyContent: "space-evenly"}}>
            <div align="left">
                <h2>Free Clavstore Program Links</h2>
                If referral upgrade to Premium Clavstore Program, you will earn Php 300/yr<br /><br />
                <Input.Group compact>
                    <Input
                        style={{ width: isMobile ? '90%' : 520 }}
                        defaultValue={`https://program.etnants.com/?refid=${sessionUser._id}`}
                        id="myInput7"
                    />
                    <Tooltip title={copied}>
                        <Button icon={<CopyOutlined />} onClick={() => copyClipboard(7)} />
                    </Tooltip>
                </Input.Group><br />
                <Input.Group compact>
                    <Input
                        style={{ width: isMobile ? '90%' : 520 }}
                        defaultValue={`https://program.clavmall.com/?refid=${sessionUser._id}`}
                        id="myInput8"
                    />
                    <Tooltip title={copied}>
                        <Button icon={<CopyOutlined />} onClick={() => copyClipboard(8)} />
                    </Tooltip>
                </Input.Group><br />
                <Input.Group compact>
                    <Input
                        style={{ width: isMobile ? '90%' : 520 }}
                        defaultValue={`https://program.clavstore.com/?refid=${sessionUser._id}`}
                        id="myInput9"
                    />
                    <Tooltip title={copied}>
                        <Button icon={<CopyOutlined />} onClick={() => copyClipboard(9)} />
                    </Tooltip>
                </Input.Group><br /><br />
                <h2>OGPA Program Sales Page</h2>
                If referral enroll to OGPA Program, you will earn Php 1000 and 5% Of Monthly Subscription<br /><br />
                <Input.Group compact>
                    <Input
                        style={{ width: isMobile ? '90%' : 520 }}
                        defaultValue={`https://program.etnants.com/ogpa?refid=${sessionUser._id}`}
                        id="myInput1"
                    />
                    <Tooltip title={copied}>
                        <Button icon={<CopyOutlined />} onClick={() => copyClipboard(1)} />
                    </Tooltip>
                </Input.Group><br />
                <Input.Group compact>
                    <Input
                        style={{ width: isMobile ? '90%' : 520 }}
                        defaultValue={`https://program.clavmall.com/ogpa?refid=${sessionUser._id}`}
                        id="myInput2"
                    />
                    <Tooltip title={copied}>
                        <Button icon={<CopyOutlined />} onClick={() => copyClipboard(2)} />
                    </Tooltip>
                </Input.Group><br />
                <Input.Group compact>
                    <Input
                        style={{ width: isMobile ? '90%' : 520 }}
                        defaultValue={`https://program.clavstore.com/ogpa?refid=${sessionUser._id}`}
                        id="myInput3"
                    />
                    <Tooltip title={copied}>
                        <Button icon={<CopyOutlined />} onClick={() => copyClipboard(3)} />
                    </Tooltip>
                </Input.Group><br /><br />
                <h2>OGPA Program Registration</h2>
                <Input.Group compact>
                    <Input
                        style={{ width: isMobile ? '90%' : 520 }}
                        defaultValue={`https://program.etnants.com/ogpaform?refid=${sessionUser._id}`}
                        id="myInput4"
                    />
                    <Tooltip title={copied}>
                        <Button icon={<CopyOutlined />} onClick={() => copyClipboard(4)} />
                    </Tooltip>
                </Input.Group><br />
                <Input.Group compact>
                    <Input
                        style={{ width: isMobile ? '90%' : 520 }}
                        defaultValue={`https://program.clavmall.com/ogpaform?refid=${sessionUser._id}`}
                        id="myInput5"
                    />
                    <Tooltip title={copied}>
                        <Button icon={<CopyOutlined />} onClick={() => copyClipboard(5)} />
                    </Tooltip>
                </Input.Group><br />
                <Input.Group compact>
                    <Input
                        style={{ width: isMobile ? '90%' : 520 }}
                        defaultValue={`https://program.clavstore.com/ogpaform?refid=${sessionUser._id}`}
                        id="myInput6"
                    />
                    <Tooltip title={copied}>
                        <Button icon={<CopyOutlined />} onClick={() => copyClipboard(6)} />
                    </Tooltip>
                </Input.Group><br />
            </div>
            <div style={{marginLeft: isMobile ? 0 : 40}}>
                <h3>Step 1. Introduction to Free Clavstore Program</h3>
                <div style={{ width: isMobile ? "100%" : 650, height: isMobile ? "100%" : 367, backgroundColor: "#666" }}>
                    <iframe
                        title="Online Grocery Workshop"
                        src={`https://player.vimeo.com/video/802386264`}
                        width={isMobile ? "100%" : 650}
                        height={isMobile ? "100%" : 367}
                        allow="autoplay; fullscreen; picture-in-picture"
                    />
                </div>
                <br /><br />
                <h3>Step 2. What is the Process to Earn 1000 Pesos</h3>
                <div style={{ width: isMobile ? "100%" : 650, height: isMobile ? "100%" : 367, backgroundColor: "#666" }}>
                    <iframe
                        title="Online Grocery Workshop"
                        src={`https://player.vimeo.com/video/802387143`}
                        width={isMobile ? "100%" : 650}
                        height={isMobile ? "100%" : 367}
                        allow="autoplay; fullscreen; picture-in-picture"
                    />
                </div>
                <br /><br />
                <h3>Step 3. How To FInd And Get Clients</h3>
                <div style={{ width: isMobile ? "100%" : 650, height: isMobile ? "100%" : 367, backgroundColor: "#666" }}>
                    <iframe
                        title="Online Grocery Workshop"
                        src={`https://player.vimeo.com/video/802393164`}
                        width={isMobile ? "100%" : 650}
                        height={isMobile ? "100%" : 367}
                        allow="autoplay; fullscreen; picture-in-picture"
                    />
                </div>
            </div>
        </div>
     );
}
 
export default Affiliate;