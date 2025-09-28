import {StyleSheet, Text, View} from '@react-pdf/renderer'
import type React from 'react'
import type {ReactNode} from 'react'

const styles = StyleSheet.create({
  table: {
    display: 'flex',
    width: 'auto',
  },
  tableRow: {
    flexDirection: 'row',
  },
  firstTableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#D1D5DB',
    borderBottomWidth: 0.5,
    backgroundColor: '#FFD500',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  tableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#D1D5DB',
    borderBottomWidth: 0.5,
    backgroundColor: '#FFD500',
  },
  lastTableColHeader: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#D1D5DB',
    borderBottomWidth: 0.5,
    backgroundColor: '#FFD500',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  firstTableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#D1D5DB',
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderTopWidth: 0,
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#D1D5DB',
    borderBottomWidth: 0.5,
    borderTopWidth: 0,
  },
  lastTableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderColor: '#D1D5DB',
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 0,
  },
  tableCellHeader: {
    paddingLeft: 10,
    paddingVertical: 10,
    fontSize: 10,
    fontFamily: 'SF Pro Text',
    fontWeight: 'semibold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableCell: {
    margin: 5,
    padding: 3,
    fontSize: 9,
    fontFamily: 'SF Pro Text',
  },
})

interface TableDocumentProps {
  headers: string[]
  rowData: Array<Record<string, string | number | string[] | ReactNode>>
  cellStyles?: Record<string, (value: string) => object>
  headerCellStyles?: Record<string, object>
}

const TableDocument: React.FC<TableDocumentProps> = ({
  headers,
  rowData,
  cellStyles = {},
  headerCellStyles = {},
}) => {
  const createTableHeader = () => (
    <View style={styles.tableRow} wrap={false} fixed>
      {headers.map((header, index) => {
        let headerStyle

        if (index === 0) {
          headerStyle = [styles.firstTableColHeader, headerCellStyles[header]]
        } else if (index === headers.length - 1) {
          headerStyle = [styles.lastTableColHeader, headerCellStyles[header]]
        } else {
          headerStyle = [styles.tableColHeader, headerCellStyles[header]]
        }

        return (
          <View key={index} style={headerStyle}>
            <Text style={styles.tableCellHeader}>{header}</Text>
          </View>
        )
      })}
    </View>
  )

  const createTableRow = (
    row: Record<string, React.ReactNode | string | number | string[]>,
    rowIndex: number,
  ) => (
    <View style={styles.tableRow} key={rowIndex} wrap={false}>
      {headers.map((header, colIndex) => {
        const columnStyle = cellStyles[header]
          ? cellStyles[header](row[header] as string)
          : {}
        const customStyle = headerCellStyles[header] || {}

        let cellStyle

        if (colIndex === 0) {
          cellStyle = [styles.firstTableCol, customStyle]
        } else if (colIndex === headers.length - 1) {
          cellStyle = [styles.lastTableCol, customStyle]
        } else {
          cellStyle = [styles.tableCol, customStyle]
        }

        const cellContent = row[header]

        if (Array.isArray(cellContent)) {
          return (
            <View key={colIndex} style={cellStyle}>
              {cellContent}
            </View>
          )
        }

        return (
          <View key={colIndex} style={cellStyle}>
            {typeof cellContent === 'string' ||
            typeof cellContent === 'number' ? (
              <Text style={[styles.tableCell, columnStyle]}>{cellContent}</Text>
            ) : (
              cellContent
            )}
          </View>
        )
      })}
    </View>
  )

  return (
    <View style={styles.table}>
      {createTableHeader()}
      {rowData.map((row, index) => createTableRow(row, index))}
    </View>
  )
}

export default TableDocument
