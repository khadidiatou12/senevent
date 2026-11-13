import { useState, useEffect } from "react";
import {
  View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Pressable,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getEvenements } from "@senevent/shared";
import BoutonInscription from "../../components/BoutonInscription";

const COULEURS = {
  concert: "#7c3aed",
  expo: "#db2777",
  conference: "#2563eb",
  atelier: "#ea580c",
  soutenance: "#0891b2",
  sport: "#16a34a",
};

const IMAGES_DEFAUT = {
  concert:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&q=80",
  expo:
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=900&q=80",
  conference:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
  atelier:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
  soutenance:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80",
};

const formatDate = (iso) => {
  if (!iso) return "";
  return new Date(iso).toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Detail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [evenement, setEvenement] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const charger = async () => {
      const tous = await getEvenements();
      const trouve = tous.find((ev) => ev.id === Number(id));
      setEvenement(trouve ?? null);
      setChargement(false);
    };
    charger();
  }, [id]);

  if (chargement) {
    return (
      <ActivityIndicator size="large" color="#1a3a5c" style={styles.centre} />
    );
  }

  if (!evenement) {
    return <Text style={styles.centre}>Evenement introuvable.</Text>;
  }

  const estGratuit = evenement.prix === 0;
  const prix = estGratuit ? "Gratuit" : `${evenement.prix} FCFA`;
  const couleur = COULEURS[evenement.categorie] || "#64748b";
  const image =
    evenement.image_url ||
    IMAGES_DEFAUT[evenement.categorie] ||
    IMAGES_DEFAUT.concert;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageBox}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={[styles.badge, { backgroundColor: couleur }]}>
          <Text style={styles.badgeTexte}>{evenement.categorie}</Text>
        </View>
      </View>
      <View style={styles.contenu}>
        <Text style={styles.titre}>{evenement.titre}</Text>

        <View style={styles.ligne}>
          <Text style={styles.infoTexte}>📍 {evenement.lieu_nom}</Text>
        </View>
        <View style={styles.ligne}>
          <Text style={styles.infoTexte}>🗓️ {formatDate(evenement.date_debut)}</Text>
        </View>

        <Text style={estGratuit ? styles.prixGratuit : styles.prix}>
          {prix}
        </Text>

        <BoutonInscription evenementId={evenement.id} />

        <Pressable style={styles.bouton} onPress={() => router.push("/")}>
          <Text style={styles.boutonTexte}>Retour a la liste</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imageBox: { position: "relative", width: "100%", height: 220 },
  image: { width: "100%", height: 220 },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeTexte: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  contenu: { padding: 16 },
  titre: { fontSize: 24, fontWeight: "bold", color: "#1a3a5c", marginBottom: 12 },
  ligne: { marginTop: 10 },
  infoTexte: { fontSize: 15, color: "#44546a" },
  prix: { fontSize: 22, color: "#ea7d2b", fontWeight: "bold", marginTop: 16 },
  prixGratuit: { fontSize: 22, color: "#16a34a", fontWeight: "bold", marginTop: 16 },
  centre: { textAlign: "center", marginTop: 40 },
  bouton: {
    backgroundColor: "#1a3a5c",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 24,
  },
  boutonTexte: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
