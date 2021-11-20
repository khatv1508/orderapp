import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image,
    SafeAreaView,
    FlatList
} from 'react-native';
import {
    Button,
    Provider,
    Card,
    Title,
    Subheading,
    List
} from 'react-native-paper';
import { fetchAllMenu } from "../store/thunk/thunk-menu";
import { fetchAllFoodType } from "../store/thunk/thunk-food-type";
import { fetchAllTable } from "../store/thunk/thunk-setting";
import { fetchAllTurnByIdTable } from "../store/thunk/thunk-turn";
import { fetchCreateBill } from "../store/thunk/thunk-order";
import { useDispatch, useSelector } from 'react-redux';
import { currencyFormat } from "../component/fomat";

const Item = ({ item, index }) => {
    return (
        <List.Section style={styles.list}>
            <Subheading style={styles.text_list}>{`Lượt #${index + 1}`}</Subheading>
            <Subheading style={styles.subheading_total}>{currencyFormat(item.total)}</Subheading>
        </List.Section>
    );
}

function Home ({ navigation }) {
    const dispatch = useDispatch();
    const { table } = useSelector((state) => state.setting);
    const { bill } = useSelector((state) => state.turn);
    const [bills, setBills] = React.useState(bill);
    const { list_turn } = useSelector((state) => state.turn);
    const [ turns, setTurns ] = React.useState(list_turn ? list_turn.turns : undefined);

    React.useEffect(()=> {
        // bill
        setBills(bill);
        // list turn
        list_turn && setTurns(list_turn);
        let tmpTotal = 0;
        list_turn && list_turn.map((obj) => {
            tmpTotal += obj.total;
        });
    }, [bill, list_turn]);
    
    React.useEffect(() => {
        dispatch(fetchAllMenu());
        dispatch(fetchAllFoodType());
        dispatch(fetchAllTable());
        dispatch(fetchAllTurnByIdTable(table));
    }, []);
    
    const renderItem = ({ item, index }) => {
        return <Item item={item} index={index}/>
    };

    return (
        <Provider>
            {bills
            ? <Card style={styles.card}>
                <Image source={require('../assets/image/logo.png')} style={styles.image_logo}/>
                <View style={styles.title}>
                    <Title>Bàn #{table}</Title>
                    <Subheading style={styles.text_content}>Ngày/Giờ: {bills.check_in}</Subheading>
                </View>
                <SafeAreaView style={styles.area_view}>
                    {turns && <FlatList
                        data={turns}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => String(index)}
                    />
                    }
                    
                </SafeAreaView>
                <View style={styles.details}>
                    <Subheading style={styles.text_total}>
                        Tổng: {currencyFormat(bills.total)}
                    </Subheading>
                </View>
                <Button style={styles.button} mode="contained" onPress={() => navigation.navigate("Order")}>
                    Xem chi tiết
                </Button>
            </Card>
            : <View style={styles.container}>
                <Image 
                    source={require('../assets/image/empty.png')} 
                    style={styles.image}
                />
                <Text style={styles.text}>
                    <Text>Chưa có hóa đơn</Text>
                </Text>
                <Button style={styles.button} mode="contained" onPress={() => {
                    navigation.navigate("Menu");
                    dispatch(fetchCreateBill());
                }}>
                    Hóa đơn mới
                </Button>
            </View> 
            }
            
            
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30,
    },
    image: {
        width: 350,
        height: 350,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    text: {
        fontSize: 25,
        display: "flex",
        flexDirection: "row",
    },
    button: {
        width: 200,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "#FF6347",
    },
    card: {
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 30
    },
    image_logo: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 20,
    },
    card_content: {
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 20,
    },
    title: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    details:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 10,
    },  
    text_content: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18
    },
    text_total: {
        fontSize: 20, 
        fontWeight: "bold",
        color: "#1C8DFF",
    },
    list: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        marginLeft: 15,
        marginRight: 15,
    },
    text_list: {
        fontSize: 18
    },
    subheading_total: {
        fontSize: 18,
        paddingRight: 10,
    },
});

export default Home;