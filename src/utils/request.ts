import Taro from '@tarojs/taro';

import { BaseResponse } from '@/interface/base';
import { Cache, CacheKey, Toast } from '@/utils/index';

export const DEFAULT_TIP_MESSAGE = '请求失败，请刷新重试';

export const filterErrorCode: string[] = []; // 无需提示的错误码

const log = (...args) => {
  if (
    process.env.CUSTOM_ENV !== 'prod' ||
    process.env.NODE_ENV === 'development'
  ) {
    console.log(...args);
  }
};

const request = (url, options) => {
  log('request', url, options);
  // 获取请求地址
  const requestUrl = `${process.env.BASE_URL || ''}${
    process.env.BASE_API || ''
  }${url || ''}`;
  return new Promise<BaseResponse>((resolve, reject) => {
    Taro.request({
      timeout: 10000,
      mode: 'cors',
      success(res: any) {
        const { data } = res;
        if (
          !data.success &&
          data.result !== 1 &&
          !filterErrorCode.includes(data.code) &&
          !options?.isHideError
        ) {
          data?.msg?.length < 15
            ? setTimeout(() => {
                Toast.info(data?.msg);
              }, 300)
            : Toast.alert({ content: data?.msg });
        }
        log('response返回------', url, data);
        resolve(data);
      },
      fail(err) {
        Taro.atMessage({ message: DEFAULT_TIP_MESSAGE, type: 'error' });
        // for debug
        log('fail错误--=-=-=-=', url, err);
        reject(err);
      },
      ...options,
      header: {
        'content-type': 'application/json', // 默认值
        project: Cache.get(CacheKey.PROJECT) || process.env.PROJECT_URL,
        token: Taro.getStorageSync('token'),
        ...options.header,
      },
      url: requestUrl,
    });
  });
};

export default request;
