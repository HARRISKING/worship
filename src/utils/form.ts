import { useEffect, useState } from 'react';

import {
  ImageProps,
  ImageUploadProps,
  ImageUploadStatus,
} from '@/tools/interface/base';
import {
  DealFormErrorsParams,
  FormItemConfigProps,
} from '@/tools/interface/form';
import { checkByRule } from '@/tools/utils/checker';
import { chooseImage } from '@/tools/utils/file';

export const dealFormErrors = (params: DealFormErrorsParams) => {
  const { value, rule, setErrors, errors, labelConfig, key } = params;
  const result = checkByRule({
    rule: {
      name: typeof labelConfig.label === 'string' ? labelConfig.label : '',
      ...rule,
    },
    value,
    key,
  });
  if (result) {
    setErrors({
      ...errors,
      [key]: result.message,
    });
  } else {
    setErrors({
      ...errors,
      [key]: '',
    });
  }
};

export const configItem: <T>(
  props: FormItemConfigProps<T>,
) => FormItemConfigProps<T> = (params) => params;

/**
 * 处理图片上传hook
 * @param props: ImageUploadProps
 * @return images
 */
export const useHandleUpload = (props: ImageUploadProps) => {
  const { value, count = 1, sourceType, upload, onChange } = props;
  const dealStringToImage = (url: string | ImageProps) => {
    if (typeof url === 'string') {
      return { url, status: ImageUploadStatus.SUCCESS };
    } else {
      return url;
    }
  };
  const [images, setImages] = useState<ImageProps[]>([]);

  useEffect(() => {
    setImages(value?.map((v) => dealStringToImage(v)) || []);
  }, [value]);

  const [tempFiles, setTempFiles] = useState([]);
  const handleUpload = async () => {
    const res = await chooseImage({ count, sourceType });
    const temp = [
      ...images,
      ...res.tempFilePaths?.map((path) => ({
        url: path,
        status: ImageUploadStatus.LOCAL,
      })),
    ];
    const arr: any = [...tempFiles, ...res.tempFiles];
    setTempFiles(arr);
    setImages(temp);
    onChange && onChange(temp);
    arr?.map(async (file, index) => {
      let result: any = '';
      try {
        result = await upload(file);
      } catch (e) {
        console.log(e);
      }
      setImages((prevState) => {
        result &&
          (prevState[index].url =
            typeof result === 'string' ? result : result?.url);
        prevState[index].status = result
          ? ImageUploadStatus.SUCCESS
          : ImageUploadStatus.FAIL;
        onChange && onChange(prevState);
        return prevState;
      });
    });
  };
  return { images, setImages, handleUpload, setTempFiles };
};

export const getPlaceholder = (
  placeholder,
  labelConfig,
  placeholderWithLabel,
) => {
  return placeholderWithLabel
    ? `${placeholder}${labelConfig.label || ''}`
    : placeholder;
};
