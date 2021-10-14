import React from 'react'
import { View,Text,StyleSheet,Button } from 'react-native'

const GameOverSccreen = props =>{
return (
    <View style={styles.screen}>
        <Text>The Game is over</Text>
        <Text>num rounds {props.roundsNumber}</Text>
        <Text>num was {props.userNumber}</Text>
        <Button title="NEW Game" onPress={props.onRestart}/>

    </View>
)
}
export default  GameOverSccreen
const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})