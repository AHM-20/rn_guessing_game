import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
	return (
		<ScrollView>
			<View style={styles.screen}>
				<TitleText style={styles.title}>The Game is Over!</TitleText>
				<View style={styles.imageContainer}>
					<Image style={styles.image} source={require('../assets/success.png')} resizeMode="cover" />
				</View>
				<View style={styles.resultContainer}>
					<BodyText style={styles.resultText}>
						Your phone took <Text style={styles.highlight}>{props.roundsNumber}</Text> times to guess the
						number <Text style={styles.highlight}>{props.userNumber}</Text>
						.
					</BodyText>
				</View>
				<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: { padding: 5, fontSize: 20, marginVertical: 10, fontFamily: 'open-sans-bold' },
	imageContainer: {
		width: Dimensions.get('window').width * 0.7,
		height: Dimensions.get('window').width * 0.7,
		borderRadius: Dimensions.get('window').width * 0.7 / 2,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: Dimensions.get('window').height / 30
	},
	image: {
		width: '100%',
		height: '100%'
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: Dimensions.get('window').height / 60
	},
	highlight: {
		fontFamily: 'open-sans-bold',
		color: Colors.primary
	},
	resultText: { textAlign: 'center', fontSize: Dimensions.get('window').height < 400 ? 16 : 20 }
});

export default GameOverScreen;
