// 查询热力图
import request from '@/utils/request';
export interface getApiV1HotmapsQuery {
  open_id: string;
}
export interface getApiV1HotmapsResponse {
  id: number;
  open_id: string;
  hot_values: number[][];
  created_at: string;
  updated_at: string;
}
export async function getApiV1Hotmaps(
  query: getApiV1HotmapsQuery
): Promise<any> {
  return request(`/v1/hotmaps`, {
    method: 'GET',
    data: query,
  });
}

// 更新热力图
export interface PostApiV1HotmapsBody {
  open_id: string;
}

export async function postApiV1Hotmaps(
  body: PostApiV1HotmapsBody
): Promise<any> {
  return request(`/v1/hotmaps`, {
    method: 'POST',
    data: body,
  });
}
