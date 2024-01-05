import { createGlobalStyle, ThemeProvider, css } from 'styled-components'
import { theme } from '../src/themes'
import * as NextImage from 'next/image'

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const bodyStyles = css`
  html,
  body,
  textarea {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    text-decoration: none;
    transition: .25s;
    color: #000000;
  }
`

const GlobalStyle = createGlobalStyle`
  body {
    ${bodyStyles}
  }
`

// Themeの適用

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  )
]

// addDecorator((story) => (
//   <ThemeProvider theme={theme}>
//     <GlobalStyle />
//     {story()}
//     </ThemeProvider>
// ))

// next/imageの差し替え
// const OriginalNextImage = NextImage.default;
//
// Object.defineProperty(NextImage, 'default', {
//   configurable: true,
//   // @ts-ignore
//   value: (props) => typeof props.src === 'string' ? (
//     <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
// ) : (
//   <OriginalNextImage {...props} unoptimized />
// ),
// })
