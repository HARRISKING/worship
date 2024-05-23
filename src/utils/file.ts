import Taro from '@tarojs/taro';

import TaroSupply from '@/utils/TaroSupply';
import { Toast } from '@/utils/toast';

// import { rename } from './common';
import { Loading } from './loading';

/**
 * 选择图片
 * @param option http://taro-docs.jd.com/taro/docs/apis/media/image/chooseImage/
 * @returns Promise<any>
 */
export const chooseImage = (
  option?: Omit<Taro.chooseImage.Option, 'success' | 'fail'>,
): Promise<any> => {
  const { count = 1, sourceType = ['album', 'camera'], ...rest } = option || {};
  return TaroSupply.chooseImage({
    count,
    sourceType,
    sizeType: ['compressed'],
    ...rest,
  });
};

/**
 * 上传文件
 * @param option https://taro-docs.jd.com/taro/docs/apis/network/upload/uploadFile
 * @returns Promise<any>
 */
export const uploadFile = (
  option: Taro.uploadFile.Option & { fileType?: string },
): Promise<any> => {
  Loading.show();
  return new Promise((resolve, reject) => {
    TaroSupply.uploadFile({
      ...option,
      success(res) {
        if (res.statusCode === 200 && res.data) {
          const data = JSON.parse(res.data);
          resolve(data.success ? data.data : false);
        } else {
          resolve(false);
        }
      },
      fail(e) {
        Toast.info('上传失败');
        reject(e);
      },
      complete() {
        Loading.hide();
      },
    });
  });
};

/**
 * 获取 OSS 上传凭证
 * @param superKey 获取上传凭证的 superKey
 * @returns 上传凭证
 */
// export const getSignature = async (superKey: string) => {
//   try {
//     const params = { superKey };
//     // TODO: 根据业务修改获取 signature 方法
//     const res = await getV2Signature(params);
//     if (res.success || res?.result === 1) {
//       return res.data;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

/**
 * 上传文件至 OSS
 * @param tempFile 临时文件
 * @param superKey 上传 OSS 用的 superKey
 * @returns 文件上传 OSS 地址
 */
// export const uploadOSS = async (
//   tempFile: Taro.chooseImage.ImageFile | Taro.chooseMessageFile.ChooseFile,
//   superKey: string,
// ) => {
//   // 获取上传oss参数
//   const oss = await getSignature(superKey);
//   if (oss) {
//     // 无法获取图片名称，采用时间戳作为文件名
//     const fileName = (tempFile as any)?.name
//       ? rename((tempFile as Taro.chooseMessageFile.ChooseFile).name)
//       : `${+new Date()}`;
//     const key = `${superKey}/${fileName}`;
//     const {
//       dir,
//       policy,
//       accessid: OSSAccessKeyId,
//       signature,
//       host,
//       expire,
//     } = oss;
//     try {
//       // 上传至 oss
//       await uploadFile({
//         name: 'file',
//         fileType: 'image',
//         url: host,
//         filePath: tempFile.path,
//         formData: {
//           key,
//           dir,
//           policy,
//           OSSAccessKeyId,
//           signature,
//           expire,
//           success_action_status: '200',
//         },
//       });
//       return `${host}/${key}?x-oss-process=image/resize,m_lfit,h_1080,w_1080`;
//     } catch (e) {
//       Toast.info('上传失败');
//       console.log('e', e);
//     }
//   }
// };

export const SaveImage = (url: string) => {
  Loading.show();
  Taro.downloadFile({
    url,
    success(res) {
      const filePath = res.tempFilePath;

      Taro.saveImageToPhotosAlbum({
        filePath,
        success() {
          Loading.hide();
          // 下载成功后处理你的逻辑
          Toast.success('保存图片成功');
        },
        fail(err) {
          console.log(err);
          Loading.hide();
          Toast.success('保存图片失败');
        },
      });
    },
    fail() {
      Loading.hide();
      Toast.success('保存图片失败');
    },
  });
};
