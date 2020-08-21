import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Card = (props) => {
	return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

export default Card;

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		//IOS Only
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.26,
		//Android
		elevation: 8
	}
});
