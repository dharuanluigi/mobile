import { TouchableOpacity, View, Text } from "react-native";
import { GameController } from "phosphor-react-native";

import { THEME } from "../../theme";
import { styles } from "./styles";

import { DuoInfo } from "../DuoInfo";

export interface DuoCardProps {
  id: string;
  name: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} />

      <DuoInfo
        label="Tempo de jogo"
        value={
          data.yearsPlaying > 1
            ? `${data.yearsPlaying} anos`
            : `${data.yearsPlaying} ano`
        }
      />

      <DuoInfo
        label="Disponibilidade"
        value={
          data.weekDays.length > 1
            ? `${data.weekDays.length} dias \u2022 ${data.hourStart}h - ${data.hourEnd}h`
            : `${data.weekDays.length} dia \u2022 ${data.hourStart}h - ${data.hourEnd}h`
        }
      />

      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20} />

        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
