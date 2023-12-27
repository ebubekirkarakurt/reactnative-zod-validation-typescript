import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native'
import React from 'react'


import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form';


type FormData = {
    firstName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const Form = () => {

    const schema = z.object({
        firstName : z.string().min(3).max(10),
        password : z.string().min(6).max(15),
        confirmPassword : z.string().min(6).max(15),
        email : z.string().email()
    })
    .refine((data) => data.password === data.confirmPassword,{
        message:'Passwords do not match',
        path:['confirmPassword']
    })
    
    const {
        register,
        control,
        formState: {errors},
        handleSubmit
    } = useForm<FormData>({
        resolver : zodResolver(schema)
    })
    
    const submit = (data : any) => {
        console.log("data: " + JSON.stringify(data))
        Alert.alert('Log-In', 'Sing-Up process is successfull. Welcome to us.', 
        [
            {
                text: 'OK', onPress: () => {
                    console.log('OK Pressed')
                }
            },
          ]);
    }

    return (
        <View>
           
            <Controller
                {...register('firstName')}
                rules={{
                    required:'FirstName required'
                }}
                control={control}
                render={({ field: {onChange, onBlur, value} })=>(
                        <TextInput
                            style={styles.textInput}
                            value={value}
                            placeholder='Firstname'
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )
                }
                name='firstName'
            />
            {errors.firstName && <Text style={styles.errorText}> {errors.firstName.message} </Text>}

            <Controller
                {...register('email')}
                rules={{
                    required:'Email required'
                }}
                control={control}
                render={({ field: {onChange, onBlur, value} })=>(
                        <TextInput
                            style={styles.textInput}
                            value={value}
                            placeholder='Email'
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )
                }
                name='email'
            />
            {errors.email && <Text style={styles.errorText}> {errors.email.message} </Text>}

            <Controller
                {...register('password')}
                rules={{
                    required:'Password required'
                }}
                control={control}
                render={({ field: {onChange, onBlur, value} })=>(
                        <TextInput
                            style={styles.textInput}
                            value={value}
                            placeholder='Password'
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )
                }
                name='password'
            />
            
            {errors.password && <Text style={styles.errorText}> {errors.password.message} </Text>}

            <Controller
                {...register('confirmPassword')}
                rules={{
                    required:'confirmPassword required'
                }}
                control={control}
                render={({ field: {onChange, onBlur, value} })=>(
                        <TextInput
                            style={styles.textInput}
                            value={value}
                            placeholder='Confirm Password'
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )
                }
                name='confirmPassword'
            />
            
            {errors.confirmPassword && <Text style={styles.errorText}> {errors.confirmPassword.message} </Text>}


            <TouchableOpacity
                style={styles.btn}
                onPress={handleSubmit(submit)}
            >
                <Text style={styles.btnText}> Login </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Form

const styles = StyleSheet.create({
    textInput : {
        backgroundColor:'lightgray',
        margin:15,
        padding:10,
        borderRadius:10
    },
    errorText : {
        fontSize:15,
        color:'red',
        paddingLeft:10
    },
    btn:{
        borderRadius:10,
        margin:30,
        padding:10,
        backgroundColor:'#ADD8E6',
    },
    btnText:{
        textAlign:'center',
        fontSize:16    
    }
})