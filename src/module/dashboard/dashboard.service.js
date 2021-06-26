
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

const quotationCompanyDetails = async (req, res) => {
  const ANL = {
    "companyName": "ANL",
    "companyLogo": "Logo.png",
    "quotationNumber": "A19943",
    "validFrom": "1st April 2021",
    "validTo": "30th April 2021",
    "contractNumber": "ANL234",
    "portOfLoading": "Shangai",
    "portOfDischarge": "Melbourne",
    "getAQuote": [
      {
        "headerLabel": "",
        "label": "oceanFreight",
        "value": [
          {
            "port20": "$1150",
          },
          {
            "port40": "$1150",
          },
          {
            "portHC": "$1150",
          }
        ],
      },
      {
        "headerLabel": "",
        "label": "bunkerAdjustmentFactor",
        "value": [
          {
            "port20": "$1150",
          },
          {
            "port40": "$1150",
          },
          {
            "portHC": "$1150",
          }
        ],
      },
      {
        "headerLabel": "originCharges",
        "label": "originTerminalHandlingCharges",
        "value": [
          {
            "port20": "$1150",
          },
          {
            "port40": "$1150",
          },
          {
            "portHC": "$1150",
          }
        ],
      },
      {
        "headerLabel": "originCharges",
        "label": "originISPS",
        "value": [
          {
            "port20": "$1150",
          },
          {
            "port40": "$1150",
          },
          {
            "portHC": "$1150",
          }
        ],
      },
      {
        "headerLabel": "originCharges",
        "label": "sealFee",
        "value": [
          {
            "port20": "$1150",
          },
          {
            "port40": "$1150",
          },
          {
            "portHC": "$1150",
          }
        ],
      },
      {
        "headerLabel": "destinationCharges",
        "label": "destinationTerminalHandlingCharges",
        "value": [
          {
            "port20": "$1150",
          },
          {
            "port40": "$1150",
          },
          {
            "portHC": "$1150",
          }
        ],
      },
      {
        "headerLabel": "destinationCharges",
        "label": "destinationISPS",
        "value": [
          {
            "port20": "$1150",
          },
          {
            "port40": "$1150",
          },
          {
            "portHC": "$1150",
          }
        ],
      },
      {
        "headerLabel": "",
        "label": "total",
        "value": [
          {
            "port20": "$1150",
          },
          {
            "port40": "$1150",
          },
          {
            "portHC": "$1150",
          }
        ],
      },
    ],
    "buyOrSell": {
      "freightCharges": [
        {
          "label": "baseRate",
          "value": "1149"
        },
        {
          "label": "sulphurSurcharge",
          "value": "1149"
        }
      ],
      "destinationCharges": [
        {
          "label": "destinationTerminalHandlingCharge",
          "value": "1149"
        },
      ],
      "originCharges": [
        {
          "label": "exportServiceCharge",
          "value": "1149"
        },
        {
          "label": "destinationTerminalHandlingCharge",
          "value": "1149"
        },
      ],
    }
  }
  const query = `select * from quotation_company_details`;
  try {
    return executeQuery(query).then((data) => {
      const allData = []
      data.rows.forEach((row) => {
        allData.push({
          "id": row.id,
          "companyName": row.company_name,
          "companyLogo": row.company_logo,
          "quotationNumber": row.quotation_number,
          "validFrom": row.valid_from,
          "validTo": row.valid_to,
          "contractNumber": row.contract_number,
          "portOfLoading": row.port_of_loading,
          "portOfDischarge": row.port_of_discharge,
          "getAQuote": [
            {
              "headerLabel": "",
              "label": "oceanFreight",
              "value": [
                {
                  "port20": row.quote_20_oceanfreight,
                },
                {
                  "port40": row.quote_40_oceanfreight,
                },
                {
                  "portHC": row.quote_hc_oceanfreight,
                }
              ],
            },
            {
              "headerLabel": "",
              "label": "bunkerAdjustmentFactor",
              "value": [
                {
                  "port20": row.quote_20_bunkeradjustmentfactor,
                },
                {
                  "port40": row.quote_40_bunkeradjustmentfactor,
                },
                {
                  "portHC": row.quote_hc_bunkeradjustmentfactor,
                }
              ],
            },
            {
              "headerLabel": "originCharges",
              "label": "originTerminalHandlingCharges",
              "value": [
                {
                  "port20": row.quote_oc_20_originterminalhandlingcharges,
                },
                {
                  "port40": row.quote_oc_40_originterminalhandlingcharges,
                },
                {
                  "portHC": row.quote_oc_hc_originterminalhandlingcharges,
                }
              ],
            },
            {
              "headerLabel": "originCharges",
              "label": "originISPS",
              "value": [
                {
                  "port20": row.quote_oc_20_originisps,
                },
                {
                  "port40": row.quote_oc_40_originisps,
                },
                {
                  "portHC": row.quote_oc_hc_originisps,
                }
              ],
            },
            {
              "headerLabel": "originCharges",
              "label": "sealFee",
              "value": [
                {
                  "port20": row.quote_oc_20_sealfee,
                },
                {
                  "port40": row.quote_oc_40_sealfee,
                },
                {
                  "portHC": row.quote_oc_hc_sealfee,
                }
              ],
            },
            {
              "headerLabel": "destinationCharges",
              "label": "destinationTerminalHandlingCharges",
              "value": [
                {
                  "port20": row.quote_dc_20_destinationterminalhandlingcharges,
                },
                {
                  "port40": row.quote_dc_40_destinationterminalhandlingcharges,
                },
                {
                  "portHC": row.quote_dc_hc_destinationterminalhandlingcharges,
                }
              ],
            },
            {
              "headerLabel": "destinationCharges",
              "label": "destinationISPS",
              "value": [
                {
                  "port20": row.quote_dc_20_destinationisps,
                },
                {
                  "port40": row.quote_dc_40_destinationisps,
                },
                {
                  "portHC": row.quote_dc_hc_destinationisps,
                }
              ],
            },
            {
              "headerLabel": "",
              "label": "total",
              "value": [
                {
                  "port20": row.quote_20_total,
                },
                {
                  "port40": row.quote_40_total,
                },
                {
                  "portHC": row.quote_hc_total,
                }
              ],
            },
          ],
          "buyOrSell": {
            "freightCharges": [
              {
                "label": "baseRate",
                "value": row.buyorsell_fc_baserate
              },
              {
                "label": "sulphurSurcharge",
                "value": row.buyorsell_fc_sulphursurcharge
              }
            ],
            "destinationCharges": [
              {
                "label": "destinationTerminalHandlingCharge",
                "value": row.buyorsell_dc_destinationterminalhandlingcharges
              },
            ],
            "originCharges": [
              {
                "label": "exportServiceCharge",
                "value": row.buyorsell_oc_exportservicecharge
              },
              {
                "label": "destinationTerminalHandlingCharge",
                "value": row.buyorsell_oc_destinationterminalhandlingcharges
              },
            ],
          }
        });
      })
      res.send(allData)
    });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err });
  }
}

