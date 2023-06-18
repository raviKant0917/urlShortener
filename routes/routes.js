import express from 'express'
import { getUrl, postUrl, getInfo, toHome } from '../controllers/urlController.js'
export const router = express.Router()

router.get('/', toHome);
router.get('/:shortUrl', getUrl);
router.post('/url', postUrl);
router.get('/analytics/:shortId', getInfo);