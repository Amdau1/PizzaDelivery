import { StyleSheet,Text, Pressable, Image } from 'react-native';
import Col from '../constants/Colors';
import { Product } from '@/types';
import { Link, useSegments } from 'expo-router';
export const defaultPizza = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';
type ProductListItemProps = {
    product:Product;
}
const ProductListItem = ({product}: ProductListItemProps)  => {
  const segments = useSegments();
  console.log(segments)
  return(
    <Link href={`/${segments[0]}/Menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
      <Image source={{uri: product.image || defaultPizza}} 
      style = {styles.image} 
      resizeMode="contain"/>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price} >${product.price}</Text>
    </Pressable>
    </Link>
  );
}

export default ProductListItem;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 30,
    flex: 1,
    maxWidth: '50%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  price: {
    color: Col.light.tint,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});