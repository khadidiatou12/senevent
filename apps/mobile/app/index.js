import {
  View, Text, ImageBackground, StyleSheet, Pressable, StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

export default function Landing() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1200&q=80",
      }}
      style={styles.fond}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay} />

      <View style={styles.contenu}>
        <Text style={styles.kicker}>DAKAR · EVENEMENTS</Text>
        <Text style={styles.titre}>SenEvent</Text>
        <Text style={styles.sousTitre}>
          Tous les evenements de la ville, au meme endroit.
        </Text>

        <Pressable
          style={styles.boutonPrimaire}
          onPress={() => router.push("/(tabs)")}
        >
          <Text style={styles.boutonPrimaireTexte}>
            Decouvrir les evenements
          </Text>
        </Pressable>
      </View>

      <View style={styles.pied}>
        <Text style={styles.piedTexte}>Projet RETEL · UCAD Dakar</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fond: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,22,40,0.75)",
  },
  contenu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  kicker: {
    color: "#f0a868",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 14,
  },
  titre: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "800",
    letterSpacing: -1,
  },
  sousTitre: {
    color: "#cdd9e7",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginTop: 12,
    marginBottom: 36,
  },
  boutonPrimaire: {
    backgroundColor: "#ea7d2b",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  boutonPrimaireTexte: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  pied: {
    alignItems: "center",
    paddingBottom: 30,
  },
  piedTexte: {
    color: "#8ca3bd",
    fontSize: 13,
  },
});
