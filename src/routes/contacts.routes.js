import express from 'express';
import {
  createContact,
  getContactComplete,
  getContacts,
  updateContact,
} from '../controllers/contact.controller.js';

const router = express.Router();

router.get('/contacts', getContacts);
router.get('/contacts/all/:idContact', getContactComplete);
router.post('/contacts', createContact);
router.patch('/contacts/:idContact', updateContact);

export default router;
