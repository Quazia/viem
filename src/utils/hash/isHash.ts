import type { Hex } from '../../types/misc.js'
import { type IsHexErrorType, isHex } from '../data/isHex.js'
import { type SizeErrorType, size } from '../data/size.js'

export type IsHashErrorType = IsHexErrorType | SizeErrorType | Error

export function isHash(hash: string): hash is Hex {
  return isHex(hash) && size(hash) === 32
}
