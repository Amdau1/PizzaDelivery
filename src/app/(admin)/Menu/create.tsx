import Button from '@/components/Button';
import { defaultPizza } from '@/components/ProductListItem';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen = () => {
    const [name , setName] = useState('');
    const [price, setPrice]  = useState('');
    const [error, setErrors] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const {id} = useLocalSearchParams();
    const isUpdating = !!id;
    const resetField = () => {
        setName('');
        setPrice('');
    }
    const validateInput = () => {
        if(!name){
            setErrors('Name is required')
            return false;
        }
        if(!price){
            setErrors('Price is required')
            return false;
        }
        if(isNaN(parseFloat(price))){
            setErrors('Price is not a number')
            return false;
        }
        return true;
    }
    const onSubmit = () => {
        if(isUpdating){
            onUpdate();
        }
        else{
            onCreate();
        }
    }
    const onCreate =()=>{
        if(!validateInput()){
            return;
        }
        console.warn("Creating new item")
        resetField();
    }
    const onUpdate =()=>{
        if(!validateInput()){
            return;
        }
        console.warn("Update Item")
        resetField();
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };
    const onDelete = () => {
        console.warn('delete');
    }
    const confirmDelete = () => {
        Alert.alert("CONFIRM", "Are you sure you want to delete this product", [{text: 'Cancel'}, {text: 'Delete', style: 'destructive', onPress: onDelete}])
    }
    return(
        <View style ={styles.container}>
            <Stack.Screen options = {{title: isUpdating? 'Update Product':'Create Product'}}/>
            <Image source ={{uri : image || defaultPizza}} style = {styles.image}/>
            <Text onPress= {pickImage}style = {styles.imageText}>Select an image</Text>
            <Text style = {styles.label}>Name</Text>
            <TextInput
             value= {name}
             onChangeText={setName}
             placeholder='name' 
             style = {styles.input}/>
            <Text style = {styles.label}>Price</Text>
            <TextInput value = {price} onChangeText = {setPrice} placeholder='$9.99' style = {styles.input} keyboardType='numeric'/>
            <Text style = {{color: 'red'}}>{error}</Text>
            <Button onPress= {onSubmit} text={isUpdating? 'Update Product':'create'}/>
            {isUpdating && <Text onPress={confirmDelete} style = {styles.imageText}> Delete</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    input: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        padding: 10,
    },
    image: {
        width: "50%",
        aspectRatio: 1,
        alignSelf: 'center',
    },
    imageText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: 'lightblue',
        marginVertical: 10,
    }
})
export default CreateProductScreen;