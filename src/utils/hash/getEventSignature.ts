import type { AbiEvent, AbiFunction } from 'abitype'

import {
  type GetFunctionSignatureErrorType,
  getFunctionSignature,
} from './getFunctionSignature.js'

export type GetEventSignatureErrorType = GetFunctionSignatureErrorType | Error

export const getEventSignature = (fn: string | AbiEvent) => {
  return getFunctionSignature(fn as {} as AbiFunction)
}
