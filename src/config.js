// https://developers.google.com/datastudio/connector/reference#getconfig
function getConfig() {
    var cc = DataStudioApp.createCommunityConnector();
    var config = cc.getConfig();
  
    config
      .newInfo()
      .setId('formSourceTextInfo1')
      .setText(
        'Please fill the next info to configure this Connector'
      );
    
    config
      .newSelectSingle()
      .setId('sourceSelected')
      .setName('Select the Source of data')
      .setHelpText('Please select the source of the data to search')
      .setAllowOverride(true)
      .addOption(config.newOptionBuilder().setLabel('Mongo Atlas').setValue('MONGO_ATLAS'))
      .addOption(config.newOptionBuilder().setLabel('Site 24x7').setValue('SITE_247'))
      .addOption(config.newOptionBuilder().setLabel('AWS').setValue('AWS'));

  
    config.setDateRangeRequired(true);
    config.setIsSteppedConfig(false);
    return config.build(); 
}

// https://developers.google.com/datastudio/connector/reference#isadminuser
function isAdminUser() {
  return false;
}