const insertQuotationCompanyDetails = async (req, res) => {
  const {
    company_name,
    company_logo,
    quotation_number,
    valid_from,
    valid_to,
    contract_number,
    port_of_loading,
    port_of_discharge,
    quote_20_oceanfreight,
    quote_40_oceanfreight,
    quote_hc_oceanfreight,
    quote_20_bunkeradjustmentfactor,
    quote_40_bunkeradjustmentfactor,
    quote_hc_bunkeradjustmentfactor,
    quote_oc_20_originterminalhandlingcharges,
    quote_oc_40_originterminalhandlingcharges,
    quote_oc_hc_originterminalhandlingcharges,
    quote_oc_20_originisps,
    quote_oc_40_originisps,
    quote_oc_hc_originisps,
    quote_oc_20_sealfee,
    quote_oc_40_sealfee,
    quote_oc_hc_sealfee,
    quote_dc_20_destinationterminalhandlingcharges,
    quote_dc_40_destinationterminalhandlingcharges,
    quote_dc_hc_destinationterminalhandlingcharges,
    quote_dc_20_destinationisps,
    quote_dc_40_destinationisps,
    quote_dc_hc_destinationisps,
    quote_20_total,
    quote_40_total,
    quote_hc_total,
    buyorsell_fc_baserate,
    buyorsell_fc_sulphursurcharge,
    buyorsell_dc_destinationterminalhandlingcharges,
    buyorsell_oc_exportservicecharge,
    buyorsell_oc_destinationterminalhandlingcharges
  } = req.body

  const query = `
        INSERT INTO quotation_company_details VALUES (
            DEFAULT,         
            '${company_name}',
            '${company_logo}',
            '${quotation_number}',
            '${valid_from}',
            '${valid_to}',
            '${contract_number}',
            '${port_of_loading}',
            '${port_of_discharge}',
            '${quote_20_oceanfreight}',
            '${quote_40_oceanfreight}',
            '${quote_hc_oceanfreight}',
            '${quote_20_bunkeradjustmentfactor}',
            '${quote_40_bunkeradjustmentfactor}',
            '${quote_hc_bunkeradjustmentfactor}',
            '${quote_oc_20_originterminalhandlingcharges}',
            '${quote_oc_40_originterminalhandlingcharges}',
            '${quote_oc_hc_originterminalhandlingcharges}',
            '${quote_oc_20_originisps}',
            '${quote_oc_40_originisps}',
            '${quote_oc_hc_originisps}',
            '${quote_oc_20_sealfee}',
            '${quote_oc_40_sealfee}',
            '${quote_oc_hc_sealfee}',
            '${quote_dc_20_destinationterminalhandlingcharges}',
            '${quote_dc_40_destinationterminalhandlingcharges}',
            '${quote_dc_hc_destinationterminalhandlingcharges}',
            '${quote_dc_20_destinationisps}',
            '${quote_dc_40_destinationisps}',
            '${quote_dc_hc_destinationisps}',
            '${quote_20_total}',
            '${quote_40_total}',
            '${quote_hc_total}',
            '${buyorsell_fc_baserate}',
            '${buyorsell_fc_sulphursurcharge}',
            '${buyorsell_dc_destinationterminalhandlingcharges}',
            '${buyorsell_oc_exportservicecharge}',
            '${buyorsell_oc_destinationterminalhandlingcharges}'
            )
    `;
  try {
    return executeQuery(query).then((data) => {
      res.status(OK).send("Data inserted");
    });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err });
  }
}

