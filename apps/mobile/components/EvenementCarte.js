import { Link } from "expo-router";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

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
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
  expo:
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=80",
  conference:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  atelier:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
  soutenance:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
};

const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const date = d.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const heure = d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} · ${heure}`;
};

export default function EvenementCarte({ evenement }) {
  const estGratuit = evenement.prix === 0;
  const prix = estGratuit ? "Gratuit" : `${evenement.prix} FCFA`;
  const couleur = COULEURS[evenement.categorie] || "#64748b";
  const image =
    evenement.image_url ||
    IMAGES_DEFAUT[evenement.categorie] ||
    IMAGES_DEFAUT.concert;

  return (
    <Link href={`/evenement/${evenement.id}`} asChild>
      <Pressable style={styles.carte}>
        <View style={styles.imageBox}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={[styles.badge, { backgroundColor: couleur }]}>
            <Text style={styles.badgeTexte}>{evenement.categorie}</Text>
          </View>
        </View>
        <View style={styles.contenu}>
          <View style={styles.entete}>
            <Text style={styles.titre} numberOfLines={2}>
              {evenement.titre}
            </Text>
            <Text style={estGratuit ? styles.prixGratuit : styles.prix}>
              {prix}
            </Text>
          </View>
          <Text style={styles.ligne}>📍 {evenement.lieu_nom}</Text>
          {evenement.date_debut && (
            <Text style={styles.ligne}>🗓️ {formatDate(evenement.date_debut)}</Text>
          )}
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  carte: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  imageBox: {
    position: "relative",
    width: "100%",
    height: 160,
  },
  image: {
    width: "100%",
    height: 160,
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeTexte: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  contenu: {
    padding: 12,
  },
  entete: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  titre: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a3a5c",
  },
  prix: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ea7d2b",
  },
  prixGratuit: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#16a34a",
  },
  ligne: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 6,
  },
});
