module.exports.basePath = "/user/v1";

// User's Endpoint
module.exports.sendMail = "/sendMail";
module.exports.contactUs = "/contactus";
module.exports.sendLink = "/sendLink";

//Allocation Endpoint
module.exports.allowcationBasePath = "/allocation/v1";
module.exports.createForecast = "/forecast/create";
module.exports.createCarrier = "";

// Create Carrier allocation new 
module.exports.carrierAllocation = "/carrier/create";

// Update target values 
module.exports.updateTargetValues = "/carrier/update";

// Define Target Values
module.exports.carrierAllocationDefineTargetValue = "/carrier/create/define-target";

//get Week start and end
module.exports.getWeekStartEnd = "/week/start-end";

// Fetch all the carrier allocation
module.exports.fetchCarrierAllocation = "/carrier/fetch";

// On load carrier allocation page
module.exports.onLoadCarrierAllocation = "/carrier/onload";

module.exports.downloadExcelPath = "/carrier/download";



//Dashboard Endpoint
module.exports.dashboardBasePath = "/dashboard"
module.exports.QuotationBasePath = "/quotation/fetch"
module.exports.QuotationBasePathById = "/quotation/fetchById"
module.exports.QuotationCreateBasePath = "/quotation/create"
module.exports.QuotationUpdateBasePath = "/quotation/update"

// Customer module endpoint
module.exports.customerbaseUrl= "/customer/v1"
module.exports.fetchCustomerDetails = "/customer-details"
module.exports.createCustomerDetails = "/customer-create"