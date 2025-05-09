import express from 'express';
import {
  createContactData,
  getContactData,
  updateContactData,
} from '../controllers/contactData.controller.js';

const router = express.Router();

router.post('/contactsData', createContactData);
router.get('/contactsData/:idContact', getContactData);
router.patch('/contactsData/:idContact', updateContactData);

export default router;
