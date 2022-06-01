import {StyleSheet, Dimensions} from 'react-native';
import {withTheme} from 'react-native-elements';
import { colors } from '../utils/Variables';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: 15,
        marginTop: 70
    },
    slide: {
        height: 160,
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: 5,
    },
    title: {
        fontSize: 16,
        color: colors.warning,
        fontWeight: '400'
    },
    banner: {
        width: '100%',
        height: 150,
        resizeMode: 'contain'
    },
    headertext: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.dark
    },
    imageb: {
        width: width/3,
        height: 80,
        resizeMode: 'contain'
    }
});
export default styles;
