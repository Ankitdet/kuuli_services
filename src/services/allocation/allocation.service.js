require('dotenv').config();
const executeQuery = require('../../db/connect');
const { OK, INTERNAL_SERVER_ERROR } = require('../../utils/apiStatus');
const moment = require('moment');

const carrierAllocationNew = async (req, res) => {

    const { containerType, containerName, service, supplier, origin, destination, sailing, type, totalAllocatedSpace, startDate, endDate } = req.body;

    let isValid = checkDateIsInYear(startDate, endDate);
    if (!isValid) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'startdate and enddate should not be more than 52 weeks' });
    }

    Date.prototype.getWeek = function () {
        var onejan = new Date(this.getFullYear(), 0, 1);
        var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
        var dayOfYear = ((today - onejan + 86400000) / 86400000);
        return Math.ceil(dayOfYear / 7)
    };

    let today = new Date(startDate);
    let currentWeekNumber = today.getWeek();

    let lastDay = new Date(endDate);
    let lastWeekNumber = lastDay.getWeek();

    let query01 = `INSERT INTO carrier_allocation_new("container_type", "container_name", "service", "supplier", "origin", 
    "destination", "sailing", "type", "total_allocated_space", "start_date", "end_date",`

    let values = `'${containerType}','${containerName}','${service}','${supplier}','${origin}','${destination}',
    '${sailing}', '${type}', '${totalAllocatedSpace}', '${moment(startDate, 'MM/DD/YYYY')}','${moment(endDate,'MM/DD/YYYY')}' 
    ,`;

    if (currentWeekNumber >= lastWeekNumber) {
        let i = 0;
        for (let i = currentWeekNumber + 1; i < 53; i++) {
            query01 += `"week_${i}",`;
            values += "0,";
        }
        for (let i = 1; i <= lastWeekNumber; i++) {
            query01 += `"week_${i}",`;
            values += "0,";
        }
    } else {
        for (let i = currentWeekNumber + 1; i <= lastWeekNumber; i++) {
            query01 += `"week_${i}",`;
            values += "0,";
        }
    }
    query01 += '"created_on")';
    query01 = query01 + `
    VALUES (${values} '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}' );`


    console.log('querL', query01);
    try {
        return executeQuery(query01).then((data) => {
            res.status(OK).send({ ca_id: data, message: 'carrier allocation successfully created.' });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

const fetchAllCarrierAllocation = async (req, res) => {
    const query = `select * from carrier_allocation_new`;
    let myData = [];
    let defaultValue = "-1";
    let jsonStr = '{';
    let weekDetails = `,"week_details":[`;
    let isTrue = true;
    try {
        return executeQuery(query).then((data) => {
            data.rows.forEach((carrierData) => {
                var key = Object.keys(carrierData).filter(function (key) { return carrierData[key] !== defaultValue });
                key.forEach((ownKey) => {
                    if (/^week/.test(ownKey)) {
                        weekDetails += `{"${ownKey}" : "${carrierData[ownKey]}"},`;
                        isTrue = false;
                    } else {
                        jsonStr += `"${ownKey}" : "${carrierData[ownKey]}",`
                    }
                });
                jsonStr = jsonStr.slice(0, -1);
                if (!isTrue) {
                    weekDetails = weekDetails.slice(0, -1);
                    weekDetails += ']';
                    jsonStr += weekDetails;
                    weekDetails = "";
                    weekDetails = `,"week_details":[`;
                }
                jsonStr += '}';
                myData.push(JSON.parse(jsonStr));
                jsonStr = {};
                jsonStr = '{';
            })
            res.status(OK).send({ data: myData, message: 'feched.' });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

const checkDateIsInYear = (startDate, endDate) => {

    var date1 = new Date(startDate);
    var date2 = new Date(endDate);
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    if (Difference_In_Days > 365) return false;
    return true;
}

const onLoadCarrierAllocation = async (req, res) => {

    const query = `select * from onload_ca;`;
    let carrierName = [];
    let service = [];
    let prefferedSupplier = [];
    let ports = [];
    let contactType = [];
    let containerType = [];

    try {
        return executeQuery(query).then((data) => {
            console.log(data);

            prefferedSupplier.push({
                label: 'Core',
                value: 'Core'
            },{
                label: 'Non core',
                value: 'Non Core'
            })


            
            data.rows.forEach((ca) => {
                carrierName.push({
                    label: ca.carrier_name,
                    value: ca.carrier_name
                });
                service.push({
                    label: ca.service,
                    value: ca.service
                });

                

                ports.push({
                    label: ca.ports,
                    value: ca.ports
                })
                contactType.push({
                    label: ca.contract_type,
                    value: ca.contract_type
                })

                containerType.push({
                    label: ca.container_type,
                    value: ca.container_type
                })
            })

            const json = {
                "type": [
                    {
                        "label": "Air",
                        "value": "air"
                    },
                    {
                        "label": "Sea",
                        "value": "sea"
                    }

                ],
                "preferredSupplier": prefferedSupplier,
                "carrierName": carrierName,
                "service": service,
                "portOfLoading": ports,
                "portOfDischarge": ports,
                "contractType": contactType,
                "containerType": containerType
            }
            res.status(OK).send({ data: json, message: 'feched.' });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }

}

const updateTargetValues = async (req, res) => {

    const { caId,
        week_1, week_2, week_3, week_4, week_5, week_6, week_7, week_8, week_9, week_10,
        week_11, week_12, week_13, week_14, week_15, week_16, week_17, week_18, week_19, week_20,
        week_21, week_22, week_23, week_24, week_25, week_26, week_27, week_28, week_29, week_30,
        week_31, week_32, week_33, week_34, week_35, week_36, week_37, week_38, week_39, week_40,
        week_41, week_42, week_43, week_44, week_45, week_46, week_47, week_48, week_49, week_50,
        week_51, week_52 } = req.body;

    let query = `UPDATE carrier_allocation_new 
            set 
            "week_1" = ${week_1}, 
            "week_2" = ${week_2}, 
            "week_3" = ${week_3}, 
            "week_4" = ${week_4},
            "week_5" = ${week_5}, 
            "week_6" = ${week_6}, 
            "week_7" = ${week_7}, 
            "week_8" = ${week_8},
            "week_9" = ${week_9}, 
            "week_10" = ${week_10}, 
            "week_11" = ${week_11},
            "week_12" = ${week_12}, 
            "week_13" = ${week_13}, 
            "week_14" = ${week_14},
            "week_15" = ${week_15}, 
            "week_16" = ${week_16}, 
            "week_17" = ${week_17}, 
            "week_18" = ${week_18},
            "week_19" = ${week_19}, 
            "week_20" = ${week_20},
            "week_21" = ${week_21}, 
            "week_22" = ${week_22}, 
            "week_23" = ${week_23}, 
            "week_24" = ${week_24},
            "week_25" = ${week_25}, 
            "week_26" = ${week_26}, 
            "week_27" = ${week_27}, 
            "week_28" = ${week_28},
            "week_29" = ${week_29}, 
            "week_30" = ${week_30}, 
            "week_31" = ${week_31}, 
            "week_32" = ${week_32}, 
            "week_33" = ${week_33}, 
            "week_34" = ${week_34},
            "week_35" = ${week_35}, 
            "week_36" = ${week_36}, 
            "week_37" = ${week_37}, 
            "week_38" = ${week_38},
            "week_39" = ${week_39}, 
            "week_40" = ${week_40}, 
            "week_41" = ${week_41}, 
            "week_42" = ${week_42}, 
            "week_43" = ${week_43}, 
            "week_44" = ${week_44},
            "week_45" = ${week_45}, 
            "week_46" = ${week_46}, 
            "week_47" = ${week_47}, 
            "week_48" = ${week_48},
            "week_49" = ${week_49}, 
            "week_50" = ${week_50}, 
            "week_51" = ${week_51}, 
            "week_52" = ${week_52}, 
            "updated_on" = '${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}'
            where ca_id=${caId}`;
    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ message: `target values updated successfully for caId ${caId}` });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

module.exports = {
    carrierAllocationNew,
    fetchAllCarrierAllocation,
    onLoadCarrierAllocation,
    updateTargetValues
};