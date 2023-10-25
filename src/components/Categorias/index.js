import { 
    Text,
    View,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Button,
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function Categorias()
{
    return(
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 150,
            backgroundColor: '#5456'
        }}>
            <SafeAreaView style={styles.container}>
                <ScrollView horizontal={true} style={styles.scrollView}>
                    <View style={styles.containerIcons}>
                        <Text style={{paddingBottom: 15, fontSize: 20}}>Categorias</Text>
                        <View style={styles.viewIcons}>
                            <View style={styles.icons}>
                                <FontAwesome5 name="tshirt" size={35} color="black" />
                            </View>
                            <View style={styles.icons}>
                                <Ionicons name="fast-food" size={35} color="black" />
                            </View>
                            <View style={styles.icons}>
                                <MaterialIcons name="computer" size={35} color="black" />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        
    },
    containerIcons: {
        alignItems:'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 42,
    },
    viewIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    icons: {
        backgroundColor: 'rgba(124, 131, 133, 0.8)',
        flexDirection: 'row',
        padding: 4,
        borderRadius: 5
    }
  });