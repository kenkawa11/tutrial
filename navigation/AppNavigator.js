import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import CoursePossibility from '../screens/HomeScreen';

const PossibilityRoute = () => <CoursePossibility/>;

const DeviationRoute = () => <Text>コース偏差値計算</Text>;

export default class AppNavigator extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'pos', title: 'コース在籍確率計算', icon: 'album' },
            { key: 'dev', title: 'コース偏差値計算', icon: 'history' },
        ],
    };

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        pos: PossibilityRoute,
        dev: DeviationRoute,
    });

    render() {
        return (
            <BottomNavigation
                navigationState={this.state}
                onIndexChange={this._handleIndexChange}
                renderScene={this._renderScene}
            />
        );
    }
}