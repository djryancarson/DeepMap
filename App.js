import  React, { useState, Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firebase from 'react-native-firebase';
import {db} from './src/config';

class Home2 extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: 'ANON',
      count: 3,
      name: this.props.name
    };
    //this.getUsername = this.getUsername.bind(this);
  }
  componentDidMount() {
    this.getUsername();
  }

  componentDidUpdate() {
    // if (this.state.username == 'ANON') {
    //   this.getUsername();
    // }
  }

  getUsername() {
    var clientID = "-M0y31qjFFn2yogTIXrN";
    var username = firebase.database().ref('/leads/'+clientID+'/mobile');
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

  render() {
    const {count, username, name} = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home! ayyyyyyyy 
        {count}
  
        {name}
        {username}
        </Text>
      </View>
    );
  }

}
/*
function HomeScreen() {

  const [ayami, setName] = useState("0");
  var clientID = "-M0y31qjFFn2yogTIXrN";
  var count = 1;
  var username = firebase.database().ref('/leads/' + clientID + '/mobile');
  username.once('value', function(snapshot) {
    setName(snapshot.val());
    this.setState({username: snapshot.val()})
  });
   
  
  


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home! ayyyyyyyy 
      {count}

      
      {ayami}
      </Text>
    </View>
  );
}
*/
function CommunityScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Community</Text>
    </View>
  );
}

function PreferencesScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Preferences</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();


function getData(database){
  var clientID = "-M0y31qjFFn2yogTIXrN";
  return firebase.database().ref('/leads/' + clientID).once('value').then(function(snapshot) {
  var username = (snapshot.val() && snapshot.val().name) || 'Anonymous';
  
});

}
function getPlaceName(database) {
  database.ref('/leads').on('value', querySnapShot => {
    let data = querySnapShot.val();
    return data;
  });
}


// Used to test adding data to Firebase DB 
function addLead(database) {
  var clientName = "a lot";
  var clientMobile = "I ";
  var clientEmail = "did it";

  var newClientKey = database.ref().child('leads').push().key;
  database.ref('leads/'+newClientKey+'/money').set(clientName);
  database.ref('leads/'+newClientKey+'/mobile').set(clientMobile);
  database.ref('leads/'+newClientKey+'/email').set(clientEmail);
}

//const app = Firebase.initializeApp(firebaseConfig);
//export const db = app.database();



//getValFromDB() {
//  db.ref('/Place').on('value', querySnapShot => {
//    let data = querySnapShot.val() ? querySnapShot.val() : {};
//    let 
//  });
//}


//var database = firebase.database();

//firebase.auth().createUserWithEmailAndPassword(email, password)
//.then((res) => {
//    firebase.database().ref('users/' + res.user.uid).set({
//        firstName: firstName,
//        lastName: lastName,
//        email: email,
//        code: code
//    })
//})

 // Import Admin SDK for Firebase
 //var admin = require("fireebase-admin");
 //var db = admin.database();
 //var ref = db.ref("")

 

export default function App() {

  //const [location, setLocation] = "null";
  //setLocation("Kamloops");
  //firebase.initializeApp(config);
  var database = firebase.database();

  // Function to add data to firebase DB used for TESTING
  //addLead(database);
  var input = getPlaceName(database);

  var name = getData(database);
   var dyson ="a";

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home2} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Preferences" component={PreferencesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
