import { gweiUnits } from '../../constants/unit.js'

import { type FormatUnitsError, formatUnits } from './formatUnits.js'

export type FormatGweiError = FormatUnitsError

export function formatGwei(wei: bigint, unit: 'wei' = 'wei') {
  return formatUnits(wei, gweiUnits[unit])
}
