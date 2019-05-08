/* global xelib, registerPatcher, patcherUrl */

registerPatcher({
  info: info,
  gameModes: [xelib.gmSSE, xelib.gmTES5],
  settings: {
    label: 'Please Just Follow Me',
    templateUrl: `${patcherUrl}/partials/settings.html`,
    defaultSettings: {}
  },
  execute: (patchFile, helpers, settings, locals) => ({
    process: [
      {
        load: {
          signature: 'ECZN'
        },
        patch: function(record) {
          helpers.logMessage(`Patching ${xelib.LongName(record)}`)
        }
      }
    ]
  })
})
