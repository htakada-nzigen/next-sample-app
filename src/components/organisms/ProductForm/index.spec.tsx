import {
  render,
  act,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import ProductForm from './index'
import { theme } from '@/themes'

describe('ProductForm', () => {
  let renderResult: RenderResult
  let handleProductSave: jest.Mock
  //　スタブ
  global.URL.createObjectURL = () => 'https://test.com'

  beforeEach(() => {
    // @ts-expect-error
    handleProductSave = jest.fn()
    renderResult = render(
      <ThemeProvider theme={theme}>
        <ProductForm onProductSave={handleProductSave} />
      </ThemeProvider>,
    )
  })

  afterEach(() => {
    renderResult.unmount()
  })

  it('フォーム入力後、onProductSaveが呼ばれる', async () => {
    await act(async () => {
      const element = await screen.findByTestId('dropzone')
      fireEvent.drop(element, {
        dataTransfer: {
          files: [
            new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
          ],
        },
      })

      const inputProductNode = screen.getByPlaceholderText(
        /商品のタイトル/,
      ) as HTMLInputElement
      fireEvent.change(inputProductNode, { target: { value: 'title' } })

      const inputDescriptionNode = screen.getByPlaceholderText(
        /最高の商品です！/,
      ) as HTMLInputElement
      fireEvent.change(inputDescriptionNode, {
        target: { value: 'description' },
      })

      const inputPriceNode = screen.getByPlaceholderText(
        /100/,
      ) as HTMLInputElement
      fireEvent.change(inputPriceNode, { target: { value: '100' } })

      fireEvent.click(screen.getByText('出品'))
    })

    expect(handleProductSave).toHaveBeenCalledTimes(1)
  })

  it('商品タイトル入力だけでは、バリデーションエラーでonProductSaveが呼ばれない', async () => {
    await act(async () => {
      const inputProductNode = screen.getByPlaceholderText(
        /商品のタイトル/,
      ) as HTMLInputElement
      fireEvent.change(inputProductNode, { target: { value: 'title' } })

      fireEvent.click(screen.getByText('出品'))
    })

    expect(handleProductSave).toHaveBeenCalledTimes(0)
  })
})
