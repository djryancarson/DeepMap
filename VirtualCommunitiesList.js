import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

class List extends Component {
    state = {
    names: [
        {
           id: 0,
           name: 'Discord',
        },
        {
           id: 1,
           name: 'Facebook',
        },
        {
           id: 2,
           name: 'Virtual Community 3',
        },
        {
           id: 3,
           name: 'Virtual Community 4',
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
        backgroundColor: 'lightgrey',
        height: 300
    },
    Text: {
        color: 'black'
    }
    
})