const updateQuotationCompanyDetails = async (req, res) => {
  const id = req.params.id;
  let {
    company_name,
    company_logo,
    quotation_number,
    valid_from,
    valid_to,
    contract_number,
    port_of_loading,
    port_of_discharge,
    quote_20_oceanfreight,
    quote_40_oceanfreight,
    quote_hc_oceanfreight,
    quote_20_bunkeradjustmentfactor,
    quote_40_bunkeradjustmentfactor,
    quote_hc_bunkeradjustmentfactor,
    quote_oc_20_originterminalhandlingcharges,
    quote_oc_40_originterminalhandlingcharges,
    quote_oc_hc_originterminalhandlingcharges,
    quote_oc_20_originisps,
    quote_oc_40_originisps,
    quote_oc_hc_originisps,
    quote_oc_20_sealfee,
    quote_oc_40_sealfee,
    quote_oc_hc_sealfee,
    quote_dc_20_destinationterminalhandlingcharges,
    quote_dc_40_destinationterminalhandlingcharges,
    quote_dc_hc_destinationterminalhandlingcharges,
    quote_dc_20_destinationisps,
    quote_dc_40_destinationisps,
    quote_dc_hc_destinationisps,
    quote_20_total,
    quote_40_total,
    quote_hc_total,
    buyorsell_fc_baserate,
    buyorsell_fc_sulphursurcharge,
    buyorsell_dc_destinationterminalhandlingcharges,
    buyorsell_oc_exportservicecharge,
    buyorsell_oc_destinationterminalhandlingcharges,
    add_charges,
    add_margin
  } = req.body

  add_charges = JSON.stringify(add_charges)
  add_margin = JSON.stringify(add_margin)
  const query = `
        UPDATE quotation_company_details SET             
            company_name='${company_name}',
            company_logo='${company_logo}',
            quotation_number='${quotation_number}',
            valid_from='${valid_from}',
            valid_to='${valid_to}',
            contract_number='${contract_number}',
            port_of_loading='${port_of_loading}',
            port_of_discharge='${port_of_discharge}',
            quote_20_oceanfreight='${quote_20_oceanfreight}',
            quote_40_oceanfreight='${quote_40_oceanfreight}',
            quote_hc_oceanfreight='${quote_hc_oceanfreight}',
            quote_20_bunkeradjustmentfactor='${quote_20_bunkeradjustmentfactor}',
            quote_40_bunkeradjustmentfactor='${quote_40_bunkeradjustmentfactor}',
            quote_hc_bunkeradjustmentfactor='${quote_hc_bunkeradjustmentfactor}',
            quote_oc_20_originterminalhandlingcharges='${quote_oc_20_originterminalhandlingcharges}',
            quote_oc_40_originterminalhandlingcharges='${quote_oc_40_originterminalhandlingcharges}',
            quote_oc_hc_originterminalhandlingcharges='${quote_oc_hc_originterminalhandlingcharges}',
            quote_oc_20_originisps='${quote_oc_20_originisps}',
            quote_oc_40_originisps='${quote_oc_40_originisps}',
            quote_oc_hc_originisps='${quote_oc_hc_originisps}',
            quote_oc_20_sealfee='${quote_oc_20_sealfee}',
            quote_oc_40_sealfee='${quote_oc_40_sealfee}',
            quote_oc_hc_sealfee='${quote_oc_hc_sealfee}',
            quote_dc_20_destinationterminalhandlingcharges='${quote_dc_20_destinationterminalhandlingcharges}',
            quote_dc_40_destinationterminalhandlingcharges='${quote_dc_40_destinationterminalhandlingcharges}',
            quote_dc_hc_destinationterminalhandlingcharges='${quote_dc_hc_destinationterminalhandlingcharges}',
            quote_dc_20_destinationisps='${quote_dc_20_destinationisps}',
            quote_dc_40_destinationisps='${quote_dc_40_destinationisps}',
            quote_dc_hc_destinationisps='${quote_dc_hc_destinationisps}',
            quote_20_total='${quote_20_total}',
            quote_40_total='${quote_40_total}',
            quote_hc_total='${quote_hc_total}',
            buyorsell_fc_baserate='${buyorsell_fc_baserate}',
            buyorsell_fc_sulphursurcharge='${buyorsell_fc_sulphursurcharge}',
            buyorsell_dc_destinationterminalhandlingcharges='${buyorsell_dc_destinationterminalhandlingcharges}',
            buyorsell_oc_exportservicecharge='${buyorsell_oc_exportservicecharge}',
            buyorsell_oc_destinationterminalhandlingcharges='${buyorsell_oc_destinationterminalhandlingcharges}',
            add_margin='${add_margin}',
            add_charges='${add_charges}'
            WHERE id=${id}
    `;
  try {
    return executeQuery(query).then((data) => {
      res.status(OK).send("Data updated");
    });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err });
  }
}

module.exports = {
  getDataFromExcelSheet,
  createQuotation,
  fetchQuotationById,
  updateQuotation,
  fetchQuotation,
  onLoadQuotations,
  quotationCompanyDetails,
  insertQuotationCompanyDetails,
  updateQuotationCompanyDetails
}
