import { join } from 'node:path'

import { generatePrivateKey } from '../../src/accounts/generatePrivateKey.js'
import { signTransaction } from '../../src/accounts/utils/signTransaction.js'
import { parseTransaction } from '../../src/index.js'
import {
  TransactionSerializableEIP1559,
  TransactionSerializableEIP2930,
  TransactionSerializableLegacy,
} from '../../src/types/transaction.js'
import { bytesToHex } from '../../src/utils/encoding/toHex.js'
import { stringify } from '../../src/utils/stringify.js'
import { serializeTransaction } from '../../src/utils/transaction/serializeTransaction.js'

const generateBytes = (length: number) => {
  const bytes = new Uint8Array(length)
  for (let i = 0; i < length; i++) bytes[i] = Math.floor(Math.random() * 255)
  return bytes
}

const generateList = (length: number) => {
  const bytes: `0x${string}`[] = []
  for (let i = 0; i < length; i++)
    bytes.push(
      bytesToHex(generateBytes(Math.floor(Math.random() * 32)), { size: 32 }),
    )
  return bytes
}

export async function generateTransactionVectors() {
  const generatedPath = join(import.meta.dir, './transaction.json')
  Bun.write(generatedPath, '')

  const generated = Bun.file(generatedPath)
  const writer = generated.writer()

  writer.write('[')

  // eip1559
  for (let i = 0; i < 10_000; i++) {
    if (i > 0) writer.write(',')
    const transaction: TransactionSerializableEIP1559 = {
      chainId: Math.floor(Math.random() * 2 ** 4) + 1,
      type: 'eip1559',
    }
    if (i > 0) {
      if (Math.random() > 0.5)
        transaction.data = bytesToHex(
          generateBytes(Math.floor(Math.random() * 2048)),
        )
      if (Math.random() > 0.5)
        transaction.gas = BigInt(Math.floor(Math.random() * 2 ** 32))
      if (Math.random() > 0.5)
        transaction.maxFeePerGas = BigInt(Math.floor(Math.random() * 2 ** 32))
      if (Math.random() > 0.5 && transaction.maxFeePerGas)
        transaction.maxPriorityFeePerGas =
          transaction.maxFeePerGas -
          transaction.maxFeePerGas /
            (BigInt(Math.floor(Math.random() * 2)) + 1n)
      if (Math.random() > 0.5)
        transaction.nonce = Math.floor(Math.random() * 2 ** 16)
      if (Math.random() > 0.5)
        transaction.to = bytesToHex(generateBytes(20), { size: 20 })
      if (Math.random() > 0.5)
        transaction.value = BigInt(Math.floor(Math.random() * 2 ** 32))
      if (Math.random() > 0.5) {
        const listLength = Math.floor(Math.random() * 16)
        transaction.accessList = []
        for (let i = 0; i < listLength; i++)
          transaction.accessList.push({
            address: bytesToHex(generateBytes(20), { size: 20 }),
            storageKeys: generateList(Math.floor(Math.random() * 4)),
          })
      }
    }
    const serialized = serializeTransaction(transaction)

    const privateKey = generatePrivateKey()
    const serializedSigned = await signTransaction({ privateKey, transaction })
    const { r, s, v } = parseTransaction(serializedSigned)

    writer.write(
      stringify(
        {
          name: `eip1559: ${i}`,
          privateKey,
          transaction,
          serialized,
          serializedSigned,
          signature: { r, s, v, yParity: v === 28n ? 1 : 0 },
        },
        null,
        2,
      ),
    )
  }

  writer.write(',')

  // eip2930
  for (let i = 0; i < 10_000; i++) {
    if (i > 0) writer.write(',')
    const transaction: TransactionSerializableEIP2930 = {
      chainId: Math.floor(Math.random() * 2 ** 4) + 1,
      type: 'eip2930',
    }
    if (i > 0) {
      if (Math.random() > 0.5)
        transaction.data = bytesToHex(
          generateBytes(Math.floor(Math.random() * 2048)),
        )
      if (Math.random() > 0.5)
        transaction.gas = BigInt(Math.floor(Math.random() * 2 ** 32))
      if (Math.random() > 0.5)
        transaction.gasPrice = BigInt(Math.floor(Math.random() * 2 ** 32))
      if (Math.random() > 0.5)
        transaction.nonce = Math.floor(Math.random() * 2 ** 16)
      if (Math.random() > 0.5)
        transaction.to = bytesToHex(generateBytes(20), { size: 20 })
      if (Math.random() > 0.5)
        transaction.value = BigInt(Math.floor(Math.random() * 2 ** 32))
      if (Math.random() > 0.5) {
        const listLength = Math.floor(Math.random() * 16)
        transaction.accessList = []
        for (let i = 0; i < listLength; i++)
          transaction.accessList.push({
            address: bytesToHex(generateBytes(20), { size: 20 }),
            storageKeys: generateList(Math.floor(Math.random() * 4)),
          })
      }
    }
    const serialized = serializeTransaction(transaction)

    const privateKey = generatePrivateKey()
    const serializedSigned = await signTransaction({ privateKey, transaction })
    const { r, s, v } = parseTransaction(serializedSigned)

    writer.write(
      stringify(
        {
          name: `eip2930: ${i}`,
          privateKey,
          transaction,
          serialized,
          serializedSigned,
          signature: { r, s, v, yParity: v === 28n ? 1 : 0 },
        },
        null,
        2,
      ),
    )
  }

  writer.write(',')

  // legacy
  for (let i = 0; i < 10_000; i++) {
    if (i > 0) writer.write(',')
    const transaction: TransactionSerializableLegacy = {
      type: 'legacy',
    }
    if (i > 0) {
      if (Math.random() > 0.5)
        transaction.data = bytesToHex(
          generateBytes(Math.floor(Math.random() * 2048)),
        )
      if (Math.random() > 0.5)
        transaction.gas = BigInt(Math.floor(Math.random() * 2 ** 32))
      if (Math.random() > 0.5)
        transaction.gasPrice = BigInt(Math.floor(Math.random() * 2 ** 32))
      if (Math.random() > 0.5)
        transaction.nonce = Math.floor(Math.random() * 2 ** 16)
      if (Math.random() > 0.5)
        transaction.to = bytesToHex(generateBytes(20), { size: 20 })
      if (Math.random() > 0.5)
        transaction.value = BigInt(Math.floor(Math.random() * 2 ** 32))
    }
    const serialized = serializeTransaction(transaction)

    const privateKey = generatePrivateKey()
    const serializedSigned = await signTransaction({ privateKey, transaction })
    const { r, s, v } = parseTransaction(serializedSigned)

    writer.write(
      stringify(
        {
          name: `legacy: ${i}`,
          privateKey,
          transaction,
          serialized,
          serializedSigned,
          signature: { r, s, v },
        },
        null,
        2,
      ),
    )
  }

  writer.write(']\n')
  writer.end()

  const gzipped = Bun.gzipSync(new Uint8Array(await generated.arrayBuffer()))
  Bun.write(`${generatedPath}.gz`, gzipped)
}
