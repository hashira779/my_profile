import React, { useState, useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';
interface Props {
  texts: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  style?: any;
  cursorColor?: string;
  cursorHeight?: number;
}
export default function TypeWriter({
  texts, typingSpeed = 72, deleteSpeed = 38,
  pauseDuration = 1800, style, cursorColor = '#2563EB', cursorHeight = 28,
}: Props) {
  const [display, setDisplay] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const textIdx = useRef(0);
  const charIdx = useRef(0);
  const blink = useRef(new Animated.Value(1)).current;
  const useNativeDriver = Platform.OS !== 'web';
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0, duration: 480, useNativeDriver }),
        Animated.timing(blink, { toValue: 1, duration: 480, useNativeDriver }),
      ])
    ).start();
  }, [blink, useNativeDriver]);
  useEffect(() => {
    const current = texts[textIdx.current];
    let t: ReturnType<typeof setTimeout>;
    if (!isDeleting) {
      if (charIdx.current < current.length) {
        t = setTimeout(() => {
          setDisplay(current.slice(0, charIdx.current + 1));
          charIdx.current++;
        }, typingSpeed);
      } else {
        t = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (charIdx.current > 0) {
        t = setTimeout(() => {
          setDisplay(current.slice(0, charIdx.current - 1));
          charIdx.current--;
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        textIdx.current = (textIdx.current + 1) % texts.length;
      }
    }
    return () => clearTimeout(t);
  }, [display, isDeleting]);
  return (
    <View style={styles.row}>
      <Text style={style}>{display}</Text>
      <Animated.View style={[styles.cursor, { backgroundColor: cursorColor, height: cursorHeight, opacity: blink }]} />
    </View>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  cursor: { width: 3, height: 28, marginLeft: 2, borderRadius: 2 },
});
