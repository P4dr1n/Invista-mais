import * as React from "react";
import {ScrollView, Text, StyleSheet, Image, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Line21 from "../assets/line-21.svg"
import Line22 from "../assets/line-22.svg"
import Line23 from "../assets/line-23.svg"

const HOME = () => {
  	
  	return (
    		<LinearGradient style={styles.home} locations={[0,0.5,1]} colors={['#5028c6','#603ec5','#b3b0bc']} useAngle={true} angle={180}>
      			<ScrollView style={[styles.scrollview, styles.scrollviewLayout]}>
        				<ScrollView style={styles.groupParent} contentContainerStyle={styles.frameContainerContent}>
          					<View style={styles.dividaR150000Parent}>
            						<Text style={[styles.dividaR150000, styles.saldoR25000FlexBox]}>DIVIDA: R$ 1500,00</Text>
            						<Text style={[styles.saldoR25000, styles.saldoR25000FlexBox]}>{`SALDO: R$ 250,00 `}</Text>
            						<Text style={[styles.metaR1000000, styles.saldoR25000FlexBox]}>META: R$ 10.000,00</Text>
            						<Line21 style={[styles.groupChild, styles.groupLayout]} width={382} height={2} />
            						<Line22 style={[styles.groupItem, styles.groupLayout]} width={382} height={2} />
            						<Line23 style={[styles.groupInner, styles.groupLayout]} width={382} height={2} />
          					</View>
          					<ScrollView style={styles.desenpenhoMensalParent} contentContainerStyle={styles.frameContainer1Content}>
            						<Text style={styles.desenpenhoMensal}>{`DESENPENHO MENSAL: `}</Text>
            						<Image style={[styles.imagem20250423130122277Icon, styles.scrollviewLayout]} resizeMode="cover" source="imagem_2025-04-23_130122277.png" />
          					</ScrollView>
        				</ScrollView>
        				<Image style={styles.homeChild} resizeMode="cover" source="Group 61.png" />
      			</ScrollView>
    		</LinearGradient>);
};

const styles = StyleSheet.create({
  	frameContainer1Content: {
    		flexDirection: "column",
    		alignItems: "flex-start",
    		justifyContent: "flex-start",
    		gap: 22
  	},
  	frameContainerContent: {
    		flexDirection: "column",
    		alignItems: "flex-start",
    		justifyContent: "flex-start",
    		gap: 107
  	},
  	scrollviewLayout: {
    		maxWidth: "100%",
    		width: "100%"
  	},
  	saldoR25000FlexBox: {
    		height: 40,
    		justifyContent: "center",
    		alignItems: "center",
    		display: "flex",
    		textAlign: "center",
    		left: 0,
    		fontFamily: "KronaOne-Regular",
    		fontSize: 20,
    		position: "absolute"
  	},
  	groupLayout: {
    		height: 2,
    		width: 382,
    		left: 5,
    		position: "absolute"
  	},
  	dividaR150000: {
    		top: 0,
    		color: "#ff0d0d",
    		width: 273
  	},
  	saldoR25000: {
    		top: 56,
    		color: "#0dff00",
    		width: 264
  	},
  	metaR1000000: {
    		top: 112,
    		color: "#0551ff",
    		width: 293
  	},
  	groupChild: {
    		top: 40
  	},
  	groupItem: {
    		top: 90
  	},
  	groupInner: {
    		top: 150
  	},
  	dividaR150000Parent: {
    		width: 387,
    		height: 152
  	},
  	desenpenhoMensal: {
    		color: "#fff",
    		textAlign: "left",
    		alignSelf: "stretch",
    		fontFamily: "KronaOne-Regular",
    		fontSize: 20
  	},
  	imagem20250423130122277Icon: {
    		borderRadius: 16,
    		overflow: "hidden",
    		height: 267,
    		alignSelf: "stretch"
  	},
  	desenpenhoMensalParent: {
    		alignSelf: "stretch",
    		flex: 1
  	},
  	groupParent: {
    		top: 228,
    		left: 11,
    		width: 446,
    		maxWidth: 446,
    		position: "absolute",
    		flex: 1
  	},
  	homeChild: {
    		top: 17,
    		left: 30,
    		width: 357,
    		height: 83,
    		position: "absolute"
  	},
  	scrollview: {
    		backgroundColor: "transparent",
    		flex: 1
  	},
  	home: {
    		width: "100%"
  	}
});

export default HOME;
