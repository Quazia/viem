import { etherUnits } from '../../constants/unit.js'

import { type FormatUnitsError, formatUnits } from './formatUnits.js'

export type FormatEtherErrorType = FormatUnitsError

export function formatEther(wei: bigint, unit: 'wei' | 'gwei' = 'wei') {
  return formatUnits(wei, etherUnits[unit])
}
