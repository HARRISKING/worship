import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';

import { BaseResponse } from '@/tools/interface/base';

// 处理moonPower生成的请求
interface handleRequestProps {
  // moonPower生成的请求
  request: (v?: any) => Promise<BaseResponse>;
  // 是否loading
  loading?: boolean;
  // 是否处理错误
  handleError?: (error) => void;
}

/**
 * loading栈
 */
const loadingList: boolean[] = [];

/**
 * 处理
 * @param params
 */
const handleRequest = async (params: handleRequestProps): Promise<any> => {
  const { loading, request, handleError } = params;
  if (loading) {
    !loadingList.length &&
      Taro.showLoading({
        title: 'loading',
        mask: true,
      });
    loadingList.push(loading);
  }
  try {
    const resp = await request();
    if (resp && resp?.result !== 1 && !resp?.success) {
      handleError && handleError(resp);
    }
    return resp;
  } catch (error) {
    return null;
  } finally {
    loadingList.pop();
    if (!loadingList.length) {
      Taro.hideLoading();
    }
  }
};

export default handleRequest;

interface OptionsProps {
  immediate?: boolean;
  dependencies?: any[];
}

export const useRequest = <T>(props: handleRequestProps & OptionsProps) => {
  const { immediate = true, dependencies, ...params } = props;
  const [result, setResult] = useState<T>();
  useEffect(() => {
    immediate && refresh();
  }, dependencies || []);
  const refresh = async () => {
    const resp = await handleRequest(params);
    (resp?.success || resp?.result === 1) && setResult(resp?.data);
  };
  const filterFunction = async (filterOut) => {
    const resp = await handleRequest({
      ...params,
      request: () => params.request(filterOut),
    });
    (resp?.success || resp?.result === 1) && setResult(resp?.data);
    return resp;
  };
  return { result, refresh, filterFunction };
};
