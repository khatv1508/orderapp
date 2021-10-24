import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { snackBarSlice } from "../../store/slices/slice-snack-bar";

const MySnackBar = () => {
    const onDismissSnackBar = () => {
      setVisible(false);
    }

    const { isOpen, message } = useSelector((state) => state.snackBar);
    const [visible, setVisible] = React.useState(isOpen);

    React.useEffect(() => {
      setVisible(isOpen);
    }, [isOpen]);
  
    return (
      <View>
        {isOpen ?
        <Snackbar
          style={styles.snack_bar}
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={3000}>
            <Text alignItems="center">{message}</Text>
        </Snackbar> : <></>
        } 
      </View>
    );
  };

  const styles = StyleSheet.create({
    snack_bar: {
      marginTop: 20,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#5EBA7D"
    }
  });
  
  export default MySnackBar;