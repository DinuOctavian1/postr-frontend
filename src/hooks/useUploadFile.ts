import { useState } from 'react';

const useUploadFile = (
  apiAgent: any,
): {
  uploadFile: (file: FormData) => void;
  fileUrl: string;
  isLoading: boolean;
} => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>('');

  const uploadFile = (file: FormData): void => {
    setIsLoading(true);
    apiAgent.Post.uploadFile(file)
      .then((rsp: string) => {
        if (rsp) {
          setFileUrl(rsp);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { uploadFile, fileUrl, isLoading };
};

export default useUploadFile;
