import { useState, useEffect } from "react"
import axios from "axios"
import {
  AssetUploadMetadata,
  PinataPinResponse
} from "../interfaces/mint/pinata.interface"
import { v4 as uuidv4 } from "uuid"

const BASE_API = process.env.NEXT_PUBLIC_PINATA_BASE_API
const JWT = `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`

export function usePinnie() {
  const [authenticated, setAuthenticated] = useState(false)

  async function authenticate() {
    try {
      const res = await axios(`${BASE_API}/data/testAuthentication`, {
        headers: {
          Authorization: JWT
        }
      })

      if (res.status === 200) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
    } catch (e) {
      setAuthenticated(false)
    }
  }

  async function pinFilesToIPFS(
    files: File[],
    metadata: AssetUploadMetadata[],
    cidVersion?: number
  ) {
    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append("file", file)
    })

    const options = {
      cidVersion: cidVersion ?? 0
    }
    formData.append("pinataOptions", JSON.stringify(options))
    const res = await axios.post<PinataPinResponse>(
      `${BASE_API}/pinning/pinFileToIPFS`,
      formData,
      {
        maxBodyLength: 1_000_000_000,
        headers: {
          //@ts-ignore
          "Content-Type": `multipart/form-data; boundary=${formData?._boundary}`,
          Authorization: JWT
        }
      }
    )
    console.log(res)
    return res.data
  }

  async function removePinFileToIPFS(cid: string) {
    await axios.delete<PinataPinResponse>(`${BASE_API}/unpin/${cid}`)
  }

  useEffect(() => {
    authenticate()
  }, [])

  return {
    authenticated,
    pinFilesToIPFS,
    removePinFileToIPFS
  }
}
