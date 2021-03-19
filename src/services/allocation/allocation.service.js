require('dotenv').config();
const executeQuery = require('../../db/connect');
const { OK, INTERNAL_SERVER_ERROR } = require('../../utils/apiStatus');
const moment = require('moment');
const { Forecaster } = require('../../modals/Forecaster');
const { CarrierAllocation } = require('../../modals/CarrierAllocation');

const createForecast = async (req, res) => {

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

const updateCustomerForecast = async (req, res) => {

}

const deleteCustomerForecast = async (req, res) => {
}

const carrierAllocation = async (req, res) => {
    // Convert json string to js object
    let forecast = new CarrierAllocation(JSON.parse(JSON.stringify(req.body)));

    let query = `INSERT INTO carrier_allocation("allocation_type", "allocation_level", "route", "owner", "from_year", "from_week", "to_year", "to_week", "generic_nac", "commitment", "status", "origin_shipment_type", "dest_shipment_type", "place_of_receipt", "place_of_delivery", "mother_vessel_discharge_point", "mother_vessel_load_point", 
    "carrier_name", "customers", "carrier_service", "tarrif_ref", "equipment_type", "equipment_size", "space_status", "allocation_per_week", "total_allocation", "commodity", "remarks", "heavy_weight", "paying_cargo", "overbooking_allowance", "created_on") 
    VALUES ('${forecast.allocationType}', '${forecast.allocationLevel}', '${forecast.route}', '${forecast.owner}', '${forecast.fromYear}', '${forecast.fromWeek}', '${forecast.toYear}', '${forecast.toWeek}', '${forecast.genericaNAC}', '${forecast.status}', '${forecast.commitment}', '${forecast.originShipmentType}',
    '${forecast.destinationShipmentType}', '${forecast.placeOfReceipt}', '${forecast.placeOfDelivery}', '${forecast.motherVesselDischargePoint}', 
    '${forecast.motherVesselLoadPoint}', '${forecast.getCarrierAllocationDetails().name}', '${forecast.getCarrierAllocationDetails().customers}', '${forecast.getCarrierAllocationDetails().carrierService}', 
    '${forecast.getCarrierAllocationDetails().tarrifRef}', '${forecast.getCarrierAllocationDetails().equipmentType}', '${forecast.getCarrierAllocationDetails().equipmentSize}', '${forecast.getCarrierAllocationDetails().spaceStatus}', 
    '${forecast.getCarrierAllocationDetails().allocationPerWeek}', '${forecast.getCarrierAllocationDetails().totalAllocation}', '${forecast.getCarrierAllocationDetails().commodity}', '${forecast.getCarrierAllocationDetails().remarks}', '${forecast.getCarrierAllocationDetails().heavyWeight}', '${forecast.getCarrierAllocationDetails().payingCargo}', '${forecast.getCarrierAllocationDetails().overbookingAllowance}', '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}')`;
    
    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ message: 'carrier allocation successfully created.' });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}


module.exports = {
    createForecast: createForecast,
    carrierAllocation
};