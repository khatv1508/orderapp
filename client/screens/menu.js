import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    FlatList,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import {
    Button,
    Searchbar ,
    Text,
    FAB,
    Card,
    Subheading,
    IconButton,
    Badge
} from 'react-native-paper';
import HomeScreen from "./home";

const DATA = [
    {
        id: 1,
        title: "First Item",
    },
    {
        id: 2,
        title: "Second Item",
    },
    {
        id: 3,
        title: "Third Item",
    },
    {
        id: 4,
        title: "Third Item",
    },
    {
        id: 5,
        title: "Third Item",
    },
    {
        id: 6,
        title: "Third Item",
    },
  ];

const foodType = [{
    type_id: 1,
    type_name: "Combo",
    image: "../assets/image/combo.png"
  },
  {
    type_id: 2,
    type_name: "Combo2",
    image: "../assets/image/combo.png"
  },
  {
    type_id: 3,
    type_name: "Combo3",
    image: "../assets/image/combo.png"
  },
  {
    type_id: 4,
    type_name: "Combo4",
    image: "../assets/image/combo.png"
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => {
    const [quantity, setQuantity] = React.useState(0);
    return (
        <Card item={item}
        onPress={onPress}
        backgroundColor={{ backgroundColor }}
        textColor={{ textColor }}
        style={styles.card}
        >
            <View style={styles.card_content}>
                <Image 
                    source={require('../assets/image/combo.png')} 
                    style={styles.image_content}
                />
                <View style={styles.text_content}>
                    <Subheading>Dẻ sườn heo Iberico sốt Miso</Subheading>
                    <Text>Giá: 100.000đ</Text>
                    <View style={styles.button_content}>
                        <IconButton 
                            icon="minus-circle-outline" 
                            size={35}
                            style={styles.button_plus_minus}
                            onPress={() => {
                                quantity > 0 && setQuantity(quantity - 1);
                            }}
                        />
                        <Text>{quantity}</Text>
                        <IconButton 
                            icon="plus-circle-outline" 
                            size={35}
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
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const [selectedId, setSelectedId] = React.useState(null);

    const [selectedType, setSelectedType] = React.useState(null);

    

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
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.search}
            />
            <View style={{ flex: 1 }}> 
                <ScrollView horizontal={true} style={styles.scroll}>
                    {foodType.map((item, index) => {
                        return <Button key={index} mode="outlined" onPress={() => setSelectedType(item.type_id)} 
                        style={item.type_id === selectedType ? styles.button_active : styles.button}
                        icon={() => (
                            <Image 
                                source={require('../assets/image/combo.png')} 
                                style={styles.image}
                            />
                        )}>
                        <Text style={styles.text}>{item.type_name}</Text>
                    </Button>
                    })}
                    
                    {/* <Button mode="outlined" onPress={() => console.log('btn')} 
                        style={styles.button}
                        icon={() => (
                            <Image 
                                source={require('../assets/image/meat.png')} 
                                style={styles.image}
                            />
                        )}>
                        <Text style={styles.text}>Thịt</Text>
                    </Button>
                    <Button mode="outlined" onPress={() => console.log('btn')} 
                        style={styles.button}
                        icon={() => (
                            <Image 
                                source={require('../assets/image/crawfish.png')} 
                                style={styles.image}
                            />
                        )}>
                        <Text style={styles.text}>Hải sản</Text>
                    </Button>
                    <Button mode="outlined" onPress={() => console.log('btn')} 
                        style={styles.button}
                        icon={() => (
                            <Image 
                                source={require('../assets/image/hot-pot.png')} 
                                style={styles.image}
                            />
                        )}>
                        <Text style={styles.text}>Lẩu</Text>
                    </Button>
                    <Button mode="outlined" onPress={() => console.log('btn')} 
                        style={styles.button}
                        icon={() => (
                            <Image 
                                source={require('../assets/image/bowl-salad.png')} 
                                style={styles.image}
                            />
                        )}>
                        <Text style={styles.text}>Đồ ăn kèm</Text>
                    </Button>
                    <Button mode="outlined" onPress={() => console.log('btn')} 
                        style={styles.button}
                        icon={() => (
                            <Image 
                                source={require('../assets/image/drink-icon.png')} 
                                style={styles.image}
                            />
                        )}>
                        <Text style={styles.text}>Nước uống</Text>
                    </Button> */}
                </ScrollView>
            </View>
            <View style={{ flex: 9 }}> 
                <SafeAreaView style={styles.area_view}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => String(item.id)}
                        extraData={selectedId}
                    />
                </SafeAreaView>
                
                <FAB
                    style={styles.fab}
                    icon={() => (
                        <View>
                            <Image 
                                source={require('../assets/image/bill.png')} 
                                style={styles.image_fab}
                            />
                             <Badge style={styles.badge}>3</Badge>
                        </View>
                        
                    )}
                    onPress={() => console.log('page home')}
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
    area_view: {
        marginTop: 20
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
        marginBottom: 30
    },  
    card_content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 5,
        paddingRight: 5,
    },
    image_content: {
        width: 120,
        height: 120,
        marginTop: 20,
        marginBottom: 30,
    },
    text_content: {
        paddingLeft: 5,
        display: "flex",
        flexDirection: "column"
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
    },
    badge: {
        position: "absolute",
        top: -10,
        right: -10,
    }
  });

export default Menu;