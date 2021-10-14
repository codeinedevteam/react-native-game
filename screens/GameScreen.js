import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	rndNum = Math.floor(Math.random() * (max - min) + min);

	if (rndNum === exclude) {
		return generateRandomBetween(min, max.exclude);
	} else {
		return rndNum;
	}
};

const GameScreen = (props) => {
	const [ currentGuess, setCurrentGuess ] = useState(generateRandomBetween(1, 100, props.userChoice));
	const [ rounds, setRounds ] = useState(0);
	const currnetLow = useRef(1);
	const currentHigh = useRef(100);

	useEffect(
		() => {
			if (currentGuess === props.userChoice) {
				props.onGameOver(rounds);
			}
		},
		[ currentGuess, props.userChoice, props.onGamrOver ]
	);

	const nextGuessHandler = (direction) => {
		if (
			(direction === 'lower' && currentGuess < props.userChoice) ||
			(direction === 'grater' && currentGuess > props.userChoice)
		) {
			Alert.alert("Don't lie!", 'you know that this is wrong...', [
				{
					text: 'sorry!',
					style: 'cancel'
				}
			]);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currnetLow.current = currentGuess;
		}

		const nextNumber = generateRandomBetween(currnetLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setRounds((curRounds) => curRounds + 1);
	};
	return (
		<View style={styles.screen}>
			<Text>Opponet's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
				<Button title="GRATER" onPress={nextGuessHandler.bind(this, 'grater')} />
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%'
	}
});

export default GameScreen;
