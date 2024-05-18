import styled from 'styled-components/native'

interface DividerProps {
  height: number
}

export default function Divider({ height }: DividerProps) {
  return <Line style={{ height: height }} />
}

const Line = styled.View`
  width: 100%;
  background-color: #f6f7f8;
`
