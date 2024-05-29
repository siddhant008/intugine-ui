import { ColorPartial } from '@material-ui/core/styles/createPalette'

import { Color as MuiColor } from '@mui/material'

declare module '@mui/material/styles/createPalette' {
  interface PaletteColor extends ColorPartial {}
}

declare module '@mui/material' {
  interface Color extends MuiColor {
    650: string
    150: string
    350: string
  }
}
