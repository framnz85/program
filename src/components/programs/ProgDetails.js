import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Input, Tooltip, Layout, Table } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';
import axios from 'axios';
import { toast } from 'react-toastify';

import MainHeader from '../common/MainHeader';
import MainFooter from '../common/MainFooter';
import NotEnrolled from './NotEnrolled';
import PayInstruction from './PayInstruction';
import Enrolled from './Enrolled';

import { noImage } from '../common/uriImages';

const initialState = {
    totalProducts: 0,
    totalCommission: 0,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const ProgDetails = () => {
    const navigate = useNavigate();
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
    const queryParams = new URLSearchParams(window.location.search);
    const { slug } = useParams();
    
    const [user, setUser] = useState({});
    const [copied, setCopied] = useState("Copy to Clipboard");
    const [program, setProgram] = useState({});
    const [dashboard, setDashboard] = useState(initialState);

    useEffect(() => {
        fetchProgram();
        setUser(sessionUser);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProgram = async () => {
        const result = await axios.get(
            process.env.REACT_APP_API + "/university/program/" + slug
        );
        if (result.data.err) {
            toast.error(result.data.err);
        } else {
            setProgram(result.data)
        }
    }

    const copyClipboard = (num) => {
        const copyText = document.getElementById("myInput" + num);
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(copyText.value);
        setCopied("Copied")
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'Commisison',
            dataIndex: 'commission',
            key: 'commission',
        },
    ];

    const dataSource = [
        {
            key: '1',
            title: <><strong>Level 1.</strong> If you're in a Free Account</>,
            currency: program.currency,
            commission: program.commission1 && program.commission1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
            key: '2',
            title: <><strong>Level 2.</strong> If you're in a Premium Account</>,
            currency: program.currency,
            commission: program.commission2 && program.commission2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
            key: '3',
            title: <><strong>Level 3.</strong> If you're Enrolled in this Program</>,
            currency: program.currency,
            commission: program.commission3 && program.price !== "Free"
                ? program.commission3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : "Free Account: " + (program.commission1 && program.commission1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) + ", Premium Account: " + (program.commission2 && program.commission2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
        },
    ];

    return ( 
        <Layout>
            <MainHeader
                defaultKey="3"
                dashboard={dashboard}
                setDashboard={setDashboard}
                pathname={"/program/" + slug}
                noRedirect={queryParams.get("noRedirect") === "1"}
            />
            <div
                align="center"
                style={{
                    padding: 24,
                    backgroundColor: "#ffffff",
                    marginTop: 10,
                }}
            >
                <div style={{display: isMobile ? "block" : "flex"}}>
                    <div align="center" style={{ width: isMobile ? "100%" : "50%" }}>
                        <img src={program.image1 ? program.image1 : noImage} width={isMobile ? "100%" : "80%"} alt={program.title} />
                        {user && user.programList && user.programList.some((prog) => prog.progid._id === program._id && prog.status)
                            ? <Enrolled program={program} />
                            : user && user.programList && user.programList.some((prog) => prog.progid._id === program._id && !prog.status)
                                ? <PayInstruction program={program} user={user} setUser={setUser} />
                                : <NotEnrolled program={program} user={user} setUser={setUser} pathname={"/program/" + slug + "?noRedirect=1"} />
                        }
                        {queryParams.get("noRedirect") !== "1" && <Button
                            type="default"
                            size="large"
                            style={{
                                height: 70,
                                fontSize: 24,
                                paddingLeft: 40,
                                paddingRight: 40,
                                marginTop: 25,
                                width: isMobile ? "100%" : "80%",
                            }}
                            onClick={() => navigate(`/promote/${program.slug}`)}
                        >
                            Promote This Program
                        </Button>}
                    </div>
                    <div align="left" style={{ width: isMobile ? "100%" : "50%", marginTop: isMobile ? 20 : 0}}>
                        <h2>{program.title} - {program.subtitle}</h2>
                        <h4>
                            <span style={{ color: "darkorange" }}>{program.discountPrice === "Free" ? program.discountPrice : <>₱{program.discountPrice && program.discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</>}</span>{" "}
                            <span style={{textDecorationLine: "line-through"}}>₱{program.price && program.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                        </h4>
                        <p>{program.description}</p><br />
                        <h4>Commission Table</h4>
                        {program.discountPrice === "Free" ?
                            <p>Refer this training to others and if they upgrade to Premium, you will earn as follows:</p> : 
                            <p>Refer this program to others and if they enroll, you will earn as follows:</p>
                        }
                        <Table dataSource={dataSource} columns={columns} pagination={false} /><br /><br />
                        <h4>Affiliate or Referral Links</h4>
                        {program.discountPrice === "Free" ?
                            <p>Give either one of the links below to all the peoiple you know. Once they registered, you'll earn P1. Once they upgrade to premium, you'll earn commisison shown on the table above.</p> : 
                            <p>Give either one of the links below to people you may know who needs this program. Once they purchased, you'll earn commisison shown on the table above.</p>
                        }
                        <Input.Group compact>
                            <Input
                                style={{ width: "90%" }}
                                value={`${process.env.REACT_APP_HOST1}/${program.saleSlug ? "p/" + program.saleSlug : ""}?refid=${user && user._id}`}
                                id="myInput1"
                            />
                            <Tooltip title={copied}>
                                <Button icon={<CopyOutlined />} onClick={() => copyClipboard(1)} />
                            </Tooltip>
                        </Input.Group><br />
                        <Input.Group compact>
                            <Input
                                style={{ width: "90%" }}
                                value={`${process.env.REACT_APP_HOST2}/${program.saleSlug ? "p/" + program.saleSlug : ""}?refid=${user && user._id}`}
                                id="myInput2"
                            />
                            <Tooltip title={copied}>
                                <Button icon={<CopyOutlined />} onClick={() => copyClipboard(2)} />
                            </Tooltip>
                        </Input.Group><br />
                        <Input.Group compact>
                            <Input
                                style={{ width: "90%" }}
                                value={`${process.env.REACT_APP_HOST3}/${program.saleSlug ? "p/" + program.saleSlug : ""}?refid=${user && user._id}`}
                                id="myInput3"
                            />
                            <Tooltip title={copied}>
                                <Button icon={<CopyOutlined />} onClick={() => copyClipboard(3)} />
                            </Tooltip>
                        </Input.Group><br /><br />
                    </div>
                </div>
            </div>

            <MainFooter noRedirect={queryParams.get("noRedirect") === "1"} />
        </Layout>
     );
}
 
export default ProgDetails;