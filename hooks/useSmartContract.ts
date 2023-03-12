import { useContext, useEffect, useState } from "react"
import { client } from "../configs/axios/axiosConfig"
import { LayoutContext } from "../contexts/layout/LayoutContext"
import { AlertType } from "../interfaces/modal/alert.interface"
import { ABIItem } from "../interfaces/smartContract/smartContract.interface"
import useAsyncEffect from "./useAsyncEffect"
import Web3 from "web3"

export const useSmartContract = () => {
  // Hooks
  const { showErrorAlert } = useContext(LayoutContext)

  // States
  const [abi, setAbi] = useState<{ abi: ABIItem[] }>()
  const [bytecode, setBytecode] = useState<any>()
  const [web3, setWeb3] = useState<Web3>()

  useEffect(() => {
    setWeb3(new Web3(window.ethereum as any))
  }, [])

  useAsyncEffect(async () => {
    try {
      const _abi = await client.get<{ abi: ABIItem[] }>("/smart-contract/abi")
      setAbi(_abi.data)

      const _bytecode = await client.get<any>("/smart-contract/bytecode")
      setBytecode(_bytecode.data)
    } catch (error) {
      showErrorAlert({
        type: AlertType.ERROR,
        title: "Error",
        description:
          "Error fetching smart contract ABI and/or Bytecode. Please try again later."
      })
    }
  }, [])

  return { abi, setAbi, bytecode, setBytecode, web3 }
}
