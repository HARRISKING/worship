import Taro from '@tarojs/taro';
import { useEffect } from 'react';

export const EventsKey = {
  RESUME_REFRESH: 'resumeRefresh',
  UPDATE_ACCOUNT_INFO: 'updateAccountInfo',
  UPDATE_SELECT_MEETING_ROOM: 'updateSelectMeetingRoom',
  UPDATE_MEETING: 'updateMeeting',
  UPDATE_CONTACTS: 'updateContacts',
  UPDATE_ROOT_CONTACTS: 'updateRootContacts',
  UPDATE_SPACE: 'updateSpace',
  UPDATE_PRODUCT: 'updateProduct',
  UPDATE_DEVICE_POSITION: 'updateDevicePosition',
  UPDATE_ACCESS_SPACE: 'updateAccessSpace',
  UPDATE_ACCESS_SPACE_BACK: 'updateAccessSpaceBack',
  UPDATE_MEDIA_PERSON: 'updateMediaPerson',
  UPDATE_MEDIA_PERSON_BACK: 'updateMediaPersonBack',
  UPDATE_FAMILY_DETAIL: 'updateFamilyDetail',
  UPDATE_FAMILY_LIST: 'updateFamilyList',
  UPDATE_FAMILY_MEMBER_LIST: 'updateFamilyMemberList',
};

export const useEvents = (
  key: string,
  listener: (info?: any) => void,
  disable?: boolean,
) => {
  useEffect(() => {
    !disable && Taro.eventCenter.on(key, listener);
    return () => {
      !disable && Taro.eventCenter.off(key);
    };
  }, []);
};

export const triggerEvent = (key: string, info?: any) => {
  Taro.eventCenter.trigger(key, info);
};
