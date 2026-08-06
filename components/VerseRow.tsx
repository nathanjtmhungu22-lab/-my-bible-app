import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  number: string | number;
  text: string;
  selected?: boolean;
  onShare?: () => void;
  onPress?: () => void;
};

export default function VerseRow({ number, text, selected, onShare, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.row, selected && styles.rowSelected]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.num}>{number}</Text>
      <Text style={styles.body}>{text}</Text>

      {selected && (
        <TouchableOpacity style={styles.shareBtn} onPress={onShare} accessibilityLabel="Share verse">
          <Text style={styles.shareText}>↑</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 9,
    paddingHorizontal: 6,
    alignItems: 'flex-start',
    borderRadius: 10,
    position: 'relative',
  },
  rowSelected: {
    backgroundColor: '#28304A',
  },
  num: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 11,
    color: '#E7C471',
    width: 24,
    textAlign: 'right',
    marginTop: 3,
    marginRight: 10,
  },
  body: {
    flex: 1,
    fontFamily: 'Fraunces-Regular',
    fontSize: 16,
    lineHeight: 26,
    color: '#EDE7D6',
  },
  shareBtn: {
    position: 'absolute',
    right: 6,
    top: 6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#374162',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareText: {
    color: '#E7C471',
    fontSize: 12,
  },
});
