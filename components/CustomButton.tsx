import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../assets';
import scaler from '../utils/scaler';

const {width, height} = Dimensions.get('window');

type CustomButtonProps = {
  title: string;
  buttonStyles?: any;
  isFilled: boolean;
  onClick: () => void;
};

const CustomButton = ({
  title,
  buttonStyles,
  isFilled,
  onClick,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        isFilled ? styles.btnFilled : styles.btnHollow,
        styles.btnContainer,
        buttonStyles,
      ]}>
      <Text
        style={[
          isFilled ? styles.btnFilledName : styles.btnHollowName,
          styles.btnName,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    width: width * 0.4,
  },
  btnFilled: {
    backgroundColor: COLORS.primaryBlue,
  },
  btnHollow: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primaryBlue,
    borderWidth: 1,
  },
  btnName: {
    fontSize: scaler(13),
    fontWeight: '500',
  },
  btnFilledName: {
    color: COLORS.white,
  },
  btnHollowName: {
    color: COLORS.primaryBlue,
  },
});
