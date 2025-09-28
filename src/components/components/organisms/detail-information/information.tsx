import type React from 'react'

interface InformationProps {
  details: {
    label: string
    value: string
  }[]
}

const Information: React.FC<InformationProps> = ({details}) => {
  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Detail Information</h1>
      <div className="grid grid-cols-4">
        {details.map((item, index) => (
          <div key={index} className="mb-3">
            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
            <p className="font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Information
