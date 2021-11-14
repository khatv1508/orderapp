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
    Provider,
    RadioButton,
    TextInput,
    Subheading
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { settingSlice} from "../store/slices/slice-setting";
import { menuSlice } from '../store/slices/slice-menu';
// import { turnSlice} from "../store/slices/slice-turn";
import { fetchAllTurnByIdTable } from "../store/thunk/thunk-turn";

function Setting () {
    const [ visible, setVisible ] = React.useState(false);

    const showDialog = () => {
        setVisible(true);
    }

    const hideDialog = () => {
        setVisible(false);
        setText(undefined);
    };

    const onApply = () => {
        dispatch(settingSlice.actions.setTable(checked));
        
        // xoa du lieu cua table hien tai
        // // bill
        // dispatch(turnSlice.actions.setBill(undefined));
        // // list_turn
        // dispatch(turnSlice.actions.setListTurn(undefined));
        // list_order
        dispatch(menuSlice.actions.setListOrder({
            "arr": [],
            "id": 0,
            "total": 0,
        }));

        // update 
        // bill, list_turn
        dispatch(fetchAllTurnByIdTable(checked));

        hideDialog();
    };

    const [ checked, setChecked ] = React.useState(1);

    const [ text, setText ] = React.useState("admin");

    const { list_table, table } = useSelector((state) => state.setting);
    const dispatch = useDispatch();

    const [ tables, setTables ] = React.useState(list_table);

    React.useEffect(() => {
        setTables(list_table);
    }, [list_table]);
    
    return (
        <Provider>
            <View style={styles.title}>
                <Image 
                    source={require('../assets/image/deviceMobile.png')} 
                    style={styles.image}
                />
                <Text style={styles.text}>Thiết bị này là bàn {table}</Text>
                <Button style={styles.button} mode="contained" onPress={showDialog}>
                    Chỉnh sửa 
                </Button>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Content>
                        <TextInput
                            label="Admin Pass"
                            value={"admin"}
                            onChangeText={text => setText(text)}
                            secureTextEntry
                            style={styles.text_input}
                        />
                        <Subheading>Chọn một sự lựa chọn</Subheading>
                        {tables && tables.map((table, index) => {
                            return (
                                <RadioButton.Group 
                                    onValueChange={value => setChecked(value)} 
                                    value={checked} 
                                    key={index}
                                    >
                                    <RadioButton.Item label={`Bàn ${table.table_number}`} value={table.table_id} />
                                </RadioButton.Group>
                            )
                        })} 
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button style={styles.button_dialog} mode="contained" onPress={onApply} disabled={text === undefined}>
                            Chấp nhận
                        </Button>
                        <Button style={styles.button_dialog} mode="contained" onPress={hideDialog}>
                            Hủy
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
    },
    text_input: {
        marginBottom: 20
    }
});

export default Setting;