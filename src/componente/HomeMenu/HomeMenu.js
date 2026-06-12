import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import ComentarioStack from '../ComentarioStack/ComentarioStack';
import Perfil from "../../screens/Perfil/Perfil"
import CrearPosteo from "../../screens/CrearPosteo/CrearPosteo"
const Tab = createBottomTabNavigator();

function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen 
        name="Home" 
        component={ComentarioStack} 
        options={{
            tabBarIcon: () => (
            <FontAwesome name="home" size={24} color="black" />
            ),
        }}/>
      <Tab.Screen 
      name="Crear posteo" 
      component={CrearPosteo} 
      options={{
        tabBarIcon: () => (
            <Ionicons name="create" size={24} color="black" />
        ),
        }}
        />
        <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: () => (
            <Ionicons name="person-circle" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default HomeMenu