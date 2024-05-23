import Taro from '@tarojs/taro';
import moment from 'moment';
// 将部门数组转换为tree结构

export function levelLoop(originData) {
  const dataSource = JSON.parse(JSON.stringify(originData));
  return dataSource.filter((e) => {
    const pid = e.pId;
    const resultArr = dataSource.filter((ele) => {
      if (ele.id === pid) {
        if (!ele.children) {
          ele.children = [];
        }
        ele.children.push(e);
        return true;
      }
      return false;
    });
    return resultArr.length === 0;
  });
}

export const debounce = (fn, wait, immediate) => {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 如果已经执行过，不再执行
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) {
        fn.apply(this, arguments);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, wait);
    }
  };
};
// 获取文件类型
export function getFileType(file) {
  const fileName = (file.path || '').toLowerCase();
  return !file.isFolder
    ? fileName.substring(fileName.lastIndexOf('.') + 1)
    : '';
}

export const getCurrentPagePath = (): string => {
  const pages = Taro.getCurrentPages();
  const currentPage = pages[pages.length - 1];
  return `/${currentPage?.route}`;
};

export function longStrHandle(value: string, length = 5) {
  if (typeof value === 'string') {
    if (value.length > length) {
      return `${value.slice(0, length)}...`;
    } else {
      return value;
    }
  } else {
    return null;
  }
}

// 预览
export const preview = (src) => {
  Taro.previewImage({ urls: [src] });
};

export const compareTime = (cur: string, target: string) => {
  const curStr =
    cur?.split(' ')?.length > 1
      ? cur
      : `${moment().format('YYYY-MM-DD')} ${cur}`;

  const targetStr =
    target?.split(' ')?.length > 1
      ? target
      : `${moment().format('YYYY-MM-DD')} ${target}`;

  const _cur = moment(curStr, 'YYYY-MM-DD HH:mm:ss').valueOf();

  const _target = moment(targetStr, 'YYYY-MM-DD HH:mm:ss').valueOf();

  return _cur > _target;
};

export function tranTimeShow(time: string, cur?: string) {
  const timeDay = moment(time).date();
  const curDay = moment(cur).date();

  if (!time) {
    return '';
  }

  if (!cur) {
    return ` ${moment(time).format('HH:mm')}`;
  }

  if (timeDay > curDay) {
    return `次日 ${moment(time).format('HH:mm')}`;
  } else if (timeDay === curDay) {
    return ` ${moment(time).format('HH:mm')}`;
  } else {
    return `昨日 ${moment(time).format('HH:mm')}`;
  }
}

export function sec2Hour(time) {
  return time || time === 0 ? (time / 3600).toFixed(1) : '--';
}

export function sec2Min(time) {
  const min = time || time === 0 ? (time / 60).toFixed(0) : '--';
  if (+min > 60) {
    return `${sec2Hour(time)}小时`;
  } else {
    return `${min}分钟`;
  }
}

export function getDistance(lat1, lng1, lat2, lng2) {
  console.log(lat1, lng1, lat2, lng2);

  const radLat1 = (lat1 * Math.PI) / 180.0;
  const radLat2 = (lat2 * Math.PI) / 180.0;
  const a = radLat1 - radLat2;
  const b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2),
      ),
    );
  s *= 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;
}

export const initVoice = (path: string) => {
  let voiceContext: { [key: string]: any } = {};
  voiceContext = Taro.createInnerAudioContext();
  voiceContext.src = path;
  voiceContext.onEnded(() => {
    voiceContext.destroy();
  });
  return voiceContext;
};

/**
 *
 * @param arr  扁平化数组
 * @param pId 需要查找的ID
 * @returns
 */
export const findPath = (arr, pId) => {
  if (!arr?.length) {
    return [];
  }
  const temp: any[] = [];
  const callback = (nowArr, subId) => {
    for (let i = 0; i < nowArr.length; i++) {
      const item = nowArr[i];
      if (item.id === subId) {
        temp.push(item);
        callback(arr, item.parentId);
        break;
      }
    }
  };
  callback(arr, pId);
  return temp;
};
