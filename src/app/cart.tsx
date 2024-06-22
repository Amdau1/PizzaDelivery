import {Text, View, FlatList } from "react-native";
import { useCart } from "../Provider/cartProvider";
import CartListItem from "../components/CartListItem";
import { StyleSheet } from "react-native";
import Button from "../components/Button";

const cartScreen= () => {
    const {items, total} = useCart();
    return(
        <View style ={{padding: 10}}>
            <Text style = {styles.txt}>This is the cart{items.length}</Text>
            <FlatList data={items} renderItem={({item}) => <CartListItem cartItem={item}/>}
            contentContainerStyle={{padding: 10, gap : 10}}/>
            <Text style ={{color: 'white', marginTop: 10, fontSize: 20, fontWeight: 500,}}>Total: ${total}</Text>
            <Button text="Checkout"></Button>
        </View>
    );
};
const styles = StyleSheet.create({
    txt: {
      color: 'white',
    },
  });

export default cartScreen;