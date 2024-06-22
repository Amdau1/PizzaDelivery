import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { Stack } from "expo-router";
import products from "@assets/data/products";
import Button from "@/components/Button";
import { useCart } from "@/Provider/cartProvider";
import { defaultPizza } from "@/components/ProductListItem";
import { PizzaSize } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

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
                <Stack.Screen options={{title: 'Menu',headerRight: () => (
                <Link href={`/(admin)/Menu/create?id=${id}`} asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="pencil"
                        size={25}
                        color={Colors.light.tint}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              ),}}/>
            <Stack.Screen options={{title: product?.name}}/>
            <Image source = {{uri: product.image || defaultPizza}} style = {styles.image}/>
            <Text style = {styles.price}>{product.name} {        
            }</Text>
            <Text style = {styles.price}>Price: ${product.price} {        
            }</Text>
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
    },
})
export default ProductDetailsScreen