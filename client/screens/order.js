import React from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
} from 'react-native';
import {
    Text,
    Card,
    Title,
    Subheading, 
    Divider,
    Button
} from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAllTurnByIdTable } from "../store/thunk/thunk-turn";
import { currencyFormat } from "../component/fomat";
import { Ionicons } from 'react-native-vector-icons';

const Item = ({ item, index }) => {
    return (
        <View style={styles.card_container}>
            <Card item={item} style={styles.card}>
                <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Ionicons name={item.id === 0 ? "alarm" :"checkmark-circle"} 
                            color={item.id === 0 ? "gray" :"green"} size={40}/>
                        <Title style={{paddingTop: 20, paddingBottom: 20, paddingLeft: 10}}>Lượt #{index + 1}</Title>
                    </View>
                    {item.id === 0 && 
                    <Button onPress={() => console.log("order")} mode="contained" style={styles.button_order}>
                        Gọi món ngay
                    </Button>}
                </View>
                <Divider />
                {item.arr && item.arr.map((itemTurn, index) => {
                    return (
                        <View key={index} style={{display: "flex", flexDirection: "row"}}>
                            <Card.Cover source={{ uri: `${itemTurn.image}` }} style={styles.image_content}/>
                            <View style={styles.card_content}>
                                <View style={styles.text_content}>
                                    <Subheading style={styles.subheading}>{itemTurn.food_name}</Subheading>
                                    <Text style={{paddingTop: 10, paddingBottom: 5}}>Số lượng: {itemTurn.qty}</Text>
                                    <Text>Đơn giá: {currencyFormat(itemTurn.price)}</Text>
                                    
                                </View>
                            </View>
                        </View>
                    )
                })}
                <Divider />
                <Subheading style={styles.total}>Tổng tiền: {currencyFormat(item.total)}</Subheading>
            </Card>
        </View> 
    );
}
    

const Turn = () => {

    const dispatch = useDispatch();
    const { list_turn } = useSelector((state) => state.turn);
    const [turns, setTurns] = React.useState(list_turn ? list_turn.turns : undefined);

    const { list_order } = useSelector((state) => state.menu);

    React.useEffect(()=> {
        list_turn && setTurns(list_turn.turns);
    }, [list_turn]);

    React.useEffect(() => {
        dispatch(fetchAllTurnByIdTable(1));
    }, []);

    const renderItem = ({ item, index }) => {
        return <Item item={item} index={index}/>
    };

  return (
      <View style={{ flex: 9, justifyContent: "center", marginBottom: 10 }}>
        <SafeAreaView style={styles.area_view}>
            {turns && <FlatList
                data={list_order && list_order.arr.length > 0 ? [...turns, list_order] : turns}
                renderItem={renderItem}
                keyExtractor={(item, index) => String(index)}
            />}
        </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
    area_view: {
        flex: 1,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
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
    subheading: {
        textAlign: "right",
        fontWeight: "bold",
        color: "tomato"
    },
    total: {
        fontSize: 20,
        textAlign: "right",
        fontWeight: "bold",
        paddingRight: 10,
        marginTop: 20,
        marginBottom: 30,
    },
    button_order: {
        backgroundColor: "#FF6347",
    },
});

export default Turn;