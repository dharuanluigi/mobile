import { View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import { styles } from "./styles";
import { THEME } from "../../theme";
import logoImage from "../../assets/logo-nlw-esports.png";

import { Background } from "../../components/Background";
import { GameParamProps } from "../../@types/navigation";
import { Heading } from "../../components/Heading";

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParamProps;

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} />
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
      </SafeAreaView>
    </Background>
  );
}
