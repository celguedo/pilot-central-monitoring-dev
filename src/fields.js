const getSchema = (request) => {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;

  var product = fields
    .newDimension()
    .setId("Product")
    .setName("Product")
    .setDescription("The product of the service alerted")
    .setType(types.TEXT)
    .setGroup("ProductGroup");

  var source = fields
    .newDimension()
    .setId("Source")
    .setName("Source")
    .setDescription("The Source of the service alerted")
    .setType(types.TEXT)
    .setGroup("SourceGroup");

  var service = fields
    .newDimension()
    .setId("Service")
    .setName("Service")
    .setDescription("The Service of the service alerted")
    .setType(types.TEXT)
    .setGroup("ServiceGroup");

  var alert = fields
    .newDimension()
    .setId("Alert")
    .setName("Alert")
    .setDescription("The Alert of the service alerted")
    .setType(types.TEXT)
    .setGroup("AlertGroup");

  var value_alert_numeric = fields
    .newMetric()
    .setId("value_alert_numeric")
    .setName("Value")
    .setDescription("The current value of the alert")
    .setType(types.NUMBER);
  //.setIsHidden(true);

  var value_alert_percent = fields
    .newMetric()
    .setId("value_alert_percent")
    .setName("Value %")
    .setDescription("The current value of the alert %")
    .setType(types.PERCENT);

  var status = fields
    .newMetric()
    .setId("status")
    .setName("Status")
    .setDescription("The Status of the alert")
    .setType(types.TEXT);

  var alert_date = fields
    .newDimension()
    .setId("alert_date")
    .setName("Alert Date")
    .setDescription("The date of the alert")
    .setType(types.YEAR_MONTH_DAY_SECOND)
    .setGroup("AlertDateGroup");

  fields.setDefaultMetric(value_alert_numeric.getId());
  fields.setDefaultDimension(service.getId());

  return { schema: fields.build(), fields };
};
