import {formatDate} from '@/lib/format-date'
import {StyleSheet, Text, View} from '@react-pdf/renderer'
import GradientText from '../pdf-gradient-color'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  scoreContainer: {
    fontSize: 12,
    fontFamily: 'SF Pro Text',
    fontWeight: 'semibold',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  shadowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 8,
    fontFamily: 'SF Pro Text',
    color: '#3C3B3B',
  },
  boldText: {
    fontSize: 8,
    fontFamily: 'SF Pro Text',
    fontWeight: 'semibold',
    marginTop: 2,
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
  },
})

const getGradientColors = (status: string): [string, string] => {
  if (status === 'ATTENTION') {
    return ['#FFEA01', '#FFC300'] // Yellow gradient
  } else if (status === 'CRITICAL') {
    return ['#CF253C', '#F41F59'] // Red gradient
  } else {
    return ['#58AB24', '#24450F'] // Green gradient
  }
}

const DetailParameterHealthScorePdf = ({
  name,
  workingHours,
  lastUploadDate,
  score,
  status,
}: {
  name: string
  workingHours: number
  lastUploadDate: string
  score: number
  status: string
}) => {
  const gradientColors = getGradientColors(status)
  const textColor = status === 'ATTENTION' ? '#000' : '#fff'

  return (
    <View style={styles.container} wrap>
      <View style={styles.scoreContainer}>
        <GradientText gradientColors={gradientColors} key={score} />
        <Text style={[{marginRight: 16, padding: 8}, {color: textColor}]}>
          {name}
        </Text>
        <Text
          style={[{fontSize: 14, padding: 8}, {color: textColor}]}
        >{`${score}%`}</Text>
      </View>
      <View style={styles.shadowBox}>
        <View style={styles.column}>
          <Text style={styles.text}>Working Hours :</Text>
          <Text style={styles.boldText}>{workingHours}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.column}>
          <Text style={styles.text}>Last Component Upload Date :</Text>
          <Text style={styles.boldText}>
            {lastUploadDate
              ? formatDate({date: lastUploadDate, formatDate: 'dd-MM-yyyy'})
              : '-'}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default DetailParameterHealthScorePdf
