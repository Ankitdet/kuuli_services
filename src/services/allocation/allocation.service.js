require('dotenv').config();
const executeQuery = require('../../db/connect');
const { default: Forecaster } = require('../../modals/forecaster');
const { OK, INTERNAL_SERVER_ERROR } = require('../../utils/apiStatus');
const moment = require('moment');

export const createForecast = async(req, res) => {

    // Convert json string to js object
    let forecast = new Forecaster(JSON.parse(JSON.stringify(req.body)));

    let query = `INSERT INTO customer_forecast 
        ("valid_week", "valid_year", "route", "owner", "origin_shipment_type", 
        "dest_shipment_type", "place_of_receipt", "place_of_delivery", "mother_vessel_discharge_point", 
        "mother_vessel_load_point", "carrier_name", "customer_name", "carrier_service", "equipment_size", 
        "equipment_type", "tarrif_ref", "commodity", "remarks", "heavy_weight", "forward_console", "created_on")
         VALUES ('${forecast.validWeek}', '${forecast.validYear}', '${forecast.route}', '${forecast.owner}', '${forecast.originShipmentType}', 
        '${forecast.destinationShipmentType}', '${forecast.placeOfReceipt}', '${forecast.placeOfDelivery}', '${forecast.motherVesselDischargePoint}', 
        '${forecast.motherVesselLoadPoint}', '${forecast.getCarrierDetails().name}', '${forecast.getCarrierDetails().customerName}', 
        '${forecast.getCarrierDetails().carrierService}', '${forecast.getCarrierDetails().equipmentSize}', 
        '${forecast.getCarrierDetails().equipmentType}', '${forecast.getCarrierDetails().tarrifRef}', '${forecast.getCarrierDetails().commodity}', '${forecast.getCarrierDetails().remarks}', 
        '${forecast.getCarrierDetails().heavyWeight}', '${forecast.getCarrierDetails().forwardConsol}' , '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}');`;

    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ message: 'create forecaste data successfully inserted.' });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

export const updateCustomerForecast = async(req, res) => { 

}

export const deleteCustomerForecast = async(req,res) => {
}