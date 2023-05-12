import React from "react";
import NumberFormat from "react-number-format";
import { isMobile } from 'react-device-detect';

const Dashboard = ({ dashboard }) => {    
    return (
        <div style={{ textAlign: "center", width: "100%", display: "flex", flexWrap: "wrap" }}>
            <div style={{ backgroundColor: "#00FFFF", height: "100px", width: isMobile ? "50%" : "25%", padding: 20 }}>
                <b>Total Products</b><br />
                <span style={{ fontSize: 24 }}>{dashboard.totalProducts}</span>
            </div>
            <div style={{ backgroundColor: "#FFC300", height: "100px", width: isMobile ? "50%" : "25%", padding: 20 }}>
                <b>Total Commission</b><br />
                <span style={{ fontSize: 24 }}>
                    <NumberFormat
                        value={dashboard.totalCommission && dashboard.totalCommission.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                    />
                </span>
            </div>
            <div style={{ backgroundColor: "#ff0000", height: "100px", width: isMobile ? "50%" : "25%", padding: 20 }}>
                <b>Total Withdrawn</b><br />
                <span style={{fontSize: 24}}>
                    <NumberFormat
                        value={dashboard.totalWithdrawn && dashboard.totalWithdrawn.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                    />
                </span>
            </div>
            <div style={{ backgroundColor: "#00D100", height: "100px", width: isMobile ? "50%" : "25%", padding: 20 }}>
                <b>Total Remaining</b><br />
                <span style={{fontSize: 24}}>
                    <NumberFormat
                        value={dashboard.totalRemaining && dashboard.totalRemaining.toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₱"}
                    />
                </span>
            </div>
        </div>
    );
}
 
export default Dashboard;