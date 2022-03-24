//import { getSchema } from './fields';

// https://developers.google.com/datastudio/connector/reference#getdata
const getData = (request) => {
  try {
    var requestedFields = getSchema().fields.forIds(
      request.fields.map(function (field) {
        return field.name;
      })
    );

    var url = [
      "http://e3d5-181-204-6-82.ngrok.io/getter/",
      request.configParams.sourceSelected,
      "?dataRange=",
      request.dateRange.startDate,
      ":",
      request.dateRange.endDate,
      "",
    ].join("");

    const response = JSON.parse(UrlFetchApp.fetch(url));
    //console.log("Response from API Great", response);

    const normalizedResponse = normalizeResponse(request, response);

    const data = getFormattedData(normalizedResponse, requestedFields);
    console.log("🚀 ~ file: data.js ~ line 28 ~ getData ~ data", data);

    return {
      schema: {}, //requestedFields.build(),
      rows: response,
    };
  } catch (e) {
    console.log("Hay error:", e);
    cc.newUserError()
      .setDebugText("Error fetching data from API. Exception details: " + e)
      .setText(
        "The connector has encountered an unrecoverable error. Please try again later, or file an issue if this error persists."
      )
      .throwException();
  }
};

/* const getFormattedData = (normalizedResponse, requestedFields) => {

} */

const normalizeResponse = (request, response) => {
  var mapped_response = {};
  try {
    var source_list = request.configParams.sourceSelected.split(",");

    if (source_list.length == 1) {
      mapped_response[source_list[0]] = response;
    } else {
      mapped_response = response;
    }
  } catch (error) {
    console.log("Hsy error:", error);
  }
  return mapped_response;
};

/* { 
  message: 'Llego a buscar datos',
  data: 
   { Item: 
      { Service: 'scraping',
        Id: '2',
        Info: [Object],
        Source: 'MONGO_ATLAS' } } 
} */

function getFormattedData(response, requestedFields) {
  var data = [];
  try {
    Object.keys(response).map(function (sourceFromApi) {
      var source = response[sourceFromApi];
      var formattedData = source.map((alert) => {
        return formatData(requestedFields, alert);
      });
      data = data.concat(formattedData);
    });
  } catch (error) {
    console.log("Errorn on getFormattedData:", error);
  }

  return data;
}
// [END get_data]

// https://developers.google.com/datastudio/connector/reference#isadminuser
function isAdminUser() {
  return false;
}

const formatData = (requestedFields, alert) => {
  var row = requestedFields.asArray().map(function (requestedField) {
    switch (requestedField.getId()) {
      case "Service":
        return alert.Service;
      case "value_alert_numeric":
        return alert.Info.currentValue.number;
      case "Source":
        return alert.Source;
      case "Product":
        return "EVERCHECK";
      case "Alert":
        return alert.Info.metricName;
      case "status":
        return alert.Info.status;
      case "alert_date":
        return alert.Info.created;
      case "value_alert_percent":
        return alert.Info.currentValue.number;
      default:
        return "";
    }
  });

  return { values: row };
};
