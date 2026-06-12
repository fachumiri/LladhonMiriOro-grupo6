import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ComentarPosteo from '../../screens/ComentarPosteo/ComentarPosteo';
import Home from '../../screens/Home/Home';

const Stack = createNativeStackNavigator();

export default function ComentarioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Comentar posteo" component={ComentarPosteo} />
    </Stack.Navigator>
  );
}