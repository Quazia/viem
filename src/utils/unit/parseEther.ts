import { etherUnits } from '../../constants/unit.js'

import { type ParseUnitsError, parseUnits } from './parseUnits.js'

export type ParseEtherError = ParseUnitsError | Error

export function parseEther(ether: string, unit: 'wei' | 'gwei' = 'wei') {
  return parseUnits(ether, etherUnits[unit])
}
