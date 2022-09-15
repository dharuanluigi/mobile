import { View, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";

import { styles } from "./styles";

import logoImage from "../../assets/logo-nlw-esports.png";

import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    fetch("http://192.168.0.104:3000/games")
      .then((response) => response.json())
      .then(setGames);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}
