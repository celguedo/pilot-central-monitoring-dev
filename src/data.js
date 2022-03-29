//import { getSchema } from './fields';

// https://developers.google.com/datastudio/connector/reference#getdata
const getData = (request) => {
  try {
    const Fields = getSchema().fields;
    const source = request.configParams.sourceSelected;

    var requestedFields = Fields.forIds(
      request.fields.map(function (field) {
        return field.name;
      })
    );

    var url = [
      "http://be25-173-44-55-77.ngrok.io/getter/",
      source,
      "?dataRange=",
      request.dateRange.startDate,
      ":",
      request.dateRange.endDate,
      "",
    ].join("");

    const response = JSON.parse(UrlFetchApp.fetch(url));

    const normalizedResponse = normalizeResponse(request, response);

    const data = getFormattedData(normalizedResponse, requestedFields, source);

    return {
      schema: requestedFields.build(),
      rows: data,
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

function getFormattedData(response, requestedFields) {
  var data = [];
  try {
    Object.keys(response).map(function (sourceFromApi) {
      var source = response[sourceFromApi];
      var formattedData = source.map((alert) => {
        return formatData(requestedFields, alert, source);
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

const formatData = (requestedFields, alert, source) => {
  var row = requestedFields.asArray().map(function (requestedField) {
    if(source === "MONGO_ATLAS"){
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
    }else{
      switch (requestedField.getId()) {
        case "Service":
          return alert.Service;
        case "value_alert_numeric":
          return 0;// alert.INCIDENT_REASON;
        case "Source":
          return alert.Source;
        case "Product":
          return "EVERCHECK";
        case "Alert":
          return alert.INCIDENT_REASON;
        case "status":
          return alert.Info.STATUS;
        case "alert_date":
          return alert.Info.INCIDENT_TIME_ISO;
        case "value_alert_percent":
          return 0;
        default:
          return "";
      }
    }
    
  });

  return { values: row };
};
