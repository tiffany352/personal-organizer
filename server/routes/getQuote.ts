import { IRouterContext } from "koa-router"

const quotes = [
  "…Don’t try it, Anakin. I have the high ground!",
  "I don’t like sand. It’s coarse and rough and irritating and it gets everywhere.",
  "I’ve been wondering… what are midi-chlorians?",
  "From my point of view, the Jedi are evil!",
  "For reasons we can’t explain, we are losing her.",
  "You don’t want to sell me death sticks.",
  "…I’m not afraid to die. I’ve been dying a little bit each day since you came back into my life.",
  "Nooooooooooooooooooo!",
  "Love won’t save you, Padme. Only my new powers can do that.",
  "Yousa thinking yousa people ganna die?"
]

export default function getQuote(ctx: IRouterContext) {
  const result = quotes[Math.floor(Math.random() * quotes.length)]

  ctx.body = {
    status: 'success',
    result
  }
}
