import { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import { styles } from "./styles";
import { THEME } from "../../theme";
import logoImage from "../../assets/logo-nlw-esports.png";

import { Background } from "../../components/Background";
import { GameParamProps } from "../../@types/navigation";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParamProps;

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [isDiscordDuoSelected, setIsDiscordDuoSelected] = useState("");

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.0.104:3000/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((response) => setIsDiscordDuoSelected(response.discord));
  }

  useEffect(() => {
    fetch(`http://192.168.0.104:3000/games/${game.id}/ads`)
      .then((response) => response.json())
      .then(setDuos);
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>
          <Image source={logoImage} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="contain"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />

        <DuoMatch
          visible={isDiscordDuoSelected.length > 0}
          discord={isDiscordDuoSelected}
          onClose={() => setIsDiscordDuoSelected("")}
        />
      </SafeAreaView>
    </Background>
  );
}
