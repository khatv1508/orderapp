import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image 
} from 'react-native';
import {
    Button,
    Dialog,
    Paragraph,
    Provider,
    RadioButton,
    TextInput 
} from 'react-native-paper';


function Setting () {
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => {setVisible(true);}

    const hideDialog = () => {
        setVisible(false);
        setText(undefined);
    };

    const [checked, setChecked] = React.useState(1);

    const [text, setText] = React.useState(undefined);
    
    return (
        <Provider>
            <View style={styles.title}>
                <Image 
                    source={require('../assets/image/deviceMobile.png')} 
                    style={styles.image}
                />
                <Text style={styles.text}>
                    <Text>Thiết bị này là bàn 1</Text>
                </Text>
                <Button style={styles.button} mode="contained" onPress={showDialog}>
                    Chỉnh sửa 
                </Button>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Content>
                        <TextInput
                            label="AdminPass"
                            value={text}
                            onChangeText={text => setText(text)}
                            secureTextEntry
                        />
                        <Paragraph>Choose an option</Paragraph>
                        <RadioButton.Group 
                            onValueChange={value => setChecked(value)} 
                            value={checked} 
                            >
                            <RadioButton.Item label="First item" value={1} />
                            <RadioButton.Item label="Second item" value={2} />
                            <RadioButton.Item label="First item" value={3} />
                            <RadioButton.Item label="Second item" value={4} />
                            <RadioButton.Item label="First item" value={5} />
                            <RadioButton.Item label="Second item" value={6} />
                        </RadioButton.Group>
                        
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button style={styles.button_dialog} mode="contained" onPress={hideDialog} disabled={text === undefined}>
                            Apply
                        </Button>
                        <Button style={styles.button_dialog} mode="contained" onPress={hideDialog}>
                            Cancel
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    title: {
        flex: 1,
        display: "flex",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
    },
    text: {
        fontSize: 30,
        display: "flex",
        flexDirection: "row",
    },
    text_radio: {
        fontSize: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    image: {
        width: 300,
        height: 300,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        backgroundColor: "#FF6347",
        borderRadius: 170,
    },
    button: {
        width: 150,
        marginBottom: 20,
        backgroundColor: "#FF6347",
    },
    button_dialog: {
        backgroundColor: "#FF6347",
        margin: 5
    },
    dialog: {
        position: "absolute"
    }
});

export default Setting;