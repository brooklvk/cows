const pool = require("../database/")

// GET DATA 

async function getCowTable(){
    try {
      const sql = "SELECT cow_id, cow_tag_current, birth_year, color, phys_description, breed, notes, date(branding_date), mother_cow_id, cow_was_calf FROM cow order by cow_id asc"
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

// EDIT A COW 
async function editCow(cow_id, cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf) {
    try {
        const sql = "UPDATE cow SET cow_tag_current = $2, birth_year = $3, color = $4, phys_description = $5, breed = $6, notes = $7, branding_date = $8, mother_cow_id = $9, cow_was_calf = $10 WHERE cow_id = $1 RETURNING *"
        let result = await pool.query(sql, [cow_id, cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf])
        return result.rows
    } catch (error) {
        return error.message 
    }
}

// ADD NEW COW 
async function insertCow(cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf){
    try {
        if (phys_description != null) {phys_description = '$4'}
        if (breed != null) {breed = '$5'}
        if (notes != null) {notes = '$6'}
        if (branding_date != null) {branding_date = '$7'}

        let sql = `INSERT INTO cow (cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf) VALUES ('$1', '$2', '$3', ${phys_description}, ${breed}, ${notes}, ${branding_date}, $8, $9) RETURNING *;`
        let result = await pool.query(sql, [cow_tag_current, birth_year, color, phys_description, breed, notes, branding_date, mother_cow_id, cow_was_calf])
        return result.rows
    } catch (error) {
        return error.message 
    }
}


module.exports = { getCowTable, getCalfTable, getBullTable, getDeathTable, getSaleTable, getVetTable, getShotsTable, getCowShotsTable, getCalfShotsTable, editCow, insertCow }