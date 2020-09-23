import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

const renderListItems = (value, numOfRound) => {
	return (
		<View key={value} style={styles.listItem}>
			<BodyText>#{numOfRound}</BodyText>
			<BodyText>{value}</BodyText>
		</View>
	);
};

const GameScreen = (props) => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [ currentGuess, setCurrentGuess ] = useState(initialGuess);
	const [ pastGuesses, setPastGuesses ] = useState([ initialGuess ]);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(
		() => {
			if (currentGuess === userChoice) {
				onGameOver(pastGuesses.length);
			}
		},
		[ currentGuess, userChoice, onGameOver ]
	);

	const nextGuessHandler = (direction) => {
		if (
			(direction === 'lower' && currentGuess < userChoice) ||
			(direction === 'greater' && currentGuess > userChoice)
		) {
			Alert.alert('Wrong Hint!', 'Please help me guess correctly!', [ { text: 'Understood', style: 'cancel' } ]);
			return;
		}

		if (direction === 'lower') {
			currentHigh.current = currentGuess + 1;
		} else {
			currentLow.current = currentGuess;
		}
		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		console.log(pastGuesses);
		setPastGuesses((curPastGuesses) => [ nextNumber, ...curPastGuesses ]);
	};

	return (
		<View style={styles.screen}>
			<TitleText>Opponent's Guess</TitleText>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				{/*Try Arrow functions */}
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItems(guess, pastGuesses.length - index))}
				</ScrollView>
			</View>
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
		width: 400,
		maxWidth: '90%'
	},
	listContainer: { flex: 1, width: Dimensions.get('window').width > 350 ? '60%' : '80%' },
	list: { flexGrow: 1, alignItems: 'center', justifyContent: 'flex-end' },
	listItem: {
		width: '80%',
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

export default GameScreen;
