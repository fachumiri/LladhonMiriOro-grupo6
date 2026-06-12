import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ComentarPosteo from '../../screens/ComentarPosteo/ComentarPosteo';
import Home from '../../screens/Home/Home';
//<Stack.Screen name="Comentar posteo" component={ComentarPosteo} options={{ headerShown: false }}/> --> una vez que se cree comentarposteo agregar abajo del home
const Stack = createNativeStackNavigator();

export default function ComentarioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}