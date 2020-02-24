import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, PushNotificationIOS } from 'react-native';


class List extends Component {
    state = {
    names: [
        {
           id: 0,
           name: 'Discord',
           img: [require('./testimages/Photos-new-icon.png')]
        },
        {
           id: 1,
           name: 'Facebook',
           img: [require('./testimages/Photos-new-icon.png')]
        },
        {
           id: 2,
           name: 'Virtual Community 3',
           img: [require('./testimages/Photos-new-icon.png')]
        },
        {
           id: 3,
           name: 'Virtual Community 4',
           img: [require('./testimages/Photos-new-icon.png')]
        },
        {
            id: 4,
            name: 'Virtual Community 3',
            img: [require('./testimages/Photos-new-icon.png')]
         }
     ]
  }
  alertItemName = (item) => {
    alert(item.name)
 }  

  render() {
      return (
          <View>
              {
                  this.state.names.map(( item, index ) => (
                      <TouchableOpacity 
                        key = { item.id }
                        style = { styles.container }
                        onPress = {() => this.alertItemName( item )}>
                        <Text styles = { styles.text }>
                            { item.name }
                        </Text>
                        <Image
                            source={item.img[0]}
                            style={{width: 100, height: 100}}                         
                        />
                        
                      </TouchableOpacity>                    
                  ))
              }
          </View>
      )
  }
}
export default List



const styles = StyleSheet.create ({
    container: {
        padding: 10, 
        marginTop:3,
        backgroundColor: 'white',
        height: 200
    },
    Text: {
        color: 'black'
    }
    
})