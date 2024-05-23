/**
 * 解析taro播放器播放时回调返回的分辨率信息， 目前只支持包含如下格式的： resolution:1280x720
 * @param str
 */
export const parseResulotion = (str) => {
  let res = {
    width: undefined as any,
    height: undefined as any,
  }
  const regex = /resolution:([0-9]+)x([0-9]+)/;
  const match = (str || '').match(regex);
  if (match) {
    res.width = parseInt(match[1]);
    res.height = parseInt(match[2]);
  }
  return res;
}