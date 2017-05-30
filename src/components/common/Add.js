import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { Input } from './Input';

const Add = ({ children, visible, onAdd, onDecline }) => {
	const { containerStyle, textStyle, cardSectionStyle } = styles;

	return ( // onAccept and onDecline is not executed here (they are coming from the props). It is only referenced here because we wrote it without parantheses.
		<Modal
			visible={visible}
			animationType="slide"
			onRequestClose={() => {}} // This prop does not do anything but it is required by Android to be called.
			transparent
		>
			<View style={containerStyle}>
				<CardSection>
					{children}
				</CardSection>

				<CardSection>
					<Button onPress={onAdd}>Add</Button>

					<Button onPress={onDecline}>Cancel</Button>
				</CardSection>
			</View>
		</Modal>
	);
};

const styles = {
	cardSectionStyle: {
		justifyContent: 'center'
	},
	textStyle: {
		flex: 1,
		fontSize: 18,
		textAlign: 'center',
		lineHeight: 40
	},
	containerStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		position: 'relative',
		flex: 1,
		justifyContent: 'center'
	}	
};

export { Add };
