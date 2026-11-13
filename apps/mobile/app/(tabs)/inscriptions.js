import { useState, useEffect, useCallback } from "react";
import {
  View, Text, FlatList, StyleSheet, ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { mesInscriptions } from "@senevent/shared";
import { useAuth } from "../../context/AuthContext";
import EvenementCarte from "../../components/EvenementCarte";

export default function Inscriptions() {
  const { session } = useAuth();
  const [evenements, setEvenements] = useState([]);
  const [chargement, setChargement] = useState(true);

  const charger = useCallback(async () => {
    if (!session) {
      setEvenements([]);
      setChargement(false);
      return;
    }
    setChargement(true);
    try {
      const data = await mesInscriptions(session.user.id);
      setEvenements(data);
    } catch (e) {
      console.error(e);
    } finally {
      setChargement(false);
    }
  }, [session]);

  useFocusEffect(
    useCallback(() => {
      charger();
    }, [charger])
  );

  if (!session) {
    return (
      <View style={styles.vide}>
        <Text style={styles.videIcone}>🔒</Text>
        <Text style={styles.videTexte}>
          Connecte-toi pour voir tes inscriptions.
        </Text>
      </View>
    );
  }

  if (chargement) {
    return (
      <ActivityIndicator size="large" color="#1a3a5c" style={styles.centre} />
    );
  }

  if (evenements.length === 0) {
    return (
      <View style={styles.vide}>
        <Text style={styles.videIcone}>🎫</Text>
        <Text style={styles.videTexte}>
          Tu n'es inscrit a aucun evenement.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.liste}
      data={evenements}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <EvenementCarte evenement={item} />}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}

const styles = StyleSheet.create({
  liste: { flex: 1, backgroundColor: "#f1f5f9" },
  centre: { marginTop: 40 },
  vide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f1f5f9",
  },
  videIcone: { fontSize: 48, marginBottom: 12 },
  videTexte: { fontSize: 16, color: "#64748b", textAlign: "center" },
});
