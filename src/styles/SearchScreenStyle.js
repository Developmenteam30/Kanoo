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
        marginTop: 45
    },
    catwidth: {
        width: '50%',
        backgroundColor: 'white',
        borderWidth: 0.2,
        borderColor: 'gray',
        padding: 10,
        marginRight: 0,
    },
    slide: {
        height: 150,
        flexDirection: 'row',
        backgroundColor: 'white',
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
        fontWeight: '500'
    },
    imageb: {
        width: width/2.5,
        height: 80,
        resizeMode: 'contain'
    },
    imagebad: {
        width: width/4,
        height: 80,
        resizeMode: 'contain'
    },
    inputcontainerstyle: {
        margin: 0, paddingHorizontal: 0, paddingBottom: 0, marginBottom: 0, height: 50
    },
    inputstyle: {
        borderWidth: 1, paddingHorizontal: 10, backgroundColor: colors.light
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
    cartitem: {
        flexDirection:'row'
    },
    navbutton: {
        padding: 8,
        backgroundColor: '#ECF1F8',
        color: colors.dark
    },
    darkcolor: {
        color: colors.dark,
        width: 35,
        textAlign: 'center'
    },
    profileheader: {
        paddingTop: 20,
        backgroundColor: colors.primary,
        width: width
    },
    username: {
        fontSize: 20,
        color: colors.white,
        fontWeight: '500',
        lineHeight: 30
    },
    othertext: {
        fontSize: 16,
        color: colors.white,
        fontWeight: '500',
        lineHeight: 25
    },
    listtitle: {
        color: colors.dark,
        fontSize: 14,
        fontWeight: '500',
        padding: 7,
        width: '80%'
    },
    listicon: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 5
    },
    listitems: {
        flexDirection: 'row',
        paddingVertical: 17
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        width: width,
    },
    header: {
        fontSize: 20,
        color: colors.dark,
        fontWeight: '600',
        marginVertical: 10
    },

});
export default styles;
