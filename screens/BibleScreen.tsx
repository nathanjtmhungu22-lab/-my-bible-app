import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import VerseRow from '../components/VerseRow';

// small sample KJV data (John 3)
const SAMPLE_VERSES = [
  { num: 14, text: 'And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up:' },
  { num: 15, text: 'That whosoever believeth in him should not perish, but have eternal life.' },
  { num: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
  { num: 17, text: 'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.' },
  { num: 18, text: 'He that believeth on him is not condemned: but he that believeth not is condemned already, because he hath not believed in the name of the only begotten Son of God.' },
];

export default function BibleScreen() {
  const [selected, setSelected] = useState<number | null>(16);
  const [shareOpen, setShareOpen] = useState(false);

  const onPressVerse = (num: number) => {
    setSelected(prev => (prev === num ? null : num));
  };

  const onShare = (num: number, text: string) => {
    console.log('Share', num, text);
    setShareOpen(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.refSelect}>
          <Text style={[styles.book, styles.serif]}>John 3</Text>
          <Text style={styles.chev}>▾</Text>
        </View>
        <View style={styles.versionToggle}>
          <TouchableOpacity style={[styles.versionBtn, styles.versionActive]}><Text style={styles.versionTextActive}>KJV</Text></TouchableOpacity>
          <TouchableOpacity style={styles.versionBtn}><Text style={styles.versionText}>NIV</Text></TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={SAMPLE_VERSES}
        keyExtractor={(item) => item.num.toString()}
        renderItem={({ item }) => (
          <VerseRow
            number={item.num}
            text={item.text}
            selected={selected === item.num}
            onPress={() => onPressVerse(item.num)}
            onShare={() => onShare(item.num, item.text)}
          />
        )}
        contentContainerStyle={styles.list}
      />

      <Modal visible={shareOpen} animationType="slide" transparent onRequestClose={() => setShareOpen(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.shareSheet}>
            <View style={styles.sheetHandle} />
            <View style={styles.sheetPreview}>
              <Text style={styles.sheetRef}>John 3:{selected} · KJV</Text>
              <Text style={styles.sheetTxt}>"{SAMPLE_VERSES.find(v => v.num === selected)?.text}"</Text>
            </View>
            <TouchableOpacity style={styles.sheetOption} onPress={() => setShareOpen(false)}><Text>Copy verse</Text></TouchableOpacity>
            <TouchableOpacity style={styles.sheetOption} onPress={() => setShareOpen(false)}><Text>Share outside</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0D16' },
  header: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#28304A', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  refSelect: { flexDirection: 'row', alignItems: 'center' },
  book: { fontSize: 19, fontWeight: '600', color: '#EDE7D6' },
  serif: { fontFamily: 'Fraunces-Regular' },
  chev: { marginLeft: 8, color: '#9AA2BC' },
  versionToggle: { flexDirection: 'row', backgroundColor: '#28304A', borderRadius: 9, padding: 4 },
  versionBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 7 },
  versionActive: { backgroundColor: '#C9A24B' },
  versionText: { color: '#9AA2BC', fontWeight: '700' },
  versionTextActive: { color: '#22190A', fontWeight: '700' },
  list: { padding: 16 },
  modalBackdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(8,10,20,0.55)' },
  shareSheet: { backgroundColor: '#12172A', padding: 16, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  sheetHandle: { width: 36, height: 4, backgroundColor: '#374162', borderRadius: 3, alignSelf: 'center', marginBottom: 12 },
  sheetPreview: { backgroundColor: '#F1E7D3', padding: 12, borderRadius: 10, marginBottom: 12 },
  sheetRef: { fontFamily: 'Fraunces-Regular', fontWeight: '600', color: '#5B3B1D', marginBottom: 6 },
  sheetTxt: { fontFamily: 'Fraunces-Regular', fontStyle: 'italic', color: '#2A2312' },
  sheetOption: { padding: 12, backgroundColor: 'transparent', borderRadius: 10 },
});
