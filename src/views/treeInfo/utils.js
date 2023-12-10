// import { Graph } from '@antv/x6'

// export function custom() {

// }

class x6 {
  constructor(grap, config) {
    this.grap = grap
    this.config = config
  }
  init() {

  }
}
export const getDownstreamNodePosition = (node, graph, dx = 250, dy = 100) => {
  // 找出画布中以该起始节点为起点的相关边的终点id集合
  const downstreamNodeIdList = []
  graph.getEdges().forEach((i) => {
    console.log(i)
    if (i.source.cell === node.id) {
      downstreamNodeIdList.push(i.target.cell)
    }
  })
  // 获取起点的位置信息
  const position = node.getPosition()
  let minX = Infinity
  let maxY = -Infinity
  graph.getNodes().forEach((graphNode) => {
    if (downstreamNodeIdList.indexOf(graphNode.id) > -1) {
      const nodePosition = graphNode.getPosition()
      // 找到所有节点中最左侧的节点的x坐标
      if (nodePosition.x < minX) {
        minX = nodePosition.x
      }
      // 找到所有节点中最x下方的节点的y坐标
      if (nodePosition.y > maxY) {
        maxY = nodePosition.y
      }
    }
  })

  return {
    x: minX !== Infinity ? minX : position.x + dx,
    y: maxY !== -Infinity ? maxY + dy : position.y
  }
}
function sum(arr) {
  return arr.reduce((prev, cur) => prev + cur)
}
export const getMidelNodesPosition = (allNodes, nodes, graph, dx = 150, dy = 0) => {
  if (!graph) return
  //
  let x = 0, y = 0
  const xArry = []
  const yAyy = []
  console.log(allNodes)
  console.log(nodes)
  allNodes.forEach(node => {
    nodes.forEach(graphNode => {
      if (node.id === graphNode.id) {
        console.log(node.x || graphNode.data.x)
        xArry.push(node.x || graphNode.data.x)
        yAyy.push(node.y || graphNode.data.y)
      }
    })
  })
  x = sum(xArry) / xArry.length
  y = sum(yAyy) / yAyy.length

  return {
    x: x + dx,
    y: y + dy
  }
}

// export const createEdge = (node, graph, position) => {
//   if (!graph) {
//     return {}
//   }
//   let newNode = {}
//   const sameTypeNodes = graph.getNodes().filter((item) => item.getData()?.type === type)
//   const typeName = PROCESSING_TYPE_LIST?.find((item) => item.type === type)?.name
//   const id = StringExt.uuid()
//   node = {
//     id,
//     shape: 'data-processing-dag-node',
//     x: position?.x,
//     y: position?.y,
//     data: {
//       name: `${typeName}_${sameTypeNodes.length + 1}`,
//       type
//     }
//   }
//   newNode = graph.addNode(node)
//   return newNode
// }

export default x6
