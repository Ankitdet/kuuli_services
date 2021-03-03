function Carrier(obj) {

    this.name;
    this.customerName;
    this.carrierService;
    this.equipmentSize;
    this.equipmentType;
    this.tarrifRef;
    this.commodity;
    this.remarks;
    this.heavyWeight;
    this.forwardConsol;

    for (var prop in obj) {
        this[prop] = obj[prop];
    }
}

module.exports.Carrier = Carrier
