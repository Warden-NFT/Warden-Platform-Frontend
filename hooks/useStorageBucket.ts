import axios from "axios"
import { TicketsMetadata } from "../dtos/ticket/metadata.dto"
import { StoredAsset } from "../interfaces/gcp/storage.interface"

const URL = process.env.NEXT_PUBLIC_WARDEN_API_URL

export function useStorageBucket() {
  async function saveFile(
    files: File[],
    pathName: string,
    metadata?: TicketsMetadata[],
    onUploadProgress?: () => void
  ): Promise<StoredAsset[]> {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append("files", file)
    })
    formData.append("metadata", JSON.stringify(metadata ?? []))
    formData.append("folder", pathName)
    const res = await axios.post<StoredAsset[]>(`${URL}/media`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    })

    return res.data
  }

  async function getFiles(pathName: string, fileNames: string[]) {
    const data: StoredAsset[] = []
    fileNames.forEach(async (name) => {
      const res = await axios.post<StoredAsset>(`${URL}/media/getMedia`, {
        path: `${pathName}/${name}`
      })
      data.push(res.data)
    })

    return data
  }

  async function deleteFile(pathName: string) {
    await axios.post(`${URL}/media/getMedia`, {
      path: pathName
    })
  }

  return {
    saveFile,
    getFiles,
    deleteFile
  }
}
