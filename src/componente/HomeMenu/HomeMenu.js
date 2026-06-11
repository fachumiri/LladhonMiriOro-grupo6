import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
// hay que importar los componentes home, perfil, crearposteo, comentarposteo
const Tab = createBottomTabNavigator();

function HomeMenu() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <FontAwesome name="home" size={size} color={color} />
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
        name="Comentar posteo" 
        component={StackComentario} 
        options={{
            tabBarIcon: () => (
            <FontAwesome name="comment-alt" size={24} color="black" />
            ),
        }}/>
    </Tab.Navigator>
  );
}
export default HomeMenu