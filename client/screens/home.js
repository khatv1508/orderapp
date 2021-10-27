import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Image
} from 'react-native';
import {
    Button,
    Provider,
} from 'react-native-paper';
import { fetchAllMenu } from "../store/thunk/thunk-menu";
import { fetchAllFoodType } from "../store/thunk/thunk-food-type";
import { fetchAllTable } from "../store/thunk/thunk-setting";
import { useDispatch } from 'react-redux';

function Home ({ navigation }) {
    const dispatch = useDispatch();

    dispatch(fetchAllMenu());
    dispatch(fetchAllFoodType());
    dispatch(fetchAllTable());
    return (
        <Provider>
            <View style={styles.container}>
                <Image 
                    source={require('../assets/image/empty.png')} 
                    style={styles.image}
                />
                <Text style={styles.text}>
                    <Text>Chưa có hóa đơn</Text>
                </Text>
                
                <Button style={styles.button} mode="contained" 
                    onPress={() => navigation.navigate("Menu")}
                >
                    Thêm hóa đơn 
                </Button>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
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
        marginBottom: 20,
        backgroundColor: "#FF6347",
    },
});

export default Home;