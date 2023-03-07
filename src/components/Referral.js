import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Dashboard from "./Dashboard"
import OgpaTables from './OgpaTables';
import FreeTables from './FreeTables';

const initialState = {
    ogpas: [
        {
            _id: "1",
            name: "Registration Bonus",
            email: "Registration Bonus",
            product: "Registration Bonus",
            amount: "300",
            commission: "300",
            status: "Approved"
        }
    ],
    ogts: [],
    itemsCount: 0,
    pageSize: 10,
    currentPage: 1,
    sortkey: "createdAt",
    sort: -1,
    totalProducts: 0,
    totalCommission: 300,
    totalWithdrawn: 0,
    totalRemaining: 0
}

const Referral = () => {
    const [values, setValues] = useState(initialState);
    const [tabMenu, setTabMenu] = useState(1);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));
        if (sessionUser) {
            fetchOgpas(sessionUser);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchOgpas = async (user) => {
        const ogpas = await axios.get(
            process.env.REACT_APP_API + "/ogt/" + user._id
        );

        const sumOfCommission = ogpas.data.sumCommission[0] ? ogpas.data.sumCommission[0].sum + 300 : 300;
        const totalCommission = sumOfCommission;
        const totalWithdrawn = ogpas.data.sumWithdraw[0] ? ogpas.data.sumWithdraw[0].sum : 0;
        const totalRemaining = totalCommission + totalWithdrawn;
        setValues({
            ...values,
            ogpas: [...values.ogpas, ...ogpas.data.result1],
            ogts: ogpas.data.result2,
            itemsCount: ogpas.data.count,
            totalProducts: ogpas.data.totalProducts,
            totalCommission,
            totalWithdrawn,
            totalRemaining
        });
    }

    const tabs = {
        float: "left",
        padding: "5px 10px",
        borderTop: "1px solid #aaa",
        borderLeft: "1px solid #aaa",
        width: 120,
        textAlign: "center",
        cursor: "pointer",
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4
    }

    return ( 
        <div>
            <Dashboard values={values} />
            <br />
            <div style={{borderBottom: "1px solid #aaa"}}>
                <div style={{...tabs, backgroundColor: tabMenu === 1 ? "#fff" : "#eee"}} onClick={() => setTabMenu(1)}>OGPA Program</div>
                <div style={{...tabs, borderRight: "1px solid #aaa", backgroundColor: tabMenu === 2 ? "#fff" : "#eee"}} onClick={() => setTabMenu(2)}>Free Clavstore</div>
                <div style={{clear: "both"}}></div>
            </div>
            <br />
            {tabMenu === 1 && <OgpaTables values={values.ogpas} />}
            {tabMenu === 2 && <FreeTables values={values.ogts} />}
        </div>
     );
}
 
export default Referral;