import React from "react";
import { Feather } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

import currencyFormat from "../../shared/currencyFormat";

import styles from "./styles";

import logo from "../../assets/logo.png";

export default function Details() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const formatedValue = currencyFormat.format(incident.value);

  const message = `Olá ${incident.name}, estou entrando em contato para ajudar no caso ${incident.title} com o valor de "${formatedValue}"`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsapp() {
    let messageWhats = message.replace('"', "*");
    while (messageWhats.indexOf('"') > -1)
      messageWhats = messageWhats.replace('"', "*");
    Linking.openURL(
      `whatsapp://send?phone=+5561982644061&text=${messageWhats}`
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={26} color="#E82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <View style={styles.incidentFooter}>
          <View style={styles.flexColumn}>
            <Text style={styles.incidentProperty}>Cidade/Estado:</Text>
            <Text style={styles.incidentValue}>
              {incident.city}/{incident.uf}
            </Text>
          </View>

          <View style={styles.flexColumn}>
            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>{formatedValue}</Text>
          </View>
        </View>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói deste caso.</Text>

        <Text style={styles.heroDescription}>Entre em contato.</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.action}
            activeOpacity={0.6}
            onPress={sendWhatsapp}
          >
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.action}
            activeOpacity={0.6}
            onPress={sendMail}
          >
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
