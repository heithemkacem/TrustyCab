import React, { useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { colors } from "../components/colors";
import MainContainer from "../components/containers/MainContainer";
import RegularButton from "../components/buttons/RegularButton";
import IconHeader from "../components/icons/IconHeader";
import StyledCodeInput from "../components/inputs/CodeInput";
import ResendTimer from "../components/timers/ResendTimer";
import { ResendEmailAction } from "../_actions/logicHandlerActions/authActions";
import { useDispatch } from "react-redux";
import BigText from "../components/texts/BigText";

const EmailVerification = ({ navigation, route }) => {
  const { white, accent } = colors;
  // code input states
  const MAX_CODE_LENGTH = 4;
  const [code, setCode] = useState("");
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);
  // resending email states
  const [activeResend, setActiveResend] = useState(false);
  const [resendStatus, setResendStatus] = useState("Resend");
  const [resendingEmail, setResendingEmail] = useState(false);

  const moveTo = (screen, payLoad) => {
    navigation.navigate(screen, { ...payLoad });
  };
  const dispatch = useDispatch();
  const resendEmail = async (triggerTimer) => {
    dispatch(
      ResendEmailAction(
        route,
        setResendingEmail,
        setResendStatus,
        setActiveResend,
        triggerTimer,
        t
      )
    );
  };
  const handleEmailVerification = async () => {
    setVerifying(true);
  };
  return (
    <MainContainer>
      <IconHeader name="lock-open" style={{ marginTop: 30 }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BigText
          style={{
            marginTop: 30,
          }}
        >
          Enter the code sent to your email
        </BigText>
        <StyledCodeInput
          moveto={moveTo}
          code={code}
          setCode={setCode}
          maxLength={MAX_CODE_LENGTH}
          setPinReady={setPinReady}
          route={route}
          navigation={navigation}
        />
        {!verifying && pinReady && (
          <RegularButton
            color={white}
            onPress={handleEmailVerification}
            disabled={pinReady}
            loading={verifying}
          >
            Verify
          </RegularButton>
        )}
        {!verifying && !pinReady && (
          <RegularButton
            color={white}
            style={{ backgroundColor: accent }}
            disabled={true}
            loading={verifying}
          >
            Verify
          </RegularButton>
        )}
        {verifying && (
          <RegularButton disabled={true}>
            <ActivityIndicator size={"small"} color={white} />
          </RegularButton>
        )}
        <ResendTimer
          activeResend={activeResend}
          setActiveResend={setActiveResend}
          resendStatus={resendStatus}
          resendingEmail={resendingEmail}
          resendEmail={resendEmail}
        />
      </ScrollView>
    </MainContainer>
  );
};
export default EmailVerification;
