export type SetQuoteAction = {
  type: 'setQuote',
  quote: string|null
}

export default function setQuote(quote: string|null): SetQuoteAction {
  return {
    type: 'setQuote',
    quote
  }
}
