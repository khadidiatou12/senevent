import { useState, useCallback } from "react";
import {
  StyleSheet, Text, View, FlatList, ActivityIndicator, TextInput, Pressable,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { getEvenements } from "@senevent/shared";
import EvenementCarte from "../../components/EvenementCarte";

const CATEGORIES = ["concert", "expo", "conference", "atelier", "soutenance"];

export default function Evenements() {
  const [evenements, setEvenements] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [filtre, setFiltre] = useState("toutes");

  useFocusEffect(
    useCallback(() => {
      const charger = async () => {
        try {
          const data = await getEvenements();
          setEvenements(data);
        } catch (e) {
          setErreur(e.message);
        } finally {
          setChargement(false);
        }
      };
      charger();
    }, [])
  );

  const filtres = evenements.filter((ev) => {
    const matchRecherche = ev.titre
      .toLowerCase()
      .includes(recherche.toLowerCase());
    const matchFiltre = filtre === "toutes" || ev.categorie === filtre;
    return matchRecherche && matchFiltre;
  });

  const Entete = () => (
    <View style={styles.entete}>
      <Text style={styles.heroTitre}>SenEvent</Text>
      <Text style={styles.heroSousTitre}>
        Tous les evenements a Dakar, au meme endroit
      </Text>

      <TextInput
        style={styles.recherche}
        placeholder="Rechercher un evenement..."
        value={recherche}
        onChangeText={setRecherche}
      />

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={["toutes", ...CATEGORIES]}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.chips}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.chip, filtre === item && styles.chipActif]}
            onPress={() => setFiltre(item)}
          >
            <Text style={filtre === item ? styles.chipTexteActif : styles.chipTexte}>
              {item === "toutes" ? "Toutes" : item}
            </Text>
          </Pressable>
        )}
      />

      <Text style={styles.compteur}>
        {filtres.length} evenement(s)
      </Text>
    </View>
  );

  if (chargement) {
    return (
      <ActivityIndicator size="large" color="#1a3a5c" style={styles.centre} />
    );
  }

  if (erreur) {
    return <Text style={styles.erreur}>Erreur : {erreur}</Text>;
  }

  return (
    <FlatList
      style={styles.liste}
      data={filtres}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <EvenementCarte evenement={item} />}
      ListHeaderComponent={Entete}
      ListEmptyComponent={
        <Text style={styles.vide}>Aucun evenement trouve.</Text>
      }
      contentContainerStyle={styles.contenu}
    />
  );
}

const styles = StyleSheet.create({
  liste: { backgroundColor: "#f0f4f8" },
  contenu: { paddingBottom: 16 },
  entete: {
    backgroundColor: "#1a3a5c",
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  heroTitre: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  heroSousTitre: {
    fontSize: 14,
    color: "#cbd5e1",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 14,
  },
  recherche: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  chips: { gap: 8, paddingVertical: 12 },
  chip: {
    backgroundColor: "#2e4d6b",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  chipActif: { backgroundColor: "#ea7d2b" },
  chipTexte: { color: "#cbd5e1", fontSize: 13 },
  chipTexteActif: { color: "#fff", fontSize: 13, fontWeight: "600" },
  compteur: { color: "#cbd5e1", fontSize: 13 },
  centre: { marginTop: 40 },
  vide: { textAlign: "center", color: "#64748b", marginTop: 20 },
  erreur: {
    color: "#a01a1a",
    textAlign: "center",
    marginTop: 40,
    paddingHorizontal: 16,
  },
});
