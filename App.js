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
  TouchableHighlight,
  Text,
  StatusBar,
  Button,
  Picker,
  TouchableOpacity,
  Image,
  Linking
  } from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { Dropdown } from 'react-native-material-dropdown';

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
    modalVisible: false,
    description: '',
    image: '',
    phonenumber:'',
    email:''
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
  }


// function that will make an array for firebase objects in this case the children of the tree leads
test() {
  
  var nameid = firebase.database().ref("community_resources").orderByKey();
  nameid.once("value").then(snapshot => {
    var array = []
    snapshot.forEach(childSnapshot =>  {
      
      var childData = childSnapshot.val();
      if(!childData.vrtl){array.push(childData)};
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
	  if(childFilter || filter == "all"){ if(!childData.vrtl){array.push(childData);}}
    });
    this.setState({ array: array});
  });


}


  render () 
{
  const {count, username, name, array, modalVisible,description, phonenumber, email, image} = this.state;
  
  let data = [{
          label: "All" , value: "all" },{
          label: "Academic Accessibility & Supports" , value: "academic_accessibility_supports" },{
          label: "Counselling" , value: "counselling" },{
		  label: "Disability" , value: "disability" },{
          label: "Food Assistance" , value: "food_assistance" },{
		  label: "Funding & Wage Subsities" , value: "funding_wage_subsidies" },{
		  label: "Health & Wellness" , value: "health_wellness" },{
		  label: "Housing" , value: "housing" },{
		  label: "Indigenous" , value: "indigenous" },{
		  label: "International" , value: "international" },{
		  label: "LGBTQ2S+" , value: "lgbtq2s+" },{
		  label: "Legal Advice" , value: "legal_advice" },{
		  label: "Mental Health & Addictions" , value: "mental_health_addictions" },{
		  label: "Other" , value: "other" },{
		  label: "Sexualized Violence" , value: "sexualized_violence" },{
		  label: "Workplace Accessibility & Career Services" , value: "workplace_accessibility_career_services" }];
		  
  return (
    
    <View style={styles.HomeScreen}>
      
      
      {/* testing the mapping function for the database */}
      <View style={{height:20}}>
        
        </View>
      <Modal
      animationType="slide"
      transparent={true}
      visible = {modalVisible}
      >
      
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
		<Image style={{width:500, height:100}} source={{uri: `${image}`}} />
          <Text style={styles.modalText}>
            
            {`\n`}
            {name}
            {"\n"}
            {`\n`}
            {description}
            {"\n"}
            {`\n`}
            {phonenumber}
            {`\n`}
            {`\n`}
            {email}
    

          

            {/* {(picture).getDownloadURL()} */}
          
          </Text>
          
          <TouchableHighlight
              style={{ ...styles.openButton}}
              onPress={() => {
                 this.setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>

          
        </View>
      </View>
    </Modal>
	
	<View style={{height:50,flex:1}}>
	  
		
			<Dropdown
				label='Community Filter'
				data={data}
				dropdownPosition = {0}
				itemCount={6}
        onChangeText={this.updateFilter}
        baseColor = "#003e51"
        itemColor = "#003e51"
        selectedItemColor = "#003e51"
        textColor = "#00b0b9"
			/>
		
        
      </View>
      
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
     {array.map((data) => 
     
     
     (

      <View>
      
     
     
     <MapView.Marker
            coordinate={{latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude)}}
            title={data.name}
            description={data.description}
            onCalloutPress={() => (
              
              this.setModalVisible(true),
              this.setState({name: data.name}),
              this.setState({phonenumber: data.phone}),
              this.setState({description: data.description}),
              this.setState({email: data.email}),
              this.setState({image: data.image})
            )
            }
         />
         
         
         </View>
         
         
         ))}  
       
      </MapView>

        
    </View>
  );
}
}


class CommunityScreen extends Component {
  updateFilter = (filter) => {
    this.setState({ filter: filter })
    this.filterMap(filter);
  }

  constructor(props) {
    super(props);

    this.state = {
      username: 'ANON',
      count: 3,
      name: 'peter', //this.props.name
      array: [],
      filter: 'all',
      modalVisible: false,
      modalData: ""
    };
    //this.getUsername = this.getUsername.bind(this);
  }
  componentDidMount() {
    this.getUsername();
    this.test();
  }

