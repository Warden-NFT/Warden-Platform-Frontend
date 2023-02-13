export interface StorageFileMetadata {
  [key: string]: string | number
}

export interface StoredAsset {
  url: string
  metadata: StorageFileMetadata
}
