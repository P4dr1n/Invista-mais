import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function button({label, onPress}:any) {
  return (
    <View>
      <TouchableOpacity 
      onPress={onPress}
      style={{
        backgroundColor: 'blue',
        marginTop: '50%',
        width: 50,
        height: 35
      }}>
        <Text>Ckique aquii</Text>
      </TouchableOpacity>
    </View>
  )
}