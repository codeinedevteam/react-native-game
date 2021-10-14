import React, { useState } from 'react';
import Card from '../components/Card';
import { StyleSheet, Text, View, Button, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import colors from './constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';

const StartGameScreen = (props) => {
	const [ enteredValue, setEnteredValue ] = useState('');
	const [ confirmed, setConfiremed ] = useState(false);
	const [ selectedNumber, setSelectedNumber ] = useState();

	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ''));
	};
	const resetInputHandler = () => {
		setEnteredValue('');
		setConfiremed(false);
	};
	const confirmInputHandler = () => {
		const choseNumber = parseInt(enteredValue);
		if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
			Alert.alert('invalid Number', 'number has to be number between 1 and 99 ', [
				{ text: 'Okey', style: 'destructive', onPress: resetInputHandler }
			]);

			return;
		}
		setConfiremed(true);
		setSelectedNumber(choseNumber);
		setEnteredValue('');
		Keyboard.dismiss()
	};

	let confirmedOutput;
	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You selected</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<Button title="START GAME" onPress={()=>props.onStartGame(selectedNumber)}/>
			</Card>
		);
	}
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={styles.screen}>
				<Text style={styles.title}>Start a New Game!</Text>
				<Card style={styles.inputContainer}>
					<Text>Select a Number</Text>
					<Input onChangeText={numberInputHandler} value={enteredValue} maxLength={2} style={styles.input} />
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button title="Reset" onPress={resetInputHandler} color={colors.accent} />
						</View>
						<View style={styles.button}>
							<Button title="Confrim" onPress={confirmInputHandler} color={colors.primary} />
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		marginVertical: 10
	},
	inputContainer: {
		width: 300,
		maxWidth: '80%',
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15
	},
	button: {
		width: 100
	},
	input: {
		width: 50
	},
	summaryContainer: {
		marginTop: 20,
		alignItems:"center"
	}
});

export default StartGameScreen;
