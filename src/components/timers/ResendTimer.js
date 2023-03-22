//!Resend email component
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import SmallText from "./../texts/SmallText";
import PressableText from "./../texts/PressableText";

import RowContainerSpaceBetween from "./../containers/RowContainerSpaceBetween";
const { accent, fail, success, black } = colors;

const ResendTimer = ({
  activeResend,
  setActiveResend,
  resendStatus,
  resendEmail,
  targetTimeInSeconds,
  pinReady,
  ...props
}) => {
  const StyledView = styled.View`
    align-content: center;
    ${(props) => {
      return props.pinReady ? "opacity: 0.3;" : "opacity: 1;";
    }}
  `;

  const ResendText = styled.Text`
    color: ${accent}
      ${(props) => {
        const { resendStatus } = props;

        if (resendStatus == "Failed") {
          return `color : ${fail}`;
        } else if (resendStatus == "Sent") {
          return `color : ${success}`;
        }
      }};
  `;

  const [timeLeft, setTimeLeft] = useState(null);

  const [targetTime, setTargetTime] = useState(null);

  let resendTimerInterval;

  const triggerTimer = (targetTimeInSeconds = 30) => {
    setTargetTime(targetTimeInSeconds);
    setActiveResend(false);
    const finalTime = +new Date() + targetTimeInSeconds * 1000;
    const resendTimerInterval = setInterval(
      () => calculateTimeLeft(finalTime),
      1000
    );
  };

  const calculateTimeLeft = (finalTime) => {
    const difference = finalTime - +new Date();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      clearInterval(resendTimerInterval);
      setActiveResend(true);
      setTimeLeft(null);
    }
  };

  useEffect(() => {
    triggerTimer(targetTimeInSeconds);
    return () => {
      clearInterval(resendTimerInterval);
    };
  }, []);

  return (
    <StyledView {...props} pinReady={pinReady}>
      <RowContainerSpaceBetween>
        <SmallText style={{ color: black, fontWeight: 600 }}>
          Didn't receive the code?
        </SmallText>
        <PressableText
          onPress={() => resendEmail(triggerTimer)}
          disabled={pinReady}
          style={{ opacity: activeResend ? 1 : 0.5 }}
        >
          <ResendText resendStatus={resendStatus}>{resendStatus}</ResendText>
        </PressableText>
      </RowContainerSpaceBetween>
      {!activeResend && (
        <SmallText style={{ color: black, fontWeight: 600 }}>
          in
          <SmallText style={{ fontWeight: 600, color: black }}>
            {" "}
            {timeLeft || targetTime}{" "}
          </SmallText>
          seconds
        </SmallText>
      )}
    </StyledView>
  );
};
export default ResendTimer;
