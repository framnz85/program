import React from 'react'
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

const ClavstoreUniversity = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/clavstoreuniversity.png"

const RecoveryForm = () => {
    const navigate = useNavigate();    
    const queryParams = new URLSearchParams(window.location.search);

    return ( 
        <div align="center" style={{padding: 20}}>
            <div
                style={{
                    marginTop: isMobile ? "20px" : "80px",
                    color: "#009A57",
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                }}
                onClick={() => navigate("/")}
            >
                <div>
                    <img
                        src={ClavstoreUniversity}
                        alt="Clavstore University"
                        style={{
                            marginRight: 20,
                            width: 80,
                            height: 80,
                            borderRadius: 6,
                        }}
                    /> 
                </div>
                <h2 style={{fontSize: isMobile ? "24px" : "32px", paddingTop: isMobile ? 25 : 15}}>Clavstore University</h2>
            </div>
            <div align="center"
                style={{
                    maxWidth: 450,
                    marginTop: 50
                }}
            >
                <p>If the information below are correct then click the "Recover" button.</p>
                <form method="post" className="af-form-wrapper" acceptCharset="UTF-8" action="https://www.aweber.com/scripts/addlead.pl"  >
                    <div style={{display: "none"}}>
                    <input type="hidden" name="meta_web_form_id" value="1161240985" />
                        <input type="hidden" name="meta_split_id" value="" />
                        <input type="hidden" name="listname" value="awlist6327146" />
                        <input type="hidden" name="redirect" value={`https://${window.location.hostname}/recovercode?success=1`} id="redirect_4ac38eda1a497022f9bad5b262c5e260" />
                        <input type="hidden" name="meta_redirect_onlist" value={`https://${window.location.hostname}/recovercode?success=1`} />
                        <input type="hidden" name="meta_adtracking" value="Reset_Password" />
                        <input type="hidden" name="meta_message" value="1" />
                        <input type="hidden" name="meta_required" value="email" />

                        <input type="hidden" name="meta_tooltip" value="" />
                    </div>
                    <div id="af-form-1161240985" className="af-form">
                        <div id="af-body-1161240985" className="af-body af-standards">
                            <div className="af-element">
                                <label className="previewLabel" htmlFor="awf_field-115523969">Name: </label>
                                <div className="af-textWrap">
                                    <input id="awf_field-115523969" type="text" name="name" className="text" value={queryParams.get("name")} onChange={() => ""} tabIndex="500" />
                                </div>
                                <div className="af-clear"></div>
                            </div>
                            <div className="af-element">
                            <label className="previewLabel" htmlFor="awf_field-115523497">Email: </label>
                                <div className="af-textWrap">
                                    <input className="text" id="awf_field-115523497" type="text" name="email" value={queryParams.get("email")} onChange={() => ""} tabIndex="501" />
                                </div>
                                <div className="af-clear"></div>
                            </div>
                            <div className="af-element" style={{display: "none"}}>
                                <label className="previewLabel" htmlFor="awf_field-115523971"></label>
                                <div className="af-textWrap">
                                    <input type="text" id="awf_field-115523971" className="text" name="custom defaultPassword" value={queryParams.get("rc")} onChange={() => ""} tabIndex="502" />
                                </div>
                                <div className="af-clear"></div>
                            </div>
                            <div className="af-element buttonContainer">
                                <input name="submit" className="submit" type="submit" value="Recover" tabIndex="501" />
                                <div className="af-clear"></div>
                            </div>
                            <div className="af-element tag" style={{display: "none"}}><input id="awf_tag-115523499" type="hidden" name="tag_115523499" value="recovery" /></div>
                        </div>
                    </div>
                    <div style={{display: "none"}}><img src="https://forms.aweber.com/form/displays.htm?id=jIxsjEwsDJwcrA==" alt="" /></div>
                </form>
            </div>
        </div>
     );
}
 
export default RecoveryForm;