  getUsername() {
    var clientID = "-M11lAGgApvZ4Jb_2fZk";
    var username = firebase.database().ref('/leads/' + clientID + '/email');
    username.once('value').then((snapshot) => {
      this.setState({ username: snapshot.val() });
    });
  }

  test() {

    var nameid = firebase.database().ref("community_resources").orderByKey();
    nameid.once("value").then(snapshot => {
      var array = []
      snapshot.forEach(childSnapshot => {
        
        var childData = childSnapshot.val();

        if(childData.vrtl){
        array.push(childData);
        }

      });
      this.setState({ array: array });
    });
  }

  filterMap(filter) {
    var nameid = firebase.database().ref("community_resources").orderByKey();
    nameid.once("value").then(snapshot => {
      var array = []
      snapshot.forEach(childSnapshot => {

        var childData = childSnapshot.val();
        var childFilter = childSnapshot.child("categories/" + filter).val();
        if (childFilter || filter == "all") { if(childData.vrtl){array.push(childData);} }
      });
      this.setState({ array: array });
    });

  }
  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }
  modalData(data) {

    this.setState({ Data: JSON.stringify(data) });
  }


  render() {
    const { array, name, link, description, image, email } = this.state;

    let data = [{
      label: "All" , value: "all" },{
      label: "Academic Accessibility & Supports" , value: "academic_accessibility_supports" },{
      label: "Counselling" , value: "counselling" },{
      label: "Disability" , value: "disability" },{
      label: "Food Assistance" , value: "food_assistance" },{
      label: "Funding & Wage Subsities" , value: "funding_wage_subsidies" },{
      label: "Health & Wellness" , value: "health_wellness" },{
      label: "Housing" , value: "housing" },{
      label: "Indigenous" , value: "indigenous" },{
      label: "International" , value: "international" },{
      label: "LGBTQ2S+" , value: "lgbtq2s+" },{
      label: "Legal Advice" , value: "legal_advice" },{
      label: "Mental Health & Addictions" , value: "mental_health_addictions" },{
      label: "Other" , value: "other" },{
      label: "Sexualized Violence" , value: "sexualized_violence" },{
      label: "Workplace Accessibility & Career Services" , value: "workplace_accessibility_career_services" }];
    return (

      <View style={styles.HomeScreen}>
        <View>
        <View style={{height:20}}>
        
        </View>
		
    <Dropdown
      label='Community Filter'
      data={data}
      dropdownPosition = {0}
      itemCount={6}
      baseColor = "#003e51"
      itemColor = "#003e51"
      selectedItemColor = "#003e51"
      textColor = "#00b0b9"
      onChangeText={this.updateFilter}
    />
  
      
    </View>

        <ScrollView>

          {array.map((data) => (
            <TouchableOpacity
              key={data.name}
              style={styles.container}
              onPress={() => {
                this.toggleModal(true),
                  this.setState({ name: data.name }),
                  this.setState({ link: data.link }),
                  this.setState({email: data.email})
                  this.setState({ description: data.description }),
                  this.setState({ image: data.image })
              }}>

              <Text style={{ fontSize:20, color: '#003e51'}}>{data.name}</Text>
              <Image
                source={{ uri: `${data.image}` }}
                style={{ height: 200 }}
              />
            </TouchableOpacity>
          ))
        
          }
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >

            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              
              
                  <Image style={{ width: 100, height: 100 }} source={{ uri: `${image}` }} />
                  <Text style={styles.modalText}>
                    {"\n"}
                    {name}                    
                    {"\n"}
                    {"\n"}
                    {description}
                    {"\n"}
                    {`\n`}
                    {email}
                    {`\n`}  
                  </Text>
				  
				  <TouchableHighlight
				  style={{ ...styles.openButton}}
				  onPress={() => Linking.openURL(`http://${link}`)}
				>
				  <Text style={styles.textStyle}>Go There!</Text>
				</TouchableHighlight>
				 
				<TouchableHighlight
				  style={{ ...styles.openButton}}
				  onPress={() => this.toggleModal(false)}
				>
				  <Text style={styles.textStyle}>Close</Text>
				</TouchableHighlight>
				  
				        
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    )
  }
}


const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarPosition="bottom">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
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
    backgroundColor: "#003e51",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FFFFFF',
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
      height: 250,
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
  openButton: {
    backgroundColor: "#9ab7c1",
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    flex: 8,
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