import { connectionDb } from '../config/dbConnection.js';
import {
  badResponse,
  createdResponse,
  errorResponse,
  notFoundResponse,
  succesfullyResponse,
} from '../helpers/response.dto.js';

const getContacts = async (req, res) => {
  try {
    const [rows] = await connectionDb.query('select * from contacts');

    return succesfullyResponse(res, rows, 'contacts list');
  } catch (error) {
    console.log('ERROR DB', error);
    return badResponse(res, 'server error');
  }
};

const getContactComplete = async (req, res) => {
  try {
    const SQL_CONTACT = 'SELECT * FROM contacts WHERE idContact = ?';
    const [rowContact] = await connectionDb.query(SQL_CONTACT, [
      req.params.idContact,
    ]);

    if (!rowContact.length) {
      return notFoundResponse(res, 'there is no contact found');
    }

    const SQL_CONTACT_DATA =
      'SELECT * FROM contactData WHERE idContactData = ?';

    const [rowContactData] = await connectionDb.query(SQL_CONTACT_DATA, [
      req.params.idContact,
    ]);

    if (!rowContactData.length) {
      return succesfullyResponse(
        res,
        rowContact[0],
        'contact data is incomplete',
      );
    }

    const { idContactData, createdAt, updatedAt, ...restContactDataComplete } =
      rowContactData[0];
    const contactDataResponse = {
      ...rowContact[0],
      ...restContactDataComplete,
    };
    return succesfullyResponse(
      res,
      contactDataResponse,
      'contact data is complete',
    );
  } catch (error) {
    console.log('ERROR DB', error);
    return badResponse(res, 'server error');
  }
};

const createContact = async (req, res) => {
  try {
    const { body } = req;

    const SQL_CONTACT = 'INSERT INTO contacts SET ?';
    const [result] = await connectionDb.query(SQL_CONTACT, [body]);
    const { insertId } = result;

    return createdResponse(
      res,
      {
        id: insertId,
        ...body,
      },
      'contact created successfully',
    );
  } catch (error) {
    console.log('ERROR DB', error);
    return errorResponse(res, 'server error');
  }
};

const updateContact = async (req, res) => {
  try {
    const { idContact } = req.params;

    if (!idContact) {
      return badResponse(res, 'Server error');
    }

    const { body } = req;

    if (!Object.keys(body).length) {
      return badResponse(res, 'Do not have data to update');
    }

    const SQL_UPDATE = 'UPDATE contacts SET ? WHERE idContact = ?';

    await connectionDb.query(SQL_UPDATE, [body, idContact]);

    return succesfullyResponse(res, null, 'contacts updated successfully');
  } catch (error) {
    console.log('ERROR DB', error);
    return errorResponse(res, error.sqlMessage);
  }
};

export { getContacts, createContact, getContactComplete, updateContact };
