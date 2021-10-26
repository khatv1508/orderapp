import { Ionicons } from 'react-native-vector-icons';
import React from "react";
import {
    StyleSheet,
    View,
} from 'react-native';
import { Badge } from 'react-native-paper';
import { useSelector } from 'react-redux';

const icons = {
    "Home": 'home',
    "Menu": 'ios-fast-food',
    "Setting": 'ios-settings',
    "Order": "ios-cart"
};

const BadgeIcon = ({ routeName, color, size }) => {
    const { list_order } = useSelector((state) => state.menu);
    const [orderCount, setOrderCount] = React.useState(list_order ? list_order.arr.length : 0);

    React.useEffect(() => {
        list_order && setOrderCount(list_order.arr.length);
    }, [list_order]);

    return <View>
        <Ionicons name={icons[routeName]} color={color} size={size} />
        {routeName === "Order" && orderCount > 0 && <Badge style={styles.badge}>{orderCount}</Badge>}
    </View>
}

const styles = StyleSheet.create({
    badge: {
        position: "absolute",
        top: -10,
        right: -10,
    }
});

export default BadgeIcon;