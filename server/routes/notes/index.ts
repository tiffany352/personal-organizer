import Router from 'koa-router'
import getNote from './getNote'
import addNote from './addNote'
import listNotes from './listNotes'
import editNote from './editNote'

const router = new Router()

router.get('/get/:id', getNote)
router.put('/add', addNote)
router.post('/edit', editNote)
router.get('/list', listNotes)

export default router
