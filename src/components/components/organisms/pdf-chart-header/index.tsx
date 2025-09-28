import {StyleSheet, Text, View} from '@react-pdf/renderer'
import GradientText from '../pdf-gradient-color'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  title: {
    fontSize: 11,
    fontFamily: 'SF Pro Text',
    fontWeight: 'semibold',
    marginBottom: 4,
    flexWrap: 'wrap',
    maxWidth: 85,
  },
  description: {
    fontSize: 8,
    color: '#666',
    flexWrap: 'wrap',
    maxWidth: 85,
  },
  status: {
    padding: 3,
    fontSize: 9,
    fontFamily: 'SF Pro Text',
  },
  dateContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 9,
  },
  containerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: 65,
    justifyContent: 'center',
  },
  valueDate: {
    fontSize: 8,
    color: '#666',
    flexWrap: 'wrap',
    maxWidth: 70,
  },
})

type ChartHeaderProps = {
  title: string
  description: string
  status: string
  date?: string
  id: number
}

export function ChartHeaderPdf({
  title,
  description,
  status,
  date,
  id,
}: ChartHeaderProps) {
  const getGradientFill = (status: string): [string, string] => {
    if (status === 'ATTENTION') {
      return ['#FFEA01', '#FFC300'] // Yellow gradient
    } else if (status === 'CRITICAL') {
      return ['#CF253C', '#F41F59'] // Red gradient
    } else {
      return ['#58AB24', '#24450F'] // Green gradient
    }
  }

  const textColor = status === 'ATTENTION' ? '#000' : '#fff'

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {status ? (
          <View style={styles.containerStatus}>
            <GradientText gradientColors={getGradientFill(status)} key={id} />
            <Text style={[styles.status, {color: textColor}]}>{status}</Text>
          </View>
        ) : (
          ''
        )}
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date ? 'Date :' : ''}</Text>
        <Text style={styles.valueDate}>{date}</Text>
      </View>
    </View>
  )
}
