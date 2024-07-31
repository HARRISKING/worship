import Taro from '@tarojs/taro';

export default class TaroSupply {
  static readonly isDingDing: boolean = process.env.TARO_ENV === 'dd';
  static readonly isQyWx: boolean =
    process.env.TARO_ENV === 'weapp' && !!wx?.qy;

  /**
   * 登录
   * @param options
   */
  static login(
    options?: Omit<Taro.login.Option, 'success' | 'fail'>
  ): Promise<Taro.login.SuccessCallbackResult> {
    const that = this;
    return new Promise((resolve, reject) => {
      const dealOptions = {
        ...options,
        success(res) {
          const { code, authCode, ...rest } = res;
          resolve({ ...rest, code: that.isDingDing ? authCode : code });
        },
        fail(e) {
          reject(e);
        },
      };
      if (that.isQyWx) {
        wx.qy.login(dealOptions);
      } else if (that.isDingDing) {
        dd.getAuthCode(dealOptions);
      } else {
        Taro.login(dealOptions);
      }
    });
  }

  /**
   * 请求
   * @param options
   */
  static request(
    options: Taro.request.Option & { params?: Record<string, any> }
  ) {
    return Taro.request(options);
  }
  /**
   * 上传文件统一传参
   */
  static uploadFile(option: Taro.uploadFile.Option & { fileType?: string }) {
    const { name, fileName, fileType = 'image', ...other } = option;
    if (this.isDingDing) {
      return dd.uploadFile({
        fileName: name,
        fileType,
        ...other,
      });
    } else {
      return Taro.uploadFile(option);
    }
  }
  /**
   * 选择图片统一返回
   * @param option
   */
  static chooseImage(
    option?: Omit<Taro.chooseImage.Option, 'success' | 'fail'>
  ): Promise<Taro.chooseImage.SuccessCallbackResult> {
    return new Promise((resolve, reject) => {
      Taro.chooseImage({
        ...option,
        success: (res) => {
          resolve({
            ...res,
            tempFiles:
              res.tempFiles ||
              res.tempFilePaths?.map((item) => ({ path: item })),
          });
        },
        fail: (e) => {
          reject(e);
        },
      });
    });
  }
  /**
   * 扫码进来获取信息
   */
  static getQrCodeParams(): Record<string, any> {
    let q: string;
    if (this.isDingDing) {
      const { router } = Taro.getCurrentInstance();
      const { params } = router || {};
      q = params?.q || '';
    } else {
      const { query } = Taro.getLaunchOptionsSync();
      q = query?.q || '';
    }
    const url = decodeURIComponent(q || '');
    const [, paramsStr] = url?.split('?');
    const back: Record<string, any> = { originUrl: url };
    paramsStr?.split('&')?.forEach((item) => {
      const [key, value] = item?.split('=');
      back[key] = value;
    });
    return back;
  }
}
