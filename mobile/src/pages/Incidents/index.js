import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";

import currencyFormat from "../../shared/currencyFormat";

import api from "../../services/api";

import logo from "../../assets/logo.png";

import styles from "./styles";

export default function Incidents() {
  const navigation = useNavigation();

  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navigateToDetail(incident) {
    navigation.navigate("detail", { incident });
  }

  function reloadIncidents() {
    setIncidents([]);
    setPage(1);
    setTotal(0);
    loadIncidents();
    console.log("aqui--------------------");
  }

  async function loadIncidents() {
    if (loading || (total > 0 && total == incidents.length)) return;

    setLoading(true);

    const response = await api.get("/incidents", { params: { page } });

    console.log(response.headers);

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);

    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} />

        <TouchableOpacity onPress={reloadIncidents}>
          <Feather name="refresh-cw" size={20} color="#E02041"></Feather>
        </TouchableOpacity>

        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} caso(s)</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      {loading && <Text style={styles.description}>Carregando...</Text>}

      <FlatList
        data={incidents}
        style={styles.incidentsList}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        // showsVerticalScrollIndicator={false}
        keyExtractor={(incident) => String(incident.id)}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>
              {currencyFormat.format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={20} color="#E02041"></Feather>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
