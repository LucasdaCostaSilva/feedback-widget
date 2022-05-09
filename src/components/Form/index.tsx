import { ArrowLeft } from 'phosphor-react-native';
import { Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../ScreenshotButton';
import { FeedbackType } from '../Widget';
import { Button } from '../Button';
import { styles } from './styles';
import { captureScreen } from 'react-native-view-shot';
import { useState } from 'react';
import { api } from '../../libs/api';


interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const feedbackTypeInfo = feedbackTypes[feedbackType]

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    }).then(uri => setScreenshot(uri))
      .catch(err => console.error(err));
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot,
        comment
      });
      onFeedbackSent();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft size={24} weight="bold" color={theme.colors.text_secondary} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        autoCorrect={false}
        style={styles.input}
        placeholder="Deixe seu feedback"
        onChangeText={setComment}
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot} />
        <Button isLoading={isLoading} onPress={handleSendFeedback} />
      </View>

    </View>
  );
}
