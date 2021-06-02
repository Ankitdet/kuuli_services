require('dotenv').config();
const executeQuery = require('../../db/connect');
const { OK, INTERNAL_SERVER_ERROR } = require('../../utils/apiStatus');

const fetchCustomerDetails = async (req, res) => {

    let query = `select * from customer_details`;

    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ data: data.rows, totalUsers: data.rows.length, message: 'customer data fetched.' });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

const updateCustomerDetails = async (req, res) => {

    const {
        id,
        customer_id,
        firstname,
        lastname,
        title,
        department,
        company_name,
        revenue,
        phone_number,
        mobile_number,
        fax_number,
        primary_emailid,
        secondary_emailid,
        website,
        industry,
        address_1,
        address_2,
        pincode,
        city,
        country,
        lead_owner_id,
        lead_owner_first_name,
        lead_owner_last_name,
        lead_owner_email,
        lead_owner_mobile,
        lead_location,
        lead_source,
        deal_amount,
        stage,
        activity,
        probability,
        closing_date,
        business_type
    } = req.body

    let query = `UPDATE customer_details 
            set 
            "id" = ${id},
            "customer_id" = '${customer_id}',
            "firstname" = '${firstname}',
            "lastname" = '${lastname}',
            "title" = '${title}',
            "department" = '${department}',
            "company_name" = '${company_name}',
            "revenue" = '${revenue}',
            "phone_number" = '${phone_number}',
            "mobile_number" = '${mobile_number}',
            "fax_number" = '${fax_number}',
            "primary_emailid" = '${primary_emailid}',
            "secondary_emailid" = '${secondary_emailid}',
            "website" = '${website}',
            "industry" = '${industry}',
            "address_1" ='${address_1}',
            "address_2" = '${address_2}',
            "pincode" = '${pincode}',
            "city" = '${city}',
            "country" = '${country}',
            "lead_owner_id" = '${lead_owner_id}',
            "lead_owner_first_name" = '${lead_owner_first_name}',
            "lead_owner_last_name" = '${lead_owner_last_name}',
            "lead_owner_email" = '${lead_owner_email}',
            "lead_owner_mobile" = '${lead_owner_mobile}',
            "lead_location" = '${lead_location}',
            "lead_source" = '${lead_source}',
            "deal_amount" = '${deal_amount}',
            "stage" = '${stage}',
            "activity" = '${activity}',
            "probability" = '${probability}',
            "closing_date" = '${closing_date}',
            "business_type"	= '${business_type}'
            where id=${id}`;

    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ message: 'customer data updated having id:', id });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

const deleteCustomerDetails = async (req, res) => {

    const { ids } = req.body;
    let query = `delete from customer_details where id IN (${ids})`;
    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ message: `delete customer having id:${ids}` });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

const createCustomerDetails = async (req, res) => {
    const {
        customer_id,
        firstname,
        lastname,
        title,
        department,
        company_name,
        revenue,
        phone_number,
        mobile_number,
        fax_number,
        primary_emailid,
        secondary_emailid,
        website,
        industry,
        address_1,
        address_2,
        pincode,
        city,
        country,
        lead_owner_id,
        lead_owner_first_name,
        lead_owner_last_name,
        lead_owner_email,
        lead_owner_mobile,
        lead_location,
        lead_source,
        deal_amount,
        stage,
        activity,
        probability,
        closing_date,
        business_type
    } = req.body


    let query = `INSERT INTO "customer_details" ("customer_id", "firstname", "lastname", "title", "department", "company_name", 
    "revenue", "phone_number", "mobile_number", "fax_number", "primary_emailid", "secondary_emailid", "website", "industry", "address_1", 
    "address_2", "pincode", "city", "country", "lead_owner_id", "lead_owner_first_name", "lead_owner_last_name", "lead_owner_email", 
    "lead_owner_mobile", "lead_location", "lead_source", "deal_amount", "stage", "activity", "probability", "closing_date", "business_type") 
    VALUES ('${customer_id}', '${firstname}', '${lastname}', '${title}', '${department}', '${company_name}', 
    '${revenue}', '${phone_number}', '${mobile_number}', '${fax_number}', '${primary_emailid}', '${secondary_emailid}', '${website}', '${industry}', '${address_1}',
    '${address_2}', '${pincode}', '${city}', '${country}', '${lead_owner_id}', '${lead_owner_first_name}', '${lead_owner_last_name}', '${lead_owner_email}',
    '${lead_owner_mobile}', '${lead_location}', '${lead_source}', '${deal_amount}', '${stage}', '${activity}', '${probability}', '${closing_date}', '${business_type}'`;
    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ message: `customer data successfully added.` });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

const searchCustomerById = async (req, res) => {
    const { id } = req.body;

    let query = `select * from customer_details where id=${id}`;
    try {
        return executeQuery(query).then((data) => {
            res.status(OK).send({ data: data.rows, totalUsers: data.rows.length, message: 'customer data fetched.' });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: err });
    }
}

module.exports = {
    fetchCustomerDetails: fetchCustomerDetails,
    updateCustomerDetails: updateCustomerDetails,
    deleteCustomerDetails,
    createCustomerDetails,
    searchCustomerById
};