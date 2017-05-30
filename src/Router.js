import React from 'react';
import { Text, View } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import MainView from './components/MainView';
import BookmarkListView from './components/BookmarkListView';
import SettingsView from './components/SettingsView';

const TabIcon = ({ selected, title }) => {
	return (
		<View 
			style={{ 
				flex: 1, 
				backgroundColor: selected ? '#fff' : '#007aff',
				justifyContent: 'center',
				alignItems: 'center',
				width: 125
			}}
		>
			<Text style={{ color: selected ? '#007aff' : '#fff' }}>{title}</Text>
		</View>
	);
};

const RouterComponent = () => {
	const { tabBarStyle } = styles;
	return (
		<Router>
			<Scene
				key="tabbar"
				tabs
				tabBarStyle={tabBarStyle}	
			>
				<Scene 
					key="forecast" 
					title="Forecast" 
					icon={TabIcon}
				>
					<Scene 
						key="Main"
						component={MainView}
						title="Weather Forecast"
						initial
						sceneStyle={{ paddingTop: 65 }}
					/>
				</Scene>

				<Scene 
					key="bookmarks" 
					title="Bookmarks" 
					icon={TabIcon}
				>
					<Scene
						key="BookmarkList"
						component={BookmarkListView}
						title="Bookmarks"
						sceneStyle={{ paddingTop: 65 }}
					/>
				</Scene>

				<Scene
					key="settings"
					title="Settings"
					icon={TabIcon}
				>
					<Scene 
						key="Settings"
						component={SettingsView}
						title="Settings"
						sceneStyle={{ paddingTop: 65 }}
					/>
				</Scene>
			</Scene>
		</Router>
	);
};

/*const RouterComponent = () => {
	return (
		<Router sceneStyle={{ paddingTop: 65 }}>
			<Scene 
				key="Main"
				component={MainView}
				title="Weather Forecast"
				initial
			/>
			<Scene
				key="BookmarkList"
				component={BookmarkListView}
				title="Bookmarks"
			/>
		</Router>
	);
};*/

const styles = {
	tabBarStyle: {
		backgroundColor: '#fff'
	}
};

export default RouterComponent;
