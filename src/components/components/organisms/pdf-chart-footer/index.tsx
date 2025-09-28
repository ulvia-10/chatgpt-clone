import {StyleSheet, Text, View} from '@react-pdf/renderer'

type ChartFooterProps = {
  lastValue: number
  averageValue: number
  limitValue: number
  uom: string
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderTop: '1pt solid #ECECEC',
    backgroundColor: '#FAFAFA',
    fontSize: 10,
    fontFamily: 'SF Pro Text',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  section: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  valueSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  label: {
    fontSize: 8,
    color: '#3C3B3B',
    fontFamily: 'SF Pro Text',
  },
  value: {
    fontSize: 9,
    fontFamily: 'SF Pro Text',
    fontWeight: 'semibold',
    marginTop: 2,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  legendColor: {
    width: 5,
    height: 5,
  },
  legendLabel: {
    fontSize: 8,
    fontFamily: 'SF Pro Text',
  },
})

export function ChartFooterPdf({
  lastValue,
  averageValue,
  limitValue,
  uom,
}: ChartFooterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.valueSection}>
        <View style={styles.section}>
          <Text style={styles.label}>Last</Text>
          <Text style={styles.value}>
            {lastValue} {uom}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Average</Text>
          <Text style={styles.value}>
            {averageValue?.toFixed(2)} {uom}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Limit</Text>
          <Text style={styles.value}>
            {limitValue} {uom}
          </Text>
        </View>
      </View>

      <View>
        <View style={styles.legend}>
          <View style={{...styles.legendColor, backgroundColor: '#FFD500'}} />
          <Text style={styles.legendLabel}>Attention</Text>
          <View style={{...styles.legendColor, backgroundColor: 'red'}} />
          <Text style={styles.legendLabel}>Critical</Text>
        </View>
      </View>
    </View>
  )
}
