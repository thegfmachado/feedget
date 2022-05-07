import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as ExpoFileSystem from 'expo-file-system';

import { theme } from '../../theme';
import { styles } from './styles';
import apiClient from '../../services/api';

import { FeedbackType } from '../../components/widget'
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButton } from '../screenshot-button';
import { Button } from '../button';

interface Props {
  type: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ type, onFeedbackCanceled, onFeedbackSent }: Props) {
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');

  const feedbackTypeInfo = feedbackTypes[type];

  async function handleScreenshot() {
    try {
      const uri = await captureScreen({
        format: 'png',
        quality: 0.8,
      })

      setScreenshot(uri);
    } catch (err) {
      console.error(err);
    }
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSubmit() {
    if (isSubmiting) {
      return;
    }

    setIsSubmiting(true);

    const base64Screenshot = screenshot && await ExpoFileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });
    const screenshotString = base64Screenshot ? `data:image/png;base64,${base64Screenshot}` : null;

    try {
      await apiClient.post('/feedbacks', {
        type,
        comment,
        screenshot: screenshotString,
      })

      onFeedbackSent();
    } catch (err: any) {
      setIsSubmiting(false);
      throw new Error(err);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onFeedbackCanceled}
        >
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image
            source={feedbackTypeInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Tem alguma sugestão ou elogio? Queremos saber! Conte em detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />
        <Button
          isLoading={isSubmiting}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}
