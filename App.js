import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WebView from 'react-native-webview';
import { useState, Component } from 'react';
import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps';
import firebase from 'react-native-firebase';
import {db} from './src/config';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Modal,
  Text,
  StatusBar,
  Button,
  Picker
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createStackNavigator } from '@react-navigation/stack';
    

import List from './VirtualCommunitiesList';

class HomeScreen extends Component
{
	
	setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });}
	
	updateFilter = (filter) => {
		this.setState({filter: filter})
		this.filterMap(filter);
	}

  constructor(props) {
    super(props);
    
    this.state = {
      username: 'ANON',
      count: 3,
      name: 'peter', //this.props.name
      array: [],//[1,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
	  filter: 'all',
	  modalVisible: false
    };
    //this.getUsername = this.getUsername.bind(this);
  }
  componentDidMount() {
    this.getUsername();
    this.test();
  }

  componentDidUpdate() {
    // if (this.state.username == 'ANON') {
    //   this.getUsername();
    // }
  }

  getUsername() {
    var clientID = "-M11lAGgApvZ4Jb_2fZk";
    var username = firebase.database().ref('/leads/'+clientID+'/email');
    username.once('value').then((snapshot) => {
      this.setState({username: snapshot.val()});
    });
    // }).catch(() => {
    //   this.setState({username: 'GOOF'});
    // });
    // username.once('value', function(snapshot){
    //   this.setState({username: snapshot.val()});
    // })
  }
  
//   test() {
  
//     var nameid = firebase.database().ref("leads").orderByKey();
//     nameid.once("value").then(function(snapshot) {
//       var array = [];
//       snapshot.forEach(function(childSnapshot) {
        
//         var childData = childSnapshot.val();
//         array.push(childData);
//       });
//       this.setState({ array: array});
//     });






//     // nameid.once('value').then((snapshot) => {
//     // this.setState({array: snapshot.val()});
    
//   // });
// }

// function that will make an array for firebase objects in this case the children of the tree leads
test() {
  
  var nameid = firebase.database().ref("community_resources").orderByKey();
  nameid.once("value").then(snapshot => {
    var array = []
    snapshot.forEach(childSnapshot =>  {
      
      var childData = childSnapshot.val();
      if (childData.longitude != null) {array.push(childData);}
    });
    this.setState({ array: array});
  });


}

filterMap(filter) {
  
  var nameid = firebase.database().ref("community_resources").orderByKey();
  nameid.once("value").then(snapshot => {
    var array = []
    snapshot.forEach(childSnapshot =>  {
      
      var childData = childSnapshot.val();
	  var childFilter = childSnapshot.child("categories/" + filter).val();
	  if((childFilter || filter == "all")&&(childData.longitude != null)){array.push(childData);}
    });
    this.setState({ array: array});
  });


}


  render () 
{
  const {count, username, name, array, modalVisible} = this.state;
  return (
    
    <View style={styles.HomeScreen}>
      <View style={{height:50,borderBottomColor:'lightgrey',borderBottomWidth:2}}>
	  
		<Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World</Text>
            </View>
          </View>
        </Modal>
		
        <Picker
			selectedValue={this.state.filter}
			onValueChange={this.updateFilter}
		>
          <Picker.Item label = "All" value = "all" />
          <Picker.Item label = "Academic Accessibility & Supports" value = "academic_accessibility_supports" />
          <Picker.Item label = "Counselling" value = "counselling" />
		  <Picker.Item label = "Disability" value = "disability" />
          <Picker.Item label = "Food Assistance" value = "food_assistance" />
		  <Picker.Item label = "Funding & Wage Subsities" value = "funding_wage_subsidies" />
		  <Picker.Item label = "Health & Wellness" value = "health_wellness" />
		  <Picker.Item label = "Housing" value = "housing" />
		  <Picker.Item label = "Indigenous" value = "indigenous" />
		  <Picker.Item label = "International" value = "international" />
		  <Picker.Item label = "LGBTQ2S+" value = "lgbtq2s+" />
		  <Picker.Item label = "Legal Advice" value = "legal_advice" />
		  <Picker.Item label = "Mental Health & Addictions" value = "mental_health_addictions" />
		  <Picker.Item label = "Other" value = "other" />
		  <Picker.Item label = "Sexualized Violence" value = "sexualized_violence" />
		  <Picker.Item label = "Workplace Accessibility & Career Services" value = "workplace_accessibility_career_services" />
        </Picker>

        
      </View>
      {/* testing the mapping function for the database */}
     

      
      <MapView  
        style= {styles.mapView}
        showsUserLocation = {true}
        followsUserLocation = {true}
        zoomEnabled = {true}
		initialRegion={{
		  latitude: 50.6745,
		  longitude: -120.3273,
		  latitudeDelta: 0.0922,
		  longitudeDelta: 0.0421,
		}}
		>

      {/* Fucntion to the add all the markers to the Map */}
     {array.map((data) => (<MapView.Marker
            coordinate={{latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude)}}
            title={data.name}
            description={data.description}
			onCalloutPress={() => this.setModalVisible(true)}
         />))}  
       

       
       
        {/* <MapView.Marker
            coordinate={{latitude: 50.6710194,
            longitude: -120.3651759}}
            title={"TRU Wellness Center"}
            description={"Provided for: Students, TRU Faculty"}
         />
        <MapView.Marker
            coordinate={{latitude: 50.6761238,
            longitude: -120.3408698}}
            title={"Kamloops Sexual Assault Counselling Centre"}
            description={"Provided for: Students, TRU Faculty, Employers"}
         />
		 <MapView.Marker
            coordinate={{latitude: 50.6746966,
            longitude: -120.3262037}}
            title={"Volunteer Kamloops"}
            description={"Provided for: Students, TRU Faculty, Employers"}
         />
		 <MapView.Marker
            coordinate={{latitude: 50.6916131,
            longitude: -120.3608894}}
            title={"Kamloops Immigrant Services"}
            description={"Provided for: Students, TRU Faculty, Employers"}
         /> */}
      </MapView>


        <View style={{height:50,borderTopColor:'lightgrey',borderTopWidth:2}}>
        
        </View>
    </View>
  );
}
}


function CommunityScreen() {
  return (
    <ScrollView>
      <List />
    </ScrollView>
  );
}

function PreferencesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView>

      </ScrollView>
      <Text>Preferences</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarPosition="bottom">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Preferences" component={PreferencesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 6,
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  container: {
      height: 500,
   },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  tabBar: {
    flex:0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
    borderTopColor: 'lightgrey',
    borderTopWidth:2
  },


  mapView: {
    flex: 1,
    backgroundColor: 'white'

  },
  HomeScreen: {
    flex:1,
    flexDirection: 'column',
    //height: 1000
  },

  scrollView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    height: 500,
    
  },
  tabButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    textAlignVertical: 'center',
  }
});