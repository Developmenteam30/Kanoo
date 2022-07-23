import { StyleSheet, Dimensions } from "react-native";
import { color } from "react-native-reanimated";
import { colors, fontSizes } from "../utils/Variables";
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    // backgroundColor: colors.primary,
  },
  rowdirection: {
    flexDirection: "row",
  },
  rowalign: {
    flexDirection: "row",
    alignItems: "center",
  },
  resize: {
    resizeMode: "contain",
  },
  headeralign: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
  },
  header: {
    backgroundColor: colors.primary,
    height: 70,
    width: "100%",
  },
  headertext: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.white,
  },
  img: {
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 30,
  },
  boxheading: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.gray,
    marginLeft: 18,
    marginTop: 22,
  },
  input: {
    height: 40,
    flex: 1,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 4,
    marginTop: 8,
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray,
    backgroundColor: color.white,
  },
  input1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 4,
    marginTop: 8,
  },
  input2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    // marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    borderRadius: 4,
    marginTop: 8,
  },
  input3: {
    width: "80%",
  },
  updatebtn: {
    backgroundColor: colors.secondary,
    borderRadius: 6,
    width: "50%",
    padding: 8,
    alignSelf: "center",
    marginTop: "15%",
  },
  btntext: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
    textTransform: 'uppercase',
    color: colors.white,
  },
});
export default styles;
