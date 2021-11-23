import React from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Image
} from 'react-native';
import {
    Text,
    Subheading, 
    Divider,
    Button,
    List,
    Dialog,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTurnByIdTable } from "../store/thunk/thunk-turn";
import { currencyFormat } from "../component/fomat";
import { Ionicons } from 'react-native-vector-icons';
import { turnSlice} from "../store/slices/slice-turn";
import { fetchInsertBill, fetchCreateBill } from "../store/thunk/thunk-order";
import { Socket } from 'socket.io-client';

const Item = ({ item, index }) => {
    const [ expanded, setExpanded ] = React.useState(item.id === 0);
    const handlePress = () => setExpanded(!expanded);

    const dispatch = useDispatch();
    const { table } = useSelector((state) => state.setting);

    const onOrderBill = () => {
        dispatch(fetchInsertBill());
        dispatch(fetchAllTurnByIdTable(table));
    }

    return (
        <List.Section style={{backgroundColor: "white"}}>
            <List.Accordion
                style={{backgroundColor: "white"}}
                titleStyle={{fontSize: 20}}
                title={`Lượt #${index + 1}`}
                left={props => <Ionicons {...props} name={item.id === 0 ? "alarm" :"checkmark-circle"} 
                    color={item.id === 0 ? "gray" :"green"} size={40}/>}       
                expanded={expanded}
                onPress={handlePress}>
                <Divider />
                {item.arr && item.arr.map((itemTurn, index) => {
                    return (
                        <List.Item key={index}
                            title={
                                <View style={styles.card_content}>
                                 <View style={styles.text_content}>
                                     <Subheading style={styles.subheading_title}>{itemTurn.food_name}</Subheading>
                                     <Text style={{paddingTop: 10, paddingBottom: 5}}>Số lượng: {itemTurn.qty}</Text>
                                     <Text>Đơn giá: {currencyFormat(itemTurn.price)}</Text>
                                 </View>
                             </View>
                            } 
                            left={() => <Image source={{ uri: `${itemTurn.image}` }} style={styles.image_content}/>}    
                        />
                    )
                })}
                <Divider />
                <Subheading style={styles.subheading_total}>Tổng tiền: {currencyFormat(item.total)}</Subheading>
            </List.Accordion>
            {item.id === 0 && <Button onPress={onOrderBill} mode="contained" style={styles.button_order}>Gọi ngay</Button>}
        </List.Section>
    );
}

const Turn = ({ navigation }) => {
    const dispatch = useDispatch();
    const { list_turn, bill, is_paided } = useSelector((state) => state.turn);
    const [ turns, setTurns ] = React.useState(list_turn ? list_turn.turns : undefined);
    const { list_order } = useSelector((state) => state.menu);
    const [ billTotal, setBillTotals ] = React.useState(list_turn ? list_turn.turns : undefined);
    const [ bills, setBills ] = React.useState(bill);
    const { socket } = useSelector((state) => state.socket);
    const { table } = useSelector((state) => state.setting);

    React.useEffect(()=> {
        list_turn && setTurns(list_turn);
        // list turn
        let tmpTotal = 0;
        list_turn && list_turn.map((obj) => {
            tmpTotal += obj.total;
        });
        // list order
        if (list_order) {
            tmpTotal += list_order.total;
        }
        setBillTotals(tmpTotal);
        if (!list_turn) {
            setTurns(undefined);
        }
        setBills(bill);
    }, [list_turn, list_order, bill]);

    const [visible, setVisible] = React.useState(false);
    const showDialog = () => {
        setVisible(true);
    }
    const hideDialog = () => {
        setVisible(false);
    };

    const onApply = () => {
        dispatch(turnSlice.actions.setIsPaided(true));
        socket && socket.emit("pay", table);
        hideDialog();
    };

    const renderItem = ({ item, index }) => {
        return <Item item={item} index={index}/>
    };

    return (
        <View style={{ flex: 9, justifyContent: "center", marginBottom: 10 }}>
            <SafeAreaView style={styles.area_view}>
                {(turns || list_order) && <FlatList
                    data={list_order && list_order.arr.length > 0 
                        ? turns ? [...turns, list_order] : list_order
                        : turns}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(index)}
                />}
            </SafeAreaView>
            <View style={styles.view_pay}>
                <Subheading style={styles.subheading}>Tổng: {currencyFormat(billTotal)}</Subheading>
                {!is_paided ? billTotal || bills
                ? <Button onPress={showDialog} mode="contained" style={styles.button_pay}>
                        Thanh toán 
                    </Button>
                : <Button style={styles.button_add} mode="contained" onPress={() => {
                        navigation.navigate("Menu");
                        dispatch(fetchCreateBill());
                    }}
                >
                        Hóa đơn mới
                    </Button> 
                : <></>}
            </View>
            <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
                <Dialog.Content>
                    <Subheading>Bạn có muốn thanh toán !</Subheading>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button style={styles.button_dialog} mode="contained" onPress={onApply}>
                        Chấp nhận
                    </Button>
                    <Button style={styles.button_dialog} mode="contained" onPress={hideDialog}>
                        Hủy
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    );
}

const styles = StyleSheet.create({
    area_view: {
        flex: 1,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 20,
    },
    view_pay: {
        backgroundColor: "#fff", 
        marginLeft: 10, 
        marginRight: 10, 
    },
    subheading: {
        fontSize: 22,
        textAlign: "center",
        fontWeight: "bold",
        paddingRight: 10,
        marginTop: 20,
        marginBottom: 20,
        color: "#1C8DFF"
    },
    button_pay: {
        backgroundColor: "#1C8DFF",
    },
    button_add: {
        backgroundColor: "#FF6347",
    },
    dialog: {
    },
    button_dialog: {
        backgroundColor: "#FF6347",
        margin: 5
    },
    bill_container: {
        flex: 0,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        backgroundColor: "white",
    },
    turn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 5,
        paddingRight: 5,
    },  
    card_container: {
        flex: 1,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    card: {
        marginTop: 10,
        marginBottom: 10,
        justifyContent: "space-between",
        paddingLeft: 5,
        paddingRight: 5,
    },  
    card_content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20,
        marginLeft: 10,
    },
    content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    image_content: {
        width: 90,
        height: 90,
        marginTop: 20,
        marginBottom: 30,
    },
    text_content: {
        paddingLeft: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: 'flex-start',
    },
    button_content: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    button_plus_minus: {
        marginRight: 10,
        color: "tomato"
    },
    subheading_title: {
        textAlign: "right",
        fontWeight: "bold",
        color: "tomato"
    },
    subheading_total: {
        fontSize: 20,
        textAlign: "right",
        fontWeight: "bold",
        paddingRight: 10,
        marginTop: 20,
        marginBottom: 30,
    },
    button_order: {
        backgroundColor: "#FF6347",
        width: 150,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 20
    },
});

export default Turn;