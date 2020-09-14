import { useCallback, useEffect, useState } from "react";
import CloudinaryService from "../services/cloudinaryService";
import { percentageOf } from "../utils/common";

const useUploadImage = () => {
  const [error, setError] = useState<string>();
  const [publicId, setPublicId] = useState<string>();
  const [file, setFile] = useState<File>();
  const [loadedPercent, setLoadedPercent] = useState<number>(0);

  const onUploadProgress = useCallback(
    ({ total, loaded }) => setLoadedPercent(percentageOf(total, loaded)),
    []
  );

  const reset = () => {
    setFile(undefined);
    setPublicId(undefined);
    setError(undefined);
    setLoadedPercent(0);
  };

  const uploadFile = (file: File) => {
    reset();
    setFile(file);
  };

  useEffect(() => {
    if (!file) return;
    CloudinaryService.uploadImage(file, onUploadProgress)
      .then((data) => setPublicId(data.public_id))
      .catch((e) => setError(e?.response?.data?.error?.message || e.message));
  }, [file, onUploadProgress]);

  useEffect(() => {
    let timerId: any;
    const ONE_SEC = 1000;
    const FINISH_LOAD = 100;
    if (loadedPercent === FINISH_LOAD) {
      timerId = setTimeout(() => setLoadedPercent(0), ONE_SEC);
    }
    return () => clearTimeout(timerId);
  }, [loadedPercent, setLoadedPercent]);

  return {
    reset,
    uploadFile,
    loadedPercent,
    publicId,
    error,
  };
};

export default useUploadImage;
