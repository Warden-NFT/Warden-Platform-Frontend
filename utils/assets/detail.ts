import {
  AssetDimension,
  LayeredAssetData,
} from "../../interfaces/generate/file.interface";

export function getAssetDimension(src: string): Promise<AssetDimension> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      return resolve({
        width: img.width,
        height: img.height,
      });
    };

    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

export function getAssetFileName(file: File) {
  const name = file.name.split(".");
  return name[0];
}

export async function getAssetFileURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        if (reader.result) {
          return resolve(reader.result as string);
        }
      };
    } catch (e) {
      reject(e);
    }
  });
}

interface PathedFile extends File {
  path: string;
}

export function extractFolderName(file: File) {
  const _file = file as PathedFile;
  const filePath = _file.path.split("/")[1];

  if (!filePath) {
    throw new Error("File does not contain name!");
  }

  return filePath;
}

export function extractFolderNames(files: File[]) {
  const names: string[] = [];
  files.forEach((file) => {
    const filePath = extractFolderName(file);
    if (!names.includes(filePath)) {
      names.push(filePath);
    }
  });
  return names;
}
