import {StyleSheet, Text, View} from '@react-pdf/renderer'

const TitleHealthScorePdf = ({
  title = '',
  backgroundWidth = 75,
  backgroundHeight = 55,
}) => {
  const styles = StyleSheet.create({
    headerContainer: {
      position: 'relative',
      marginBottom: 10,
    },
    yellowBackground: {
      width: backgroundWidth,
      height: backgroundHeight,
      position: 'absolute',
      backgroundColor: '#FFE802',
      top: 0,
      left: -16,
    },
    textContainer: {
      position: 'relative',
      paddingTop: 8,
    },
    headerText: {
      fontSize: 14,
      fontFamily: 'SF Pro Text',
      fontWeight: 'semibold',
    },
  })

  return (
    <View style={styles.headerContainer} wrap={false}>
      <View style={styles.yellowBackground} />
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  )
}

export default TitleHealthScorePdf
