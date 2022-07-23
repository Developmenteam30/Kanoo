import {StyleSheet, Dimensions} from 'react-native';
import {withTheme} from 'react-native-elements';
import { colors } from '../utils/Variables';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.primary,
        padding: 15,
    },
    imagebs: {
        width: '20%',
        height: 60,
        resizeMode: 'contain'
    },
    headertext: {
         width: '75%', lineHeight: 24, textAlign: 'right', color: colors.dark, paddingTop: 12, fontWeight: '500'
    },
    headervalue: {
         width: '25%', lineHeight: 24, textAlign: 'right', color: colors.dark, paddingTop: 12,
    },
    cartitems: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    logoStyle: {
        margin: 50,
        height: 80,
    },
    windowheight: {
        width: width,
        height: height - 200,
        padding: 30
    },
    header: {
        fontSize: 26,
        color: colors.primary,
        fontWeight: '600',
        marginBottom: 20
    },
    form: {
        paddingVertical: 30
    },
    inputcontainerstyle: {
        margin: 0, paddingHorizontal: 0
    },
    inputstyle: {
        borderWidth: 1, paddingHorizontal: 10
    },
    label: {
        color: colors.dark,
        fontSize: 16,
        paddingVertical: 5
    },
    rightalign: {
        width: '100%',
        textAlign: 'right',
        color: colors.primary
    },
    buttonfull: {
        width: '100%',
        backgroundColor: colors.dark,
        padding: 13,
        alignItems: 'center',
        marginVertical: 20
    },
    buttontext: {
        fontSize: 16,
        color: colors.white,
        fontWeight: '500'
    },
    bottomtext: {
        color: colors.dark,
        fontSize: 15,
        width: '100%',
        textAlign: 'center'
    },
    scrollwidth: {
        width: width - 50,
        paddingVertical: 30
    },
    Modelscrollwidth: {
        width: width,
        paddingVertical: 30
    }
});
export default styles;
