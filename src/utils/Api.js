import AsyncStorage from "@react-native-async-storage/async-storage";
const api_url = "https://web.techinfomatic.com/api/";
class Api {
  settimeformat = (d) =>{
    var da = new Date(d);
    return da.toDateString();
  }
  formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }
  storedata = async (data, key) => {
    try {
      var value = JSON.stringify(data);
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  };

  getdata = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  clearAll = async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (e) {
      return false;
    }
  };

  login = async (data, url) => {
    try {
      var response = await fetch(api_url + url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseJson = await response.json();
      if (responseJson) {
        return responseJson;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  putapi = async (url) => {
    try {
      var response = await fetch(api_url + url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.auth,
        },
      });
      const responseJson = await response.json();
      if (responseJson) {
        return responseJson;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  getapi = async (url) => {
    try {
      var response = await fetch(api_url + url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.auth,
        },
      });
      const responseJson = await response.json();
      if (responseJson) {
        return responseJson;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };
  postapi = async (data, url) => {
    try {
      var response = await fetch(api_url + url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + global.auth,
        },
        body: JSON.stringify(data),
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson) {
        return responseJson;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
const api = new Api();
export default api;
