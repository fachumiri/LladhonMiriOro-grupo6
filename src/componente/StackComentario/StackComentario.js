import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ComentarPosteo from '../../screens/ComentarPosteo/ComentarPosteo';

const Stack = createNativeStackNavigator();

export default function ComentarioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Comentar posteo" component={ComentarPosteo} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}