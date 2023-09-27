import type { AbiFunction } from 'abitype'

import {
  type FormatAbiItemErrorType,
  formatAbiItem,
} from '../abi/formatAbiItem.js'
import {
  type ExtractFunctionNameErrorType,
  type ExtractFunctionParamsErrorType,
  extractFunctionName,
  extractFunctionParams,
} from '../contract/extractFunctionParts.js'

export type GetFunctionSignatureErrorType =
  | ExtractFunctionNameErrorType
  | ExtractFunctionParamsErrorType
  | FormatAbiItemErrorType

export const getFunctionSignature = (fn: string | AbiFunction) => {
  if (typeof fn === 'string') {
    const name = extractFunctionName(fn)
    const params = extractFunctionParams(fn) || []
    return `${name}(${params.map(({ type }) => type).join(',')})`
  }

  return formatAbiItem(fn)
}
