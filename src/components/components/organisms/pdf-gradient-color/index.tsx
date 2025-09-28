import {Defs, LinearGradient, Rect, Stop, Svg} from '@react-pdf/renderer'
import type React from 'react'

interface GradientTextProps {
  key: number
  gradientColors: [string, string]
}

const GradientText: React.FC<GradientTextProps> = ({key, gradientColors}) => {
  return (
    <Svg
      width="100%"
      height="100%"
      style={{
        position: 'absolute',
        zIndex: 10,
        borderRadius: 5,
        overflow: 'hidden',
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#gradient${key})`}
        rx="50"
      />
      <Defs>
        <LinearGradient id={`gradient${key}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={gradientColors[0]} />
          <Stop offset="100%" stopColor={gradientColors[1]} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default GradientText
