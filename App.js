import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WebView from 'react-native-webview';
import MapView, { Marker } from 'react-native-maps';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
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

function HomeScreen() {
  return (
    <View style={styles.HomeScreen}>
      <View style={{height:50,borderBottomColor:'lightgrey',borderBottomWidth:2}}>
        <Picker>
          <Picker.Item label = "All" value = "all" />
          <Picker.Item label = "Academic Accessibility & Supports" value = "academic" />
          <Picker.Item label = "Counselling" value = "counselling" />
          <Picker.Item label = "Disability" value = "disability" />
        </Picker>

        
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
        <MapView.Marker
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
         />
      </MapView>


        <View style={{height:50,borderTopColor:'lightgrey',borderTopWidth:2}}>
        
        </View>
    </View>
  );
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