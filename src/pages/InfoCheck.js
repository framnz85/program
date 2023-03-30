import React, {useState} from 'react'
import { isMobile } from 'react-device-detect';
import { useLocation } from "react-router-dom";

const ClavstoreUniversity = process.env.REACT_APP_CLAVMALL_IMG + "/funnel_images/clavstoreuniversity.png"

const InfoCheck = () => {
    const location = useLocation();
    const pathToRedirect = location && location.state && location.state.from;
    const sessionUser = JSON.parse(sessionStorage.getItem("programUser"));

    const [name, setName] = useState(sessionUser.name);
    const [email, setEmail] = useState(sessionUser.email);

    return ( 
        <div align="center" style={{padding: 20}}>
            <div
                style={{
                    marginTop: isMobile ? "20px" : "80px",
                    color: "#009A57",
                    display: "flex",
                    justifyContent: "center"
                }}
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
            <div align="left"
                style={{
                    maxWidth: 450,
                    marginTop: 50
                }}
            >
                <p>Check your info below and click "Proceed" if everything is fine.</p>
                <form method="post" className="af-form-wrapper" acceptCharset="UTF-8" action="https://www.aweber.com/scripts/addlead.pl"  >
                    <div style={{display: "none"}}>
                        <input type="hidden" name="meta_web_form_id" value="352608519" />
                        <input type="hidden" name="meta_split_id" value="" />
                        <input type="hidden" name="listname" value="awlist6327146" />
                        <input type="hidden" name="redirect" value={pathToRedirect ? `https://${window.location.hostname}${pathToRedirect}` : `https://${window.location.hostname}/home`} id="redirect_a8d4c8b3e93780ea1fa1ddb20d386b2d" />
                        <input type="hidden" name="meta_redirect_onlist" value={pathToRedirect ? `https://${window.location.hostname}${pathToRedirect}` : `https://${window.location.hostname}/home`} />
                        <input type="hidden" name="meta_adtracking" value="Clavstore_University" />
                        <input type="hidden" name="meta_message" value="1" />
                        <input type="hidden" name="meta_required" value="name,email" />

                        <input type="hidden" name="meta_tooltip" value="" />
                    </div>
                    <div id="af-form-352608519" className="af-form">
                        <div id="af-body-352608519" className="af-body af-standards">
                            <div className="af-element">
                                <label className="previewLabel" htmlFor="awf_field-115504312">Name: </label>
                                <div className="af-textWrap">
                                    <input id="awf_field-115504312" type="text" name="name" className="text" value={name} onChange={(e) => setName(e.target.value)} tabIndex="500" />
                                </div>
                                <div className="af-clear"></div>
                            </div>
                            <div className="af-element">
                                <label className="previewLabel" htmlFor="awf_field-115504313">Email: </label>
                                <div className="af-textWrap">
                                    <input className="text" id="awf_field-115504313" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} tabIndex="501" />
                                </div>
                                <div className="af-clear"></div>
                            </div>
                            <div className="af-element">
                                <label className="previewLabel" htmlFor="awf_field-115504348">Recovery: </label><br/><br/>
                                <div align="left">Save your recovery code below somewhere else for future account recovery needs.</div>
                                <div className="af-textWrap">
                                    <input type="text" id="awf_field-115504348" className="text" name="custom defaultPassword" value={sessionUser.recovery} onChange={() => ""} /></div>
                                <div className="af-clear"></div>
                            </div>
                            <div className="af-element buttonContainer">
                                <input name="submit" className="submit" type="submit" value="Proceed" tabIndex="502" />
                                <div className="af-clear"></div>
                            </div>
                            <div className="af-element privacyPolicy" style={{textAlign: "center"}}>
                                <p>We respect your <a title="Privacy Policy" href="https://www.aweber.com/permission.htm" target="_blank" rel="noreferrer">email privacy</a></p>
                                <div className="af-clear"></div>
                            </div>
                            <div className="af-element tag" style={{display: "none"}}><input id="awf_tag-115504316" type="hidden" name="tag_115504316" value="registered" /></div>
                        </div>
                    </div>
                    <div style={{display: "none"}}><img src="https://forms.aweber.com/form/displays.htm?id=zKxMbAwcrIyc" alt="" /></div>
                </form>
            </div>
        </div>
     );
}
 
export default InfoCheck;