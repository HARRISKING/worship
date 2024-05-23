import { listToTree } from 'uniubi-utils';
import { findIndex } from 'lodash';

import { PostV2WebUnifySpaceSpaceTreeInfoResponse } from '@/api';

export enum NodeType {
  Space = 'space',
  Point = 'point',
  Device = 'device',
}

export const CONFIG = {
  [NodeType.Space]: {
    key: 'spaceCode',
  },
  [NodeType.Point]: {
    key: 'pointCode',
  },
  [NodeType.Device]: {
    key: 'deviceNo',
  },
};

type SpaceType = PostV2WebUnifySpaceSpaceTreeInfoResponse[0] & {
  parentCode: string;
};
type PointType = PostV2WebUnifySpaceSpaceTreeInfoResponse[0]['childPoints'][0];
type DeviceType =
  PostV2WebUnifySpaceSpaceTreeInfoResponse[0]['childPoints'][0]['devices'][0];

interface CustomNode {
  title: string;
  key: string;
  parentKey: string;
  icon: JSX.Element | null;
  nodeType: NodeType;
  children?: Array<(PointType & CustomNode) | (DeviceType & CustomNode)>;
}

type CustomPointType = PointType & CustomNode;
type CustomSpaceType = SpaceType & CustomNode;
type CustomDeviceType = DeviceType & CustomNode;
type CustomNodeType = CustomSpaceType | CustomPointType | CustomDeviceType;

export const formatSpaceTreeData = (data) => {
  if (!data?.length) {
    return [];
  }
  const arr =
    data?.map((space: SpaceType) => ({
      ...space,
      title: space.spaceName,
      key: space[CONFIG[NodeType.Space].key],
      parentKey: space.parentCode,
      nodeType: NodeType.Space,
      children: space.childPoints?.map((point: PointType) => ({
        ...point,
        title: point.pointName,
        key: point[CONFIG[NodeType.Point].key],
        parentKey: space[CONFIG[NodeType.Space].key],
        nodeType: NodeType.Point,
        children: point.devices?.map((device: DeviceType) => ({
          ...device,
          title: device.deviceName,
          key: device[CONFIG[NodeType.Device].key],
          parentKey: point[CONFIG[NodeType.Point].key],
          nodeType: NodeType.Device,
        })),
      })),
    })) || [];
  const tree = listToTree(arr, {
    id: 'key',
    parentId: 'parentKey',
    children: 'children',
  }) as CustomNodeType[];
  return tree;
};

// 对空间树进行排序
export const sortTreeData = (list) => {
  if (!list?.length) {
    return [];
  }
  // 取出brotherId不存在的或brother为根节点的数据
  const data: any = list.filter((i) => !i.brotherId || i.brotherId === -1);
  for (let index = 0; index < list.length; index++) {
    const ele = list[index];
    // 查找data中是否存在，不存在则继续
    if (findIndex(data, ['spaceId', ele.spaceId]) !== -1) {
      continue;
    }
    // 查找当前兄弟节点的索引
    const idxBro = findIndex(data, ['spaceId', ele.brotherId]);
    // 查找当前节点的索引
    const idxOwn = findIndex(data, ['brotherId', ele.spaceId]);
    if (idxBro !== -1 && idxOwn === -1) {
      data.splice(idxBro + 1, 0, ele);
    } else if (idxBro === -1 && idxOwn !== -1) {
      data.splice(idxOwn, 0, ele);
    } else if (idxBro !== -1 && idxOwn !== -1) {
      data.splice(idxOwn, 0, ele);
    } else {
      data.push(ele);
    }
  }
  return data?.sort((a, b) => a.parentId - b.parentId);
};