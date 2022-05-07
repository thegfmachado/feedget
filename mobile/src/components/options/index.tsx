import React from 'react';
import { View, Text } from 'react-native';
import { Copyright } from '../copyright';
import { Option } from '../option';

import { feedbackTypes } from '../../utils/feedbackTypes';
import { styles } from './styles';
import { FeedbackType } from '../widget';

interface Props {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export function Options({ onFeedbackTypeChanged }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deixe o seu feedback
      </Text>
      <View style={styles.options}>
        {
          Object.entries(feedbackTypes).map(([key, value]) => {
            return (
              <Option
                key={key}
                title={value.title}
                image={{ source: value.image }}
                onPress={() => onFeedbackTypeChanged(key as FeedbackType)}
              />
            );
          })
        }
      </View>
      <Copyright />
    </View>
  );
}
