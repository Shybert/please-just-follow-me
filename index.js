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
          signature: 'RACE',
          filter: record => {
            return !xelib.HasKeyword(record, 'Vampire')
          }
        },
        patch: record => {
          helpers.logMessage(`Patching ${xelib.LongName(record)}`)
          xelib.SetFlag(record, 'DATA\\Flags', 'No Combat In Water', false)
        }
      }
    ]
  })
})
