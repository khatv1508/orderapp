import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    FlatList,
    SafeAreaView,
} from 'react-native';
import {
    Button,
    Text,
    FAB,
    Card,
    IconButton,
    Badge,
    Title,
    ActivityIndicator,
    Colors
} from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMenu, fetchAllMenuByType } from "../store/thunk/thunk-menu";
import { fetchAllFoodType } from "../store/thunk/thunk-food-type";
import { menuSlice } from '../store/slices/slice-menu';

const Item = ({ item, onPress, backgroundColor, textColor }) => {
    const { list_order } = useSelector((state) => state.menu);
    
    const [tmpOrder, setTmpOrder] = React.useState(list_order);
    // let tmpOrder = list_order;
    const [quantity, setQuantity] = React.useState(tmpOrder && tmpOrder.hasOwnProperty(item.id)
        ? tmpOrder[item.id] : 0);
    const dispatch = useDispatch();

    console.log("item", item.id, list_order);

    React.useEffect(() => {
        if (quantity > 0) {
            // them 
            dispatch(menuSlice.actions.setListOrder({
                ...list_order, 
                [item.id]: quantity
            }));
        } else {
            // xoa
            if (tmpOrder && tmpOrder.hasOwnProperty(item.id)) {
                dispatch(menuSlice.actions.setListOrder(delete list_order[item.id]));
            }
        }
    }, [quantity]);

    React.useEffect(() => {
        list_order && setTmpOrder(list_order);
    }, [list_order]);

    return (
        <Card item={item}
        onPress={onPress}
        backgroundColor={{ backgroundColor }}
        textColor={{ textColor }}
        style={styles.card}
        >
            <Card.Cover source={{ uri: `${item.image}` }}/>
            <View style={styles.card_content}>
                <View style={styles.text_content}>
                    <Title>{item.food_name}</Title>
                    <Text>Giá: {item.price} đ</Text>
                    <View style={styles.button_content}>
                        <IconButton 
                            icon="minus-circle-outline" 
                            size={35}
                            color={Colors.red500}
                            style={styles.button_plus_minus}
                            onPress={() => {
                                quantity > 0 && setQuantity(quantity - 1);
                            }}
                        />
                        <Text>{quantity}</Text>
                        <IconButton 
                            icon="plus-circle-outline" 
                            size={35}
                            color={Colors.red500}
                            style={styles.button_plus_minus}
                            onPress={() => {
                                setQuantity(quantity + 1);
                            }}
                        />
                    </View>
                </View>
            </View>
        </Card> 
    );
}

function Menu ({ navigation }) {

    const [ selectedId, setSelectedId ] = React.useState(null);

    const [ selectedType, setSelectedType ] = React.useState(3);

    const { list_menu, list_order } = useSelector((state) => state.menu);
    const { list_food_type } = useSelector((state) => state.foodType);

    const [foodTypes, setFoodTypes] = React.useState(list_food_type);
    const [menus, setMenus] = React.useState(list_menu);
    const [loading, setLoading] = React.useState(true);

    const [orderCount, setOrderCount] = React.useState(list_order ? Object.keys(list_order).length : 0);


    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchAllFoodType());
        if (selectedType > 0) {
            dispatch(fetchAllMenuByType(selectedType));
        } else {
            dispatch(fetchAllMenu());
        }
    }, []);

    React.useEffect(()=> {
        setMenus(list_menu);
        setLoading(false);
    }, [list_menu]);

    React.useEffect(()=> {
        setFoodTypes(list_food_type);
        setLoading(false);
    }, [list_food_type]);

    React.useEffect(() => {
        // console.log("menu", list_order && Object.keys(list_order).length);
        list_order && setOrderCount(Object.keys(list_order).length);
    }, [list_order]);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
        const color = item.id === selectedId ? 'white' : 'black';
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}> 
                <ScrollView horizontal={true} style={styles.scroll}>
                    <Button mode="outlined" onPress={() => {
                        setSelectedType(0);
                        dispatch(fetchAllMenu());
                    }}
                        style={selectedType === 0 ? styles.button_active : styles.button}
                        icon={() => (
                            <Image 
                                source={require('../assets/image/all.png')} 
                                style={styles.image}
                            />
                        )}>
                        <Text style={styles.text}>All</Text>
                    </Button>
                    {foodTypes && foodTypes.map((item, index) => {
                        return <Button key={index} mode="outlined" 
                            onPress={() => {
                                setSelectedType(item.type_id);
                                dispatch(fetchAllMenuByType(item.type_id));
                            }}
                            style={item.type_id === selectedType ? styles.button_active : styles.button}
                            icon={() => (
                                <Image 
                                    source={{ uri: item.type_image }} 
                                    style={styles.image}
                                />
                            )}>
                            <Text style={styles.text}>{item.type_name}</Text>
                        </Button>
                    })}
                </ScrollView>
            </View>
            <View style={{ flex: 9, justifyContent: "center" }}>
            {loading ? <ActivityIndicator animating={true}/> : 
                <SafeAreaView style={styles.area_view}>
                    <FlatList
                        data={menus}
                        renderItem={renderItem}
                        keyExtractor={(item) => String(item.id)}
                        extraData={selectedId}
                    />
                </SafeAreaView>
            }
                
                <FAB
                    style={styles.fab}
                    icon={() => (
                        <View>
                            <Image 
                                source={require('../assets/image/bill.png')} 
                                style={styles.image_fab}
                            />
                             <Badge style={styles.badge}>{orderCount}</Badge>
                        </View>
                        
                    )}
                    onPress={() => navigation.navigate("Home")}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },  
    search: {
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 30
    },
    image: {
        width: 30,
        height: 30,
    },
    button: {
        backgroundColor: "#fff",
        borderRadius: 30,
        margin: 5,
        height: 40
    },
    button_active: {
        backgroundColor: "#FF917D",
        borderRadius: 30,
        margin: 5,
        height: 40
    },
    scroll: {
        marginTop: 10
    },
    area_view: {
        marginTop: 15
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#FF917D"
    },
    image_fab: {
        width: 50,
        height: 50,
        marginTop: -14,
        marginLeft: -12,
    },
    card: {
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 20,
    },  
    card_content: {
        display: "flex",
        // flexDirection: "row",
        alignItems: "center",
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 20,
    },
    image_content: {
        width: 200,
        height: 200,
        marginTop: 20,
        marginBottom: 30,
    },
    text_content: {
        paddingLeft: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: 'center'
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
    badge: {
        position: "absolute",
        top: -10,
        right: -10,
    }
  });

export default Menu;