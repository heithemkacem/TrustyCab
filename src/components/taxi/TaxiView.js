import React, { useEffect } from "react";
import IconHeader from "../icons/IconHeader";
import StarsReview from "../stars/StarsReview";
import FixedStars from "../stars/FixedStars";
import { View, ScrollView, CheckBox, Text } from "react-native";
import BigText from "../texts/BigText";
import { colors } from "../colors";
import { Formik } from "formik";
import { CommentSchema } from "../../util/validationSchemas";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getComments,
} from "../../_actions/logicHandlerActions/userActions";
import StyledTextInputWithSubmit from "../inputs/StyledTextInputWithSubmit";
import { useState } from "react";
import LoginModel from "../modals/LoginModel";
const { white, black } = colors;

const TaxiView = ({ color, score, navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const taxi = useSelector((state) => state.taxi);
  let { isConnected, user } = auth;
  const [showModel, setShowModel] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    dispatch(getComments(taxi.taxi._id, setComments));
  });
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: color,
          padding: 20,
        }}
      >
        <FixedStars stars={score} />
        <IconHeader name="taxi" color={white} bgColor={color} />

        <BigText color={white}>
          This is {score === 3 ? "an avearge" : score > 3 ? "a good" : "a bad"}{" "}
          rating taxi
        </BigText>
      </View>
      <View
        style={{
          backgroundColor: color,
          padding: 40,
        }}
      >
        <StarsReview navigation={navigation} stars={score} />
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: color,
        }}
      >
        <Formik
          initialValues={{ comment: "" }}
          validationSchema={CommentSchema}
          onSubmit={(values, { setSubmitting }) => {
            isConnected
              ? dispatch(
                  addComment(
                    values.comment,
                    taxi.taxi._id,
                    user.id,
                    isSelected,
                    setSubmitting
                  )
                )
              : setShowModel(true);
            setSubmitting(false);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            errors,
            touched,
          }) => (
            <>
              <StyledTextInputWithSubmit
                icon="comment"
                placeholder={"Enter your comment here..."}
                autoCapitalize="none"
                onChangeText={handleChange("comment")}
                onBlur={handleBlur("comment")}
                style={{ marginBottom: 25 }}
                value={values.comment}
                errors={touched.comment && errors.comment}
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CheckBox value={isSelected} onValueChange={setIsSelected} />

                {isSelected ? (
                  <Text> not an anonymous comment : {"👎"}</Text>
                ) : (
                  <Text> an anonymous comment : {"👍"}</Text>
                )}
              </View>
            </>
          )}
        </Formik>

        <LoginModel
          modalVisible={showModel}
          buttonText="Go to login"
          headerText="Login required !"
          message="Please connect to the your account to comment on the taxi"
          navigation={navigation}
          setModalVisible={setShowModel}
        />
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: color,
        }}
      >
        {comments?.map((commentObject, index) => (
          <View
            key={index}
            style={{
              backgroundColor: white,
              padding: 20,
              borderRadius: 10,
              marginBottom: 20,
            }}
          >
            {commentObject.showUser === true ? (
              <Text style={{ fontWeight: "bold", color: black }}>
                {commentObject.userName}
              </Text>
            ) : (
              <Text style={{ fontWeight: "bold", color: black }}>
                Anonymous
              </Text>
            )}
            <Text>{commentObject.comment}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TaxiView;
