import {Platform, StyleSheet} from 'react-native';
import {block} from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: 'rgba(9,24,43,1)',
    flexDirection: 'row',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  headerIconStyle: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
  headerTextStyle: {
    color: 'white',
    fontSize: 22,
    marginHorizontal: 70,
  },
  footer: {
    flex: 1,
    backgroundColor: 'rgba(9,24,43,1)',
    height: 700,
  },
  footerIconStyle: {
    width: '50%',
    height: 35,
    alignSelf: 'center',
  },
  pay: {
    padding: 20,
    marginTop: '50%',
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  signIn: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 70,
  },
  contss: {
    color: 'white',
    marginTop: 10,
    marginLeft: 15,
    fontSize: 15,
  },
  cont: {
    color: 'white',
    marginTop: 35,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cont1: {
    color: 'white',
    padding: 25,
    marginLeft: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  cont2: {
    color: 'white',
    padding: 5,
    marginLeft: 20,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default styles;
