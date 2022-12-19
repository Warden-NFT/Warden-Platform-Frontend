import { Container, Typography } from "@mui/material";
import Image from "next/image";
import React, {
      Dispatch,
      SetStateAction,
      useCallback,
      useContext,
      useEffect,
} from "react";
import { useDropzone } from "react-dropzone";
import { GenerateLayerContext } from "../../../contexts/generate/GenerateLayerContext";
import {
      LayeredAssetData,
      UploadedAsset,
} from "../../../interfaces/generate/file.interface";
import {
      extractFolderName,
      extractFolderNames,
      getAssetDimension,
      getAssetFileName,
      getAssetFileURL,
} from "../../../utils/assets/detail";

function LayeredDropzone() {
      const { setAssets, setLayeredAssets } = useContext(GenerateLayerContext);

      const onDrop = useCallback((acceptedFiles: File[]) => {
            // FIXME: Not allow upload without files
            // Do not accept any file without name
            const folderNames = extractFolderNames(acceptedFiles);
            const layeredAssets: LayeredAssetData[] = folderNames.map((name, i) => {
                  return {
                        index: i,
                        layerName: name,
                        occurance: 1,
                        assets: [],
                  };
            });

            acceptedFiles.forEach((file) => {
                  setAssets((prev) => [...prev, file]);
                  const reader = new FileReader();

                  reader.onabort = () => console.log("file reading was aborted");
                  reader.onerror = () => console.log("file reading has failed");
                  reader.onload = async () => {
                        const url = await getAssetFileURL(file);
                        const dimensions = await getAssetDimension(url);
                        if (!url || !dimensions) return;

                        const assetFileName = extractFolderName(file);
                        const index = layeredAssets.findIndex(layer => layer.layerName === assetFileName)
                        const asset: UploadedAsset = {
                              name: getAssetFileName(file),
                              dimension: dimensions,
                              data: url
                        }
                        if (index !== -1) {
                              layeredAssets[index].assets.push(asset)
                        }

                  };
                  reader.readAsArrayBuffer(file);
            });
            setLayeredAssets(layeredAssets)
      }, []);
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            // note: accept only folders with images
            accept: {
                  "image/png": [],
                  "image/jpg": [],
                  "image/gif": [],
            },
      });
      return (
            <Container
                  sx={{
                        backgroundColor: 'white',
                        minHeight: 140,
                        borderWidth: 2,
                        borderColor: "primary.main",
                        borderRadius: 3,
                        borderStyle: "dashed",
                        display: "grid",
                        placeItems: "center",
                  }}
                  {...getRootProps()}
            >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                        <Image
                              src="/images/generate/dropzone-drag-active.png"
                              width="100"
                              height="100"
                              alt="Accepting Files"
                        />
                  ) : (
                        <Typography>Drag files OR Click to select</Typography>
                  )}
            </Container>
      );
}

export default LayeredDropzone;
