import { ActivityIndicator, Text, TouchableOpacity, Image, View } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';
import successImg from '../assets/success.png';
import { Copyright } from '../Copyright';

export function Success() {

  return (
    <View style={styles.container}>
      <Image source={successImg} style={styles.image} />
      <Text style={styles.title}>Agradecemos o Feedback</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
