const { safeHandle } = require("../utils/safeHandle");
const { databaseConnection } = require("../db");
const { getUserSessionByID } = require("../services/authService");

const ADD_PARISHIONER = "add-parishioner";
const GET_PARISHIONER = 'get-parishioner';
const GET_PARISHIONER_ID = 'get-parishioner-id';
function addParishionerHandler() {
  safeHandle(ADD_PARISHIONER, async (event, formData) => {
    try {
      // Example: insert into MySQL (you can adapt)
      const sql = "INSERT INTO tblparishioners(first_name, middle_name, last_name, birth_date, gender, civil_status, father_name, mother_name, religion, residence_address, occupation, income, registered_voter, out_town, present_address, contact_number, email_address, mass_goer, bec_member, alay_kapwa_contributor, baptism_book_number, baptism_page_number, baptism_date, baptism_place, baptism_officiating_minister, baptism_book_archival, baptism_male_sponsor, baptism_female_sponsor, encoded_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const encoded_by = await getUserSessionByID();
    console.log(encoded_by);
   
    const values = [
      formData.first_name,
      formData.middle_name,
      formData.last_name,
      formData.birth_date,
      formData.gender,
      formData.civil_status,
      formData.father_name,
      formData.mother_name,
      formData.religion,
      formData.residence_address,
      formData.occupation,
      formData.income,
      formData.registered_voter,
      formData.out_town,
      formData.present_address,
      formData.contact_number,
      formData.email_address,
      formData.mass_goer,
      formData.bec_member,
      formData.alay_kapwa_contributor,
      formData.baptism_book_number,
      formData.baptism_page_number,
      formData.baptism_date,
      formData.baptism_place,
      formData.baptism_officiating_minister,
      formData.baptism_book_archival,
      formData.baptism_male_sponsor,
      formData.baptism_female_sponsor,
      encoded_by
    ];
    await databaseConnection.promise().query(sql,values);
    return { success: true, message: 'Parishioner has been added' };
    } catch (error) {
         console.error(error);
          return { success: false, message: error.message };
    }
  });
}

function getParishionersHandler() {
  //Display on admin datatable role=user
  safeHandle(GET_PARISHIONER, async () => {
    const [data] = await databaseConnection
      .promise()
      .query(
        `SELECT parishioner_id, first_name, middle_name, last_name, birth_date, gender, civil_status, residence_address, present_address FROM tblparishioners`
      );

    return { success: true, parishioner: data };

  });
}

function getParishionersByIDHandler() {
  //Display on admin datatable role=user
  safeHandle(GET_PARISHIONER_ID, async (event, {parishionerId}) => {
    const [data] = await databaseConnection
      .promise()
      .query(
        `SELECT * FROM tblparishioners WHERE parishioner_id = ?`,[parishionerId]
      );

    return { success: true, parishioner: data };

  });
}


module.exports = {
    addParishionerHandler,
    getParishionersHandler,
    getParishionersByIDHandler
}
