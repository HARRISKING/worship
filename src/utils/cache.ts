/**
 * 全局存储
 */
import Taro from '@tarojs/taro';

export enum CacheKey {
  PHONE_SYSTEM = 'phone_system',
  PROJECT = 'project',
  TOKEN = 'token',
  OPEN_ID = 'openId',
  ORGANIZE_NAME = 'organizeName',
  PHONE = 'phone',
  BACK_REFRESH = 'backRefresh',
  JS_CODE = 'jsCode',
  LOCATION_TIME = 'locationTime',
  SELECT_MEETING_ROOM = 'selectMeetingRoom',
  LOCATION_DISTANCE = 'locationDistance',
  LOGIN_BACK = 'loginBack',
  ADDRESS_LIST = 'addressList',
  WIFI_LIST = 'wifiList',
  HIDE_INSPECTION_GUIDE = 'hideInspectionGuide',
  FAMILY_INFO = 'familyInfo',
}

export class Cache {
  static get(key: CacheKey) {
    return Taro.getStorageSync(key);
  }

  static set(key: CacheKey, data: any, isSync = false) {
    if (isSync) {
      Taro.setStorage({ key, data });
    } else {
      Taro.setStorageSync(key, data);
    }
  }

  static remove(key: CacheKey) {
    Taro.removeStorageSync(key);
  }
}
