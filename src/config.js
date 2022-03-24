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
/* 
function getConfig(request) {
  var cc = DataStudioApp.createCommunityConnector();
  var config = cc.getConfig();

  config
      .newTextInput()
      .setId('exampleTextInput')
      .setName('Single line text')
      .setHelpText('Helper text for single line text')
      .setPlaceholder('Lorem Ipsum');

  config
      .newTextArea()
      .setId('exampleTextArea')
      .setName('Text area')
      .setHelpText('Helper text for text area')
      .setPlaceholder('Lorem Ipsum');

  config
      .newSelectSingle()
      .setId('exampleSelectSingle')
      .setName('Select single')
      .setHelpText('Helper text for select single')
      .setAllowOverride(true)
      .addOption(config.newOptionBuilder().setLabel('Lorum foo').setValue('lorem'))
      .addOption(config.newOptionBuilder().setLabel('Ipsum Bar').setValue('ipsum'))
      .addOption(config.newOptionBuilder().setLabel('Sit').setValue('amet'));

  config
      .newSelectMultiple()
      .setId('exampleSelectMultiple')
      .setName('Select multiple')
      .setHelpText('Helper text for select multiple')
      .addOption(config.newOptionBuilder().setLabel('Lorum foo').setValue('lorem'))
      .addOption(config.newOptionBuilder().setLabel('Ipsum Bar').setValue('ipsum'))
      .addOption(config.newOptionBuilder().setLabel('Sit').setValue('amet'));

  config
      .newCheckbox()
      .setId('exampleCheckbox')
      .setName('This is a checkbox')
      .setHelpText('Helper text for checkbox');

  config
      .newInfo()
      .setId('exampleInfo')
      .setText('Examle instructions text used in Info')

  config.setDateRangeRequired(true);
  config.setIsSteppedConfig(false);

  return config.build();
} */


// https://developers.google.com/datastudio/connector/reference#isadminuser
function isAdminUser() {
  return false;
}