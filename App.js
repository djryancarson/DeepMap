import * as React from 'react';
import WebView from 'react-native-webview';
import MapView from 'react-native-maps';
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

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//homescreen contains the map 
function Resources ( {navigation} ){
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
      />

        <View style={{height:50,borderTopColor:'lightgrey',borderTopWidth:2}}>
        
        </View>

      


      
  

      <View style={styles.tabBar}>
        <Button style={styles.tabButton} type='outline' color='lightgrey'  title="Community " onPress={() => navigation.navigate('Community')}/>
        <Button style={styles.tabButton} type='outline' color='lightgrey'  title="Personal" onPress={() => navigation.navigate('Personal')}/>
        <Button style={styles.tabButton} type='outline' color='lightgrey'  title="Preferences" onPress={() => navigation.navigate('Preferences')}/>
      </View>
    </View>
    


  );
}



function Community (){
  return (
    <View>
      <Text>Hello! This is the community page!</Text>
    </View>
  );
}

function Personal (){
  return (
    <View>
      <Text>Hello! This is the personal page!</Text>
    </View>
  );
}


function Preferences (){
  return (
    <View>
      <Text>Hello! This is the preferences page!</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App ( { navigation } ) {
  return (
    <NavigationContainer>
         <Stack.Navigator>
           
           <Stack.Screen name="Resources" component={Resources} />
           <Stack.Screen name="Community" component={Community} />
           <Stack.Screen name="Personal" component={Personal} />
           <Stack.Screen name="Preferences" component={Preferences} />
         </Stack.Navigator>
         
         
    </NavigationContainer>
    
  );
};


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

export default App;
