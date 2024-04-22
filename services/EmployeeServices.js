const axios = require('axios')
const headers = {
    'Content-Type': 'application/json',
    'x-api-key': '9a2ea13f8509870f756a759e6c58a281e010c037ae757640781c4759be160dba',
    'Accept': '*/*'
};

var EmployeeServices = {
    getEmployees: async () => {

        try {
            
            const factorialAPI = await axios.get("https://api.factorialhr.com/api/v2/core/employees", {headers});
            return factorialAPI.data;
        } catch (error) {
            console.log(error)
        }
    }
};

module.exports = EmployeeServices;