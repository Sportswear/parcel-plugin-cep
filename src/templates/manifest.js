module.exports = function({
  bundleName = 'My Extension',
  bundleId = 'com.test.test.extension',
  version = '1.0.0',
  hosts,
  bundleVersion = '1.0.0',
  cepVersion = '6.0',
  panelWidth = '500',
  panelHeight = '500',
  cefParams = [
    '--allow-file-access-from-files',
    '--allow-file-access',
    '--enable-nodejs',
  ],
  iconNormal,
  iconRollover,
  iconDarkNormal,
  iconDarkRollover,
  startEvents
}) {
  var commandLineParams = cefParams.map(
    cefParam => `<Parameter>${cefParam}</Parameter>`
  )

  var icons = [
    { icon: iconNormal, type: 'Normal' },
    { icon: iconRollover, type: 'RollOver' },
    { icon: iconDarkNormal, type: 'DarkNormal' },
    { icon: iconDarkRollover, type: 'DarkRollOver' },
  ]
    .filter(({ icon }) => !!icon)
    .map(({ icon, type }) => `<Icon Type="${type}">${icon}</Icon>`)
    .join('\n            ')

  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<ExtensionManifest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ExtensionBundleId="${bundleId}" ExtensionBundleName="${bundleName}" ExtensionBundleVersion="${bundleVersion}" Version="${cepVersion}">
  <ExtensionList>
    <Extension Id="${bundleId}" Version="${version}"/>
  </ExtensionList>
  <ExecutionEnvironment>
    <HostList>
      ${hosts
        .map(host => `<Host Name="${host.name}" Version="${host.version}" />`)
        .join('\n      ')}
    </HostList>
    <LocaleList>
      <Locale Code="All"/>
    </LocaleList>
    <RequiredRuntimeList>
      <RequiredRuntime Name="CSXS" Version="${cepVersion}"/>
    </RequiredRuntimeList>
  </ExecutionEnvironment>
  <DispatchInfoList>
    <Extension Id="${bundleId}">
      <DispatchInfo>
        <Resources>
          <MainPath>./panel.html</MainPath>
          <CEFCommandLine>
            ${commandLineParams.join('\n            ')}
          </CEFCommandLine>
        </Resources>
        <Lifecycle>
          <AutoVisible>true</AutoVisible>
          <StartOn>
            ${startEvents.map(e => `<Event>${e}</Event>`).join('\n           ')}
          </StartOn>
        </Lifecycle>
        <UI>
          <Type>Panel</Type>
          <Menu>${bundleName}</Menu>
          <Geometry>
            <Size>
              <Width>${panelWidth}</Width>
              <Height>${panelHeight}</Height>
            </Size>
          </Geometry>
          <Icons>
            ${icons}
          </Icons>
        </UI>
      </DispatchInfo>
    </Extension>
  </DispatchInfoList>
</ExtensionManifest>`
}
