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
    Card,
    IconButton,
    Title,
    ActivityIndicator,
    Colors
} from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';
import { fetchAllMenuByType } from "../store/thunk/thunk-menu";
import { menuSlice } from '../store/slices/slice-menu';
import { currencyFormat } from "../component/fomat";

const Item = ({ item, onPress}) => {
    const { list_order } = useSelector((state) => state.menu);
    const [ tmpOrder, setTmpOrder ] = React.useState(list_order ? list_order.arr : []);
    
    const checkIdExist = () => {
        if (tmpOrder) {
            let tmpElement = tmpOrder.filter(obj => obj.menu_id === item.id)[0];
            return tmpElement ? tmpElement.qty : 0;
        } else {
            return 0;
        }
    }
    const [ quantity, setQuantity ] = React.useState(0);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (quantity !== 0) {
            let tmpElement = tmpOrder.filter(obj => obj.menu_id === item.id)[0];
            if (quantity === 1 && !tmpElement) {
                // them
                setTmpOrder([
                    ...tmpOrder,
                    {
                        menu_id: item.id,
                        qty: quantity,
                        amount: item.price * quantity,
                        food_name: item.food_name,
                        image: item.image,
                        price: item.price,
                    }
                ]);
            } else {
                // update 
                setTmpOrder(tmpOrder.map((obj) => {
                    if (obj.menu_id === item.id) {
                        return {
                            ...obj, 
                            amount: item.price * quantity,
                            qty: quantity
                        }   
                    } else {
                        return obj;
                    }
                }));
            }
        } else {
            // xoa
            if (tmpOrder && checkIdExist() !== 0) {
                setTmpOrder(tmpOrder.filter(obj => obj.menu_id !== item.id));
            }
        }
    }, [quantity]);

    React.useEffect(() => {
        if (list_order) {
            setTmpOrder(list_order.arr);
        } else {
            setTmpOrder(undefined);
            setQuantity(0);
        }
    }, [list_order]);
    

    React.useEffect(() => {
        let tmpTotal = 0;
        if (tmpOrder) { 
            tmpOrder.forEach((obj) => {
                tmpTotal += obj.amount;
            });
            dispatch(menuSlice.actions.setListOrder({
                id: 0,
                arr: tmpOrder,
                total: tmpTotal
            }));
            setQuantity(checkIdExist());
        }
    }, [tmpOrder]);

    return (
        <Card item={item} onPress={onPress} style={[styles.card, quantity > 0 ? styles.card_active : ""]}>
            <Card.Cover source={{ uri: `${item.image}` }}/>
            <View style={styles.card_content}>
                <View style={styles.text_content}>
                    <Title>{item.food_name}</Title>
                    <Text>Đơn giá: {currencyFormat(item.price)}</Text>
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

function Menu () {
    const [ selectedId, setSelectedId ] = React.useState(null);
    const { list_all_menu, list_menu, current_food_type } = useSelector((state) => state.menu);
    const { list_food_type } = useSelector((state) => state.foodType);

    const [ foodTypes, setFoodTypes ] = React.useState(list_food_type);
    const [ menus, setMenus ] = React.useState(list_menu);
    const [ loading, setLoading ] = React.useState(true);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (current_food_type > 0) {
            dispatch(fetchAllMenuByType(current_food_type));
        }
    }, []);

    React.useEffect(()=> {
        if (current_food_type === 0) {
            dispatch(menuSlice.actions.setListMenu(list_all_menu));
        }
    }, [list_all_menu]);

    React.useEffect(()=> {
        setMenus(list_menu);
        setLoading(false);
    }, [list_menu]);

    React.useEffect(()=> {
        setFoodTypes(list_food_type);
        setLoading(false);
    }, [list_food_type]);

    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
            />
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}> 
                <ScrollView horizontal={true} style={styles.scroll}>
                    <Button mode="outlined" onPress={() => {
                        dispatch(menuSlice.actions.setCurrentFoodType(0));
                        dispatch(menuSlice.actions.setListMenu(list_all_menu));
                    }}
                        style={current_food_type === 0 ? styles.button_active : styles.button}
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
                                dispatch(menuSlice.actions.setCurrentFoodType(item.type_id));
                                dispatch(fetchAllMenuByType(item.type_id));
                            }}
                            style={item.type_id === current_food_type ? styles.button_active : styles.button}
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
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    card_active: {
        backgroundColor: "#B6D3C6",
    },  
    card_content: {
        display: "flex",
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