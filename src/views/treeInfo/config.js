import nonodeCompanies from '@/assets/imgs/tree/nodeCompanies.png'
import nodeExhaustVapors from '@/assets/imgs/tree/nodeExhaustVapors.png'
import nodeWastewater from '@/assets/imgs/tree/nodeWastewater.png'
import nodeVideo from '@/assets/imgs/tree/nodeVideo.png'
import nodeCraft from '@/assets/imgs/tree/nodeCraft.png'
export const menu = [
  {
    label: '基本信息',
    id: 1,
    type: ''
  },
  {
    label: '添加排口',
    id: 2,
    type: ''
  },
  {
    label: '添加视频监测点',
    id: 3,
    type: ''
  },
  {
    label: '添加工艺',
    id: 4,
    type: ''
  }
]
export const tools = [
  {
    label: '添加概要',
    id: '1'
  }
]
export const nodes = [
  {
    value: '企业',
    shape: 'node-1',
    icon: nonodeCompanies
  },
  {
    value: '废气',
    shape: 'node-2',
    icon: nodeExhaustVapors
  },
  {
    value: '废水',
    shape: 'node-3',
    icon: nodeWastewater
  },
  {
    value: '视频',
    shape: 'node-video',
    icon: nodeVideo
  },
  {
    value: '工艺',
    shape: 'node-craft',
    icon: nodeCraft
  }
]
