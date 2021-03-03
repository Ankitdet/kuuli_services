function Forecaster(obj) {

    this.validWeek;
    this.validYear;
    this.route;
    this.owner;
    this.originShipmentType;
    this.destinationShipmentType;
    this.placeOfReceipt;
    this.placeOfDelivery;
    this.motherVesselDischargePoint;
    this.motherVesselLoadPoint;
    this.carrierDetails;

    for (var prop in obj) {
        this[prop] = obj[prop];
    }

    this.getCarrierDetails = function () {
        return this.carrierDetails;
    }
}
module.exports = {
    Forecaster
}