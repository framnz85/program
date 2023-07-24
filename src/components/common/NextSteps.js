import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";

const NextSteps = ({
  sessionUser,
  stepModal,
  showStepModal,
  noRegBonus = false,
}) => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  let token = localStorage.getItem("token");
  if (!token) {
    token = sessionStorage.getItem("token");
  }

  const [step, setStep] = useState(0);

  useEffect(() => {
    const firstProgram =
      sessionUser && sessionUser.programList
        ? sessionUser.programList.filter(
            (prog) => prog.progid._id === "640c65d68d23ede1246298dd"
          )
        : [];
    setStep(firstProgram[0] ? firstProgram[0].steps : 0);
    if (queryParams.get("nomodal")) {
      sessionStorage.setItem("nomodal", "1");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const doneTask = async (task) => {
    const programList = sessionUser.programList ? sessionUser.programList : [];
    task++;

    const newProgramList = programList.map((prog) => {
      return { ...prog, steps: task };
    });

    const updateUser = await axios.put(
      process.env.REACT_APP_API + "/university/update-user",
      { programList: newProgramList },
      {
        headers: {
          authToken: token,
        },
      }
    );
    if (updateUser.data.err) {
      toast.error(updateUser.data.err);
    } else {
      sessionStorage.setItem("programUser", JSON.stringify(updateUser.data));
      setStep(task);
    }
  };

  return (
    <>
      {step === 0 && (
        <div
          align="center"
          style={{
            marginTop: 10,
            fontSize: isMobile ? 14 : 18,
            color: "#E55B13",
          }}
        >
          To start earning profits, you need to enroll to Clavstore Affiliate
          Training. Don't worry its free!{" "}
          <Button
            type="primary"
            size={isMobile ? "small" : "large"}
            onClick={() => navigate("/program/clavstore-affiliate-training")}
            style={{ marginLeft: 10 }}
          >
            Enroll Here
          </Button>
          <Button
            type="default"
            size={isMobile ? "small" : "large"}
            onClick={() => doneTask(step)}
            style={{ marginLeft: 10 }}
          >
            Done
          </Button>
        </div>
      )}
      {step === 1 && (
        <div
          align="center"
          style={{
            marginTop: 10,
            fontSize: isMobile ? 14 : 18,
            color: "#E55B13",
          }}
        >
          Earn ₱1.00 per person who will create a Clavstore University Account
          using your referral link
          <Button
            type="primary"
            size={isMobile ? "small" : "large"}
            onClick={() => navigate("/program/clavstore-affiliate-training")}
            style={{ marginLeft: 10 }}
          >
            Get Referral Link
          </Button>
          <Button
            type="default"
            size={isMobile ? "small" : "large"}
            onClick={() => doneTask(step)}
            style={{ marginLeft: 10 }}
          >
            Done
          </Button>
        </div>
      )}
      {step === 2 && (
        <div
          align="center"
          style={{
            marginTop: 10,
            fontSize: isMobile ? 14 : 18,
            color: "#E55B13",
          }}
        >
          To start getting people inside this system, you have to perform the
          Step 1 (Task 1) of our Affiliate Training{" "}
          <Button
            type="primary"
            size={isMobile ? "small" : "large"}
            onClick={() =>
              navigate(
                "/access/clavstore-affiliate-training?video=640e84a0cb247fd5f72c1c75"
              )
            }
            style={{ marginLeft: 10 }}
          >
            Go To Step 1 (Task 1)
          </Button>
          <Button
            type="default"
            size={isMobile ? "small" : "large"}
            onClick={() => doneTask(step)}
            style={{ marginLeft: 10 }}
          >
            Done
          </Button>
        </div>
      )}
      {step === 3 && (
        <div
          align="center"
          style={{
            marginTop: 10,
            fontSize: isMobile ? 14 : 18,
            color: "#E55B13",
          }}
        >
          Invite your friends to signup, earn P1.00 each successful signups.
          Learn it on Step 1 (Task 2) of our Affiliate Training{" "}
          <Button
            type="primary"
            size={isMobile ? "small" : "large"}
            onClick={() =>
              navigate(
                "/access/clavstore-affiliate-training?video=640e8518cb247fd5f72c1c77"
              )
            }
            style={{ marginLeft: 10 }}
          >
            Go To Step 1 (Task 2)
          </Button>
          <Button
            type="default"
            size={isMobile ? "small" : "large"}
            onClick={() => doneTask(step)}
            style={{ marginLeft: 10 }}
          >
            Done
          </Button>
        </div>
      )}
      {step === 4 && (
        <div
          align="center"
          style={{
            marginTop: 10,
            fontSize: isMobile ? 14 : 18,
            color: "#E55B13",
          }}
        >
          Each day you need to have people signup. Learn it on Step 1 (Task 3)
          of our Affiliate Training{" "}
          <Button
            type="primary"
            size={isMobile ? "small" : "large"}
            onClick={() =>
              navigate(
                "/access/clavstore-affiliate-training?video=640e855acb247fd5f72c1c78"
              )
            }
            style={{ marginLeft: 10 }}
          >
            Go To Step 1 (Task 3)
          </Button>
          <Button
            type="default"
            size={isMobile ? "small" : "large"}
            onClick={() => doneTask(step)}
            style={{ marginLeft: 10 }}
          >
            Done
          </Button>
        </div>
      )}
      {step === 5 && (
        <div
          align="center"
          style={{
            marginTop: 10,
            fontSize: isMobile ? 14 : 18,
            color: "#E55B13",
          }}
        >
          Attend our Live Facebook Training, follow Francis Clavano on his FB
          Account{" "}
          <Button
            type="primary"
            size="medium"
            onClick={() =>
              window.open(
                "https://www.facebook.com/francisjohn.clavano",
                "_blank"
              )
            }
            style={{ marginLeft: 10 }}
          >
            Attend Our Live Training Here
          </Button>
          <Button
            type="default"
            size={isMobile ? "small" : "large"}
            onClick={() => doneTask(step)}
            style={{ marginLeft: 10 }}
          >
            Done
          </Button>
        </div>
      )}
      {step === 6 && (
        <div
          align="center"
          style={{
            marginTop: 10,
            fontSize: isMobile ? 14 : 18,
            color: "#E55B13",
          }}
        >
          To learn how to use this Free Program, you need to{" "}
          <Button
            type="primary"
            size="medium"
            onClick={() =>
              window.open(
                "https://www.facebook.com/groups/clavstoreprogram",
                "_blank"
              )
            }
            style={{ marginLeft: 10 }}
          >
            Join our FB Group
          </Button>
          <Button
            type="default"
            size={isMobile ? "small" : "large"}
            onClick={() => doneTask(step)}
            style={{ marginLeft: 10 }}
          >
            Done
          </Button>
        </div>
      )}
      {step === 7 && (
        <div
          align="center"
          style={{
            marginTop: 10,
            fontSize: isMobile ? 14 : 18,
            color: "#E55B13",
          }}
        >
          Like and Follow our official Facebook Page to get more updates{" "}
          <Button
            type="primary"
            size="medium"
            onClick={() =>
              window.open(
                "https://www.facebook.com/clavstoreuniversity",
                "_blank"
              )
            }
            style={{ marginLeft: 10 }}
          >
            Clavstore University FB Page
          </Button>
          <Button
            type="default"
            size={isMobile ? "small" : "large"}
            onClick={() => doneTask(step)}
            style={{ marginLeft: 10 }}
          >
            Done
          </Button>
        </div>
      )}

      {!noRegBonus &&
        !queryParams.get("nomodal") &&
        !sessionStorage.getItem("nomodal") && (
          <Modal
            title="Welcome Message"
            open={stepModal}
            onOk={() => {
              sessionStorage.setItem("playWelcome", true);
              navigate("/program/clavstore-affiliate-training");
            }}
            onCancel={() => showStepModal(false)}
            okText="Proceed Next Step >>"
            cancelButtonProps={{ style: { display: "none" } }}
          >
            <p>
              <iframe
                title="Welcome To Clavstore University"
                src={`https://player.vimeo.com/video/807809874?autoplay=1`}
                width="100%"
                height="280"
                allow="autoplay; fullscreen; picture-in-picture"
                style={{
                  border: "none",
                }}
              />
            </p>
          </Modal>
        )}
    </>
  );
};

export default NextSteps;
