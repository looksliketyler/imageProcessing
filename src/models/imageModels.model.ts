export interface ImageRequestObj {
  id: string;
  imageName: string;
  options: {
    resize: { width: number; height: number };
    grayscale: boolean;
  };
}

export interface PathExists {
  pathExists: boolean;
  message: string;
}

export interface FilePathObj extends PathExists {
  originalFilePath: string;
  updatedFilePath: string;
}
