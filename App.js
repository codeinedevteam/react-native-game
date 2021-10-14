import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreens';
import GameScreen from './screens/GameScreen';
import GameOverSccreen from './screens/GameOverScreen';

export default function App() {
	const [ userNumber, setUserNumber ] = useState();
	const [ guessRounds, setGuessRounds ] = useState(0);

	const configureNewGameHandler = () => {
		setGuessRounds(0);
		setUserNumber(null);
	};

	const startGameHandler = (selectedNumber) => {
		setUserNumber(selectedNumber);
	};
	const gmaeOverHandler = (numOfRounds) => {
		setGuessRounds(numOfRounds);
	};

	let content = <StartGameScreen onStartGame={startGameHandler} />;

	if (userNumber && guessRounds <= 0) {
		content = <GameScreen userChoice={userNumber} onGameOver={gmaeOverHandler} />;
	} else if (guessRounds > 0) {
		content = (
			<GameOverSccreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
		);
	}

	return (
		<View style={styles.screen}>
			<Header title="Guess Number" />
			{content}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1
	}
});
