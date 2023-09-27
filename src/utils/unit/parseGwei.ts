import { gweiUnits } from '../../constants/unit.js'

import { type ParseUnitsError, parseUnits } from './parseUnits.js'

export type ParseGweiError = ParseUnitsError | Error

export function parseGwei(ether: string, unit: 'wei' = 'wei') {
  return parseUnits(ether, gweiUnits[unit])
}
