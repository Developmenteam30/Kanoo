import {StyleSheet, Dimensions} from 'react-native';
import {withTheme} from 'react-native-elements';
import { colors } from '../utils/Variables';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 15,
  },
  headingtext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 20,
  },
  detailsfonts: {
    fontSize: 16,
    color: 'white',
    paddingTop: 10,
  },
  mainContainerLeft: {
    flex: 1,
    backgroundColor: '#312824',
    padding: 15,
  },
  logoStyle: {
    width: 200,
    marginTop: 200
  },
  logotextStyle: {
    width: 240,
    marginTop: 200
  },
  mainimageStyle: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  backStyle: {
    height: 30,
    width: 30,
    marginVertical: 15,
  },
  logofont: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#229A71',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingVertical: 15,
  },
  logofonts: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#229A71',
  },
  innercontent: {
    padding: 15,
  },
  inputSpan: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
  },
  searchSections: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginHorizontal: 15,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  baseIcon: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginHorizontal: 10,
    marginVertical: 8,
  },
  amount: {
    color: 'white',
    fontSize: 24,
    marginTop: 30,
    marginLeft: '2%',
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    fontSize: 15,
    backgroundColor: 'transparent',
    color: '#FFF',
  },
  placeholder: {
    color: 'white',
  },
  buttontext: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    minHeight: 56,
  },
});
export default styles;
