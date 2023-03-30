import React, {useState} from 'react'
import { Card, Input, Button, Tooltip } from 'antd';
import { isMobile } from 'react-device-detect';
import { DownloadOutlined, CopyOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';

const { Meta } = Card;
const { TextArea } = Input;

const PromoteCard = ({prom, type, program}) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));

    const [copyDesc, setCopyDesc] = useState("Copy Description");

    const downloadImage = (img) => {
        saveAs(img);
    }

    const copyClipboard = (num) => {
        const copyText = document.getElementById("myInput" + num);
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(copyText.value);
        setCopyDesc("Copied")
    }

    const listUrl = [
        process.env.REACT_APP_HOST1,
        process.env.REACT_APP_HOST2,
        process.env.REACT_APP_HOST3
    ]

    const registerUrl = Math.floor(Math.random() * listUrl.length);

    return ( 
        <Card
            style={{
                width: isMobile ? "100%" : "23%",
                marginRight: isMobile ? 0 : 20,
                marginBottom: 20,
                cursor: "pointer",
                backgroundColor: "#fafafa"
            }}
            cover={
                <div align="center">
                    {type === "image" ? <img
                        onClick={() => downloadImage(`https://drive.google.com/uc?export=view&id=${prom.driveID}`)}
                        alt="Promote Clavstore University"
                        src={`https://drive.google.com/uc?export=view&id=${prom.driveID}`}
                        style={{width: "80%", height: "80%", paddingTop: 20}}
                    /> : 
                    <iframe src={`https://drive.google.com/file/d/${prom.driveID}/preview`} title={prom.title} width="80%" height="80%" allow="autoplay" />}
                </div>
            }
            actions={[
                <Tooltip title="Download Image">
                    <Button
                        icon={<DownloadOutlined />}
                        style={{width: 120}}
                        onClick={() => downloadImage(`https://drive.google.com/uc?export=view&id=${prom.driveID}`, prom.driveID)}
                    >
                        Download
                    </Button>
                </Tooltip>,                
                <Tooltip title={copyDesc}>
                    <Button
                        icon={<CopyOutlined />}
                        style={{width: 120}}
                        onClick={() => copyClipboard(prom._id)}
                    >
                        Copy
                    </Button>
                </Tooltip>,
            ]}
        >
            <Meta
                title={prom.title}
                description={
                    <TextArea
                        rows={4}
                        value={`${prom.script} \n\n${program && program.saleSlug ? "See the details" : "Register"} on this link ${listUrl[registerUrl]}/${program && program.saleSlug ? "p/" + program.saleSlug : ""}?refid=${sessionUser && sessionUser._id}`}
                        id={`myInput${prom._id}`}
                    />
                }
            />
        </Card>
     );
}
 
export default PromoteCard;