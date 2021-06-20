
require('dotenv').config()
const moment = require('moment')
const executeQuery = require('../../db/connect')
const { NOT_FOUND, INTERNAL_SERVER_ERROR, OK } = require('../../utils/apiStatus')

const onLoadQuotations = async (req, res) => {
  const query = 'SELECT * FROM onload_quotation'

  try {
    return executeQuery(query).then((data) => {
      const containerType = []
      const incoterms = []
      const terms = []
      const ports = []

      data.rows.forEach((ca) => {
        if (ca.container_type !== '') {
          containerType.push({
            label: ca.container_type,
            value: ca.container_type
          })
        }
        if (ca.ports !== '') {
          ports.push({
            label: ca.ports,
            value: ca.ports
          })
        }

        if (ca.incoterms !== '') {
          incoterms.push({
            label: ca.incoterms,
            value: ca.incoterms
          })
        }

        if (ca.terms !== '') {
          terms.push({
            label: ca.terms,
            value: ca.terms
          })
        }
      })

      const json = {
        portOfLoading: ports,
        portOfDischarge: ports,
        containerType: containerType,
        incoterms: incoterms,
        terms: terms
      }
      res.status(OK).send({ data: json, message: 'fetched.' })
    })
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err })
  }
}

const getDataFromExcelSheet = async (req, res) => {

}

const createQuotation = async (req, res) => {
  const { origin, destination, contractName, containerType, twentyFeetContainer, exportorimport, fourtyFeetContainer, fourtyFeetHighCube, cargoReadyDate, incoterms, terms, customerId } = req.body
  const query = `INSERT INTO quotation("origin", "destination", "contract_name", "container_type", "exportorimport",
            "tw_ft_container", "ft_ft_container", "ft_ft_high_cube", "cargo_ready_date",
            "incoterms", "terms", "created_on", "customer_id") 
            VALUES ('${origin}', '${destination}', '${contractName}', '${containerType}','${exportorimport}',
            '${twentyFeetContainer}', '${fourtyFeetContainer}', '${fourtyFeetHighCube}', 
            '${cargoReadyDate}', '${incoterms}', 
            '${terms}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}', '${customerId}')`
  try {
    return executeQuery(query).then((data) => {
      console.log('query:', query);
      res.status(OK).send({ message: 'Quotation successfully inserted.' })
    })
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err })
  }
}

const fetchQuotation = async (req, res) => {
  const query = 'SELECT * FROM quotation;'
  try {
    return executeQuery(query).then((data) => {
      res.status(OK).send({ data: data.rows })
    })
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err })
  }
}

const updateQuotation = async (req, res) => {
  const { qId, origin, destination, contractName, exportorimport, containerType, twentyFeetContainer, fourtyFeetContainer, fourtyFeetHighCube, cargoReadyDate, incoterms, terms, customerId } = req.body
  if (!qId) res.status(NOT_FOUND).send({ message: 'Id not found during update operation.' })
  const query = `UPDATE "quotation" 
            SET 
            "origin"='${origin}', 
            "destination"='${destination}', 
            "contract_name"='${contractName}', 
            "exportorimport"='${exportorimport}',
            "container_type"='${containerType}', 
            "tw_ft_container"='${twentyFeetContainer}', 
            "ft_ft_container"='${fourtyFeetContainer}', 
            "ft_ft_high_cube"='${fourtyFeetHighCube}',
            "customer_id"='${customerId}',
            "cargo_ready_date"='${cargoReadyDate}', 
            "incoterms"='${incoterms}', 
            "terms"='${terms}', 
            "updated_on"='${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}' 
            WHERE "q_id"='${qId}'`

  try {
    return executeQuery(query).then((data) => {
      if (data.rowCount === 0) {
        res.status(OK).send({ rowCount: data.rowCount, message: 'Not data updated.' })
      } else {
        res.status(OK).send({ rowCount: data.rowCount, message: 'Quotation successfully updated.' })
      }
    })
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err })
  }
}

const fetchQuotationById = async (req, res) => {
  const id = req.query.id
  if (!id) res.status(NOT_FOUND).send({ message: 'Id not found to fetch the data' })
  const query = `SELECT * FROM quotation where q_id=${id}`
  try {
    return executeQuery(query).then((data) => {
      res.status(OK).send({ data: data.rows, message: 'Quotation successfully fectched.' })
    })
  } catch (err) {
    console.log(err)
    res.status(INTERNAL_SERVER_ERROR).send({ message: err })
  }
}

module.exports = {
  getDataFromExcelSheet,
  createQuotation,
  fetchQuotationById,
  updateQuotation,
  fetchQuotation,
  onLoadQuotations
}
