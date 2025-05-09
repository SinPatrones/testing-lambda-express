import { connectionDb } from '../config/dbConnection.js';
import {
  badResponse,
  createdResponse,
  errorResponse,
  succesfullyResponse,
} from '../helpers/response.dto.js';

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
const createContactData = async (req, res) => {
  try {
    const { body } = req;

    if (!body?.idContactData) {
      return res.status(400).json({
        success: false,
        message: 'must have contact data id',
        data: null,
      });
    }

    const SQL_GET_CONTACT = 'SELECT * FROM contacts where idContact = ?';
    const [rows] = await connectionDb.query(
      SQL_GET_CONTACT,
      body.idContactData,
    );

    if (!rows.length) {
      return badResponse(res, 'contact data id does not exist');
    }

    const SQL_CONTACT = 'INSERT INTO contactData SET ?';
    await connectionDb.query(SQL_CONTACT, [body]);

    return createdResponse(
      res,
      {
        id: body?.idContactData,
        ...body,
      },
      'contact data created',
    );
  } catch (error) {
    console.log('ERROR DB', error);
    return badResponse(res, 'server error');
  }
};

const updateContactData = async (req, res) => {
  try {
    const { idContact } = req.params;

    if (!idContact) {
      return badResponse(res, 'Server error');
    }

    const { body } = req;

    if (!Object.keys(body).length) {
      return badResponse(res, 'Do not have data to update');
    }

    const SQL_UPDATE = 'UPDATE contactData SET ? WHERE idContactData = ?';

    await connectionDb.query(SQL_UPDATE, [body, idContact]);

    return succesfullyResponse(
      res,
      null,

      'contacts data complemntary updated successfully',
    );
  } catch (error) {
    console.log('ERROR DB', error);
    return errorResponse(res, error.sqlMessage);
  }
};

/**
 * Represents a book.
 * @constructor
 * @param {string} name - The title of the book.
 * @param {string} lastname - The author of the book.
 */
const getContactData = async (req, res) => {
  try {
    const [rows] = await connectionDb.query(
      'SELECT * FROM contactData WHERE idContactData = ?',
      [req.params.idContact],
    );

    return succesfullyResponse(
      res,
      rows.length ? rows[0] : null,
      rows.length ? 'contact data found' : 'contact data not found',
    );
  } catch (error) {
    console.log('ERROR DB', error);
    return badResponse(res, 'server error');
  }
};

export { createContactData, getContactData, updateContactData };
