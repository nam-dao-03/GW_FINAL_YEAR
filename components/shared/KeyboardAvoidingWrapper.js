import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

function KeyboardAvoidingWrapper({ children, style }) {
  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardAvoidingWrapper;
