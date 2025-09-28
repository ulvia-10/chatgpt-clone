import {StyleSheet, Text, View} from '@react-pdf/renderer'
import type React from 'react'
import GradientText from '../pdf-gradient-color'

interface DataItem {
  name: string
  score: number
  status: string
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    borderRadius: 4,
    position: 'relative',
    fontFamily: 'SF Pro Text',
    fontWeight: 'semibold',
  },
  text: {
    fontSize: 10,
    zIndex: 10,
    position: 'relative',
    padding: 5,
    fontFamily: 'SF Pro Text',
    fontWeight: 'semibold',
  },
})

const groupByStatus = (data: DataItem[]) => {
  const green = data.filter(item => item.status === 'NORMAL')
  const yellow = data.filter(item => item.status === 'ATTENTION')
  const red = data.filter(item => item.status === 'CRITICAL')

  return {green, yellow, red}
}

const getGradientColors = (status: string): [string, string] => {
  if (status === 'ATTENTION') {
    return ['#FFEA01', '#FFC300'] // Yellow gradient
  } else if (status === 'CRITICAL') {
    return ['#CF253C', '#F41F59'] // Red gradient
  } else {
    return ['#58AB24', '#24450F'] // Green gradient
  }
}

const ComponentRow: React.FC<{name: string; score: number; status: string}> = ({
  name,
  score,
  status,
}) => {
  const gradientColors = getGradientColors(status)
  const textColor = status === 'ATTENTION' ? '#000' : '#fff'

  return (
    <View style={styles.row}>
      <GradientText gradientColors={gradientColors} key={score} />
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text style={[styles.text, {color: textColor}]}>{name}</Text>
      </View>
      <Text style={[styles.text, {color: textColor, textAlign: 'right'}]}>
        {score}%
      </Text>
    </View>
  )
}

const Column: React.FC<{data: DataItem[]}> = ({data}) => (
  <View style={styles.column}>
    {data.map((item, index) => (
      <ComponentRow
        key={index}
        name={item.name}
        score={item.score}
        status={item.status}
      />
    ))}
  </View>
)

const OverviewParameter: React.FC<{data: DataItem[]}> = ({data}) => {
  const {green, yellow, red} = groupByStatus(data)

  const columns = [
    {color: 'green', data: green},
    {color: 'yellow', data: yellow},
    {color: 'red', data: red},
  ]

  const sortedColumns = columns.sort(a => (a.data.length === 0 ? 1 : -1))

  return (
    <View style={{flexDirection: 'row', gap: 10}}>
      {sortedColumns.map(({color, data}) => (
        <Column key={color} data={data} />
      ))}
    </View>
  )
}

export default OverviewParameter
