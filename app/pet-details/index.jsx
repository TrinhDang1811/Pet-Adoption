import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useLocalSearchParams } from 'expo-router'
import PetInfo from '../../components/PetDetails/PetInfo';
import PetSubInfo from '../../components/PetDetails/PetSubInfo';

export default function PetDetails() {
    const pet=useLocalSearchParams();
    const navigation=useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
        })
    },[])
  return (
    <View>
      {/* Pet Info  */}
            <PetInfo pet={pet} />
        {/* Pet SubInfo */}
            <PetSubInfo pet={pet} />
        {/* About */}

        {/* owner details */}

        {/* adopt me button */}



    </View>
  )
}