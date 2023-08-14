const pool = require("../database/")

// GET DATA 

async function getCowTable(){
    try {
      const sql = "SELECT cow_id, cow_tag_current, birth_year, color, phys_description, breed, notes, date(branding_date), mother_cow_id, cow_was_calf FROM cow"
      let result = await pool.query(sql)
        return result.rows 
    } catch (error) {
      return error.message
    }
}

async function getCalfTable(){
    try {
        const sql = "SELECT * FROM calf"
        let result = await pool.query(sql)
        return result.rows
      } catch (error) {
        return error.message
      }
}

async function getBullTable(){
    try {
        const sql = "SELECT * FROM bull"
        let result = await pool.query(sql)
        return result.rows
      } catch (error) {
        return error.message
      }
}

async function getDeathTable(){
    try {
        const sql = "SELECT * FROM death"
        let result = await pool.query(sql)
        return result.rows
      } catch (error) {
        return error.message
      }
}

async function getSaleTable(){
    try {
        const sql = "SELECT * FROM sale"
        let result = await pool.query(sql)
        return result.rows
      } catch (error) {
        return error.message
      }
}

async function getVetTable(){
    try {
        const sql = "SELECT * FROM vet"
        let result = await pool.query(sql)
        return result.rows
      } catch (error) {
        return error.message
      }
}

async function getShotsTable(){
    try {
        const sql = "SELECT * FROM shots"
        let result = await pool.query(sql)
        return result.rows
      } catch (error) {
        return error.message
      }
}

async function getCowShotsTable(){
    try {
        const sql = "SELECT * FROM cow_has_shots"
        let result = await pool.query(sql)
        return result.rows
      } catch (error) {
        return error.message
      }
}

async function getCalfShotsTable(){
    try {
        const sql = "SELECT * FROM calf_has_shots"
        let result = await pool.query(sql)
        return result.rows
      } catch (error) {
        return error.message
      }
}

// EDIT 

async function insertCow(cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf){
    try {
        const sql = "INSERT INTO cow (cow_id, cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf) VALUES (DEFAULT, '$1', '$2', '$3', '$4', '$5', '$6', '$7', '$8');"
        let result = await pool.query(sql, [cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf])
        return result.rows
    } catch (error) {
        return error.message 
    }
}


module.exports = { getCowTable, getCalfTable, getBullTable, getDeathTable, getSaleTable, getVetTable, getShotsTable, getCowShotsTable, getCalfShotsTable, insertCow }