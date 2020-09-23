import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText';

const Header = (props) => {
	return (
		<View style={styles.header}>
			<TitleText style={styles.headerTitle}>{props.title}</TitleText>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: '100%',
		height: 90,
		paddingTop: 30,
		backgroundColor: Colors.primary,
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerTitle: { color: 'black', fontSize: 18, fontFamily: 'open-sans-bold' }
});

export default Header;
