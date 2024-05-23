import Taro, {
  authorize,
  env,
  getFileSystemManager,
  getSetting,
  saveImageToPhotosAlbum,
} from '@tarojs/taro';

import { Toast } from '@/tools/utils/index';

interface SaveProps {
  // 文件名
  name: string;
  // canvas ref
  qrRef: any;
  successTip?: string;
  failTip?: string;
}
export class QrCodeTool {
  static preview(qrRef: any) {
    Taro.previewImage({ urls: [qrRef.current.image] });
  }
  static save(props: SaveProps) {
    const that = this;
    getSetting({
      success({ authSetting }) {
        // 没有权限则申请
        if (!authSetting['scope.writePhotosAlbum']) {
          authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              // 存储二维码
              that.handleWriteFile(props);
            },
          });
        } else that.handleWriteFile(props);
      },
    });
  }
  static handleWriteFile({ name, qrRef, successTip, failTip }: SaveProps) {
    const data = qrRef.current.image.split(',')[1];
    const filePath = `${env.USER_DATA_PATH}/${name}.png`;
    const { writeFile } = getFileSystemManager();
    // 写入 获得文件路径
    writeFile({
      data,
      filePath,
      encoding: 'base64',
      success: () => {
        // 存入相册
        saveImageToPhotosAlbum({
          filePath,
          success: () => {
            Toast.success(successTip || '二维码图片已保存至相册');
          },
        });
      },
      fail: () => {
        Toast.info(failTip || '保存失败');
      },
    });
  }
}
