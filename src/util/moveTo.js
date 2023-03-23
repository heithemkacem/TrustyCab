export const moveTo = (navigation, screen, payLoad) => {
  navigation.navigate(screen, { ...payLoad });
};
