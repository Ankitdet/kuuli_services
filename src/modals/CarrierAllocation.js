function CarrierAllocation(obj) {

    this.allocationType;
    this.allocationLevel;
    this.route;
    this.owner;
    this.fromYear;
    this.fromWeek;
    this.toYear;
    this.toWeek;
    this.genericaNAC;
    this.commitment;
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

    this.getCarrierAllocationDetails = function () {
        return this.carrierDetails;
    }
}
module.exports = {
    CarrierAllocation
}