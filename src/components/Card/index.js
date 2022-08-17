import { Box } from 'rebass/styled-components'
import styled from 'styled-components/macro'

const Card = styled(Box)`
  width: ${({ width }) => width ?? '100%'};
  padding: ${({ padding }) => padding ?? '1rem'};
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '16px'};
  border: ${({ border }) => border};
`
export default Card

export const LightCard = styled(Card)`
  border: 1px solid #2C2F36;
  background-color: #212429;
`

export const LightGreyCard = styled(Card)`
  background-color: #2C2F36;
`
