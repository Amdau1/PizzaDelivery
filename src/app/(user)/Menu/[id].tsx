import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { Stack } from "expo-router";
import products from "@assets/data/products";
import Button from "@/components/Button";
import { useCart } from "@/Provider/cartProvider";
import { PizzaSize } from "@/types";
import { defaultPizza } from "@/components/ProductListItem";

const Size: PizzaSize[] = ['S', 'M', 'L', 'XL'];
const ProductDetailsScreen= () => {
    const {id} = useLocalSearchParams();
    const{addItem} = useCart();
    const router = useRouter();
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
    const product = products.find((p) => p.id.toString() == id);
    const addToCart = () => {
        if(!product){
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart');
    }
    if(!product){
        return <Text>Product Not Found</Text>
    }
    return(
        <View style = {styles.container}>
            <Stack.Screen options={{title: product?.name}}/>
            <Image source = {{uri: product.image || defaultPizza}} style = {styles.image}/>
            <Text>Select Size</Text>
            <View style = {styles.sizes}>
                {Size.map((size) => (
                <Pressable onPress={() => {setSelectedSize(size)}}
                style = {[styles.size, {backgroundColor: selectedSize == size? 'lightblue' : 'white'}]}key = {size}>
                <Text style = {[styles.sizeText, {color: selectedSize == size? 'black' : 'gray'}]}>{size}</Text>
                </Pressable>
                ))}
            </View>
            <Text style = {styles.price}>Price: ${product.price} {        
            }</Text>
            <Button onPress = {addToCart} text = "Add to cart"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    price: {
        fontSize: 20,
        marginTop: 'auto'
    },
    size: {
        backgroundColor: 'lightblue',
        width: 50,
        height: 50,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    },
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    sizeText:{
        fontSize: 20,
        fontWeight: '500'
    }
})
export default ProductDetailsScreen