// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'
import { ButtonVariant } from '@/components/atoms/Button'
import { TextVariant } from '@/components/atoms/Text'
import type { Responsive } from '@/types/styles'
import {
  toPropValue,
  Color,
  FontSize,
  LetterSpacing,
  LineHeight,
  Space,
} from '@/utils/styles'

export type TestProps = {
  color?: Responsive<Color>
  backgroundColor?: Responsive<Color>
}

const Test = styled('div').withConfig({
  shouldForwardProp: (prop) => prop !== 'backgroundColor',
})<TestProps>`
  ${(props) => toPropValue('color', props.color, props.theme)}
  ${(props) =>
    toPropValue('background-color', props.backgroundColor, props.theme)}
`

export default Test
