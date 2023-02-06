import { useEffect, useState } from "react"
import { client } from "../configs/axios/axiosConfig"
import { ABIItem } from "../interfaces/smartContract/smartContract.interface"
import useAsyncEffect from "./useAsyncEffect"
import Web3 from "web3"

export const useSmartContract = () => {
  const [abi, setAbi] = useState<ABIItem[]>([])
  const [bytecode, setBytecode] = useState<any>()
  const [web3, setWeb3] = useState<Web3>()

  useEffect(() => {
    setWeb3(new Web3(window.ethereum as any))
  }, [])

  useAsyncEffect(async () => {
    try {
      const _abi = await client.get<ABIItem[]>("/smart-contract/abi")
      setAbi(_abi.data)

      const _bytecode = await client.get<any>("/smart-contract/bytecode")
      setBytecode(_bytecode.data)
    } catch (error) {
      // TODO: add error alert
    }
  }, [])

  return { abi, setAbi, bytecode, setBytecode, web3 }
}
