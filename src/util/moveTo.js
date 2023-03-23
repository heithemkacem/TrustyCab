// Description: This file is used to navigate to a screen
export const moveTo = (navigation, screen, payLoad) => {
  navigation.navigate(screen, { ...payLoad });
};
