<template>
  <div class="container">
    <div id="container"></div>
    <div v-if="contextmenu.show" class="popup-container"
      :style="{ left: contextmenu.x + 'px', top: contextmenu.y + 'px' }">
      <popup1 :menu="menus" @onChange="onChange"></popup1>
    </div>
    <div v-if="tool.show" class="tool" :style="{ top: tool.y, left: tool.x }">
      <a-list size="small" bordered>
        <a-list-item v-for="(item, index) in tool.menu" :key="item.label + index" @click="onChangeTools(item, index)">
          {{ item.label }}
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import { Graph, Edge as BaseEdge } from '@antv/x6'
import { Selection } from '@antv/x6-plugin-selection'
// import { Dropdown } from 'ant-design-vue'
import { getDownstreamNodePosition, getMidelNodesPosition } from './utils'
import mock from './mock.json'
import { menu, nodes, tools } from './config'
// import { h } from 'vue'
import popup1 from './popup.vue'
export default {
  name: 'ant-x6',
  components: {
    popup1,
    // sDialog
  },
  data() {
    return {
      selected: '',
      selectedIdArr: [],
      menus: [...menu],
      graph: null,
      mocks: { ...mock },
      value: '',
      contextmenu: {
        show: false,
        x: '',
        y: '',
        node: null
      },
      tool: {
        show: false,
        x: '',
        y: '',
        menu: [...tools]
      },
      treeData: {
        // 节点
        nodes: [],
        // 边
        edges: []
      },
    }
  },
  methods: {
    node(type) {
      let node = 'node-2'
      for (let i = 0; i < nodes.length; i++) {
        const item = nodes[i]
        if (type === item.value) {
          node = item.shape
          break
        }
      }
      return node
    },
    onChangeTools(item, index) {
      console.log(item, index)
      console.log(this.selectedIdArr)
      this.addSummaryNode(this.selectedIdArr, this.graph, { label: 'test' })
    },
    onChange(item) {
      console.log(item)
      this.contextmenu.show = false
      const data = {
        label: 'test'
      }
      this.addChildrenNode(this.contextmenu.node, data, this.graph)
    },
    addChildrenNode(nodex, data, graph) {
      if (!graph) return
      const postion = getDownstreamNodePosition(nodex, graph)
      const id = `node${this.mocks.nodes.length + 1}`
      const node = {
        id: id,
        shape: 'rect',
        x: postion.x,
        y: postion.y,
        width: 100,
        height: 40,
        label: data.label,
        data: {
          ...data
        }
      }
      const edge = {
        shape: 'edge1',
        source: nodex.id,
        target: id
      }
      if (node && edge) {
        graph.addNode(node)
        graph.addEdge(edge)
        this.mocks.nodes.push(node)
        this.mocks.edges.push(edge)
      }
    },
    async addSummaryNode(nodes, graph, data) {
      const postion = await getMidelNodesPosition(this.mocks.nodes, nodes, graph)
      const id = `node-Summary${postion.y}`
      const node = {
        id: id,
        shape: 'rect',
        x: postion.x,
        y: postion.y,
        width: 100,
        height: 40,
        label: data.label,
        data: {
          ...data,
          x: postion.x,
          y: postion.y,
        }
      }
      graph.addNode(node)
      this.mocks.nodes.push(node)
      nodes.forEach((graphNode) => {
        const edge = {
          id: `${graphNode.id}-${id}`,
          shape: 'edge1',
          source: graphNode.id,
          target: id
        }
        graph.addEdge(edge)
        this.mocks.edges.push(edge)
      })
      nodes.forEach((graphNode, index) => {
        graph.getEdges().forEach(nodex => {
          console.log(graphNode, nodex)
          if (nodex.id === graphNode.id) {
            if (index !== 0 || index !== nodes.length - 1) {
              nodex.visible = false
              console.log(nodex)
            }
          }
        })
      })
    },
    init() {

      class Edge extends BaseEdge {
        // 省略实现细节
      }
      Edge.config({
        markup: [
          {
            tagName: 'path',
            selector: 'wrap',
            attrs: {
              fill: 'none',
              cursor: 'pointer',
              stroke: 'transparent',
              strokeLinecap: 'round',
            },
          },
          {
            tagName: 'path',
            selector: 'line',
            attrs: {
              fill: 'none',
              pointerEvents: 'none',
            },
          },
        ],
        attrs: {
          wrap: {
            connection: true,
            strokeWidth: 10,
            strokeLinejoin: 'round',
          },
          line: {
            connection: true,
            stroke: '#696961',
            strokeWidth: 2,
            strokeLinejoin: 'round',
            targetMarker: '',
          },
        },
      })


      const graph = new Graph({
        container: document.getElementById('container'),
        width: '100%',
        height: '100%',
        snap: true,
        enabled: true,
        grid: { visible: true },
        connecting: {
          anchor: 'orth',
          connector: 'rounded',
          connectionPoint: 'boundary',
          router: {
            name: 'er',
            args: {
              offset: 24,
              direction: 'H'
            }
          }
        },
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl', 'meta']
        }
      })
      graph.use(
        new Selection({
          enabled: true,
          // multiple: true,
          rubberband: true,
          // movable: true,
          showNodeSelectionBox: true,
          className: 'test'
        })
      )
      Graph.registerEdge('edge1', Edge)
      graph.fromJSON(this.mocks) // 渲染元素
      // graph.centerContent() // 居中显示
      this.graph = graph
      console.log(graph)
      const _this = this
      graph.on('selection:changed', ({ selected }) => {
        if (selected.length === 0) return
        const parent = document.getElementsByClassName('test')[0]
        const selectInner = parent.getElementsByClassName('x6-widget-selection-inner')[0]
        _this.tool.y = parseInt(selectInner.style.top) - 50 + 'px'
        _this.tool.x = selectInner.style.left
        _this.tool.show = true
        console.log(selected)
        _this.selected = null
        _this.selected = selected
        // for (let i = 0; i < selected.length; i++) {
        //   const item = selected[i]
        //   _this.selectedIdArr.push(item)
        // }
        _this.selectedIdArr = selected
      })
      graph.on('node:contextmenu', ({ e, node }) => {
        console.log(e)
        console.log(node)
        _this.contextmenu.node = node
        _this.contextmenu.x = e.clientX - 10
        _this.contextmenu.y = e.clientY - 60
        _this.contextmenu.show = true
      })
      // graph.on('blank:click', () => {
      //   console.log(111)
      // })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
/deep/ .test>.x6-widget-selection-box {
  width: 40px !important;
  height: 40px !important;
}

/deep/ .test>.x6-widget-selection-inner {
  width: 45px !important;
  border: none;
  box-shadow: none;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;

  #container {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .popup-container {
    position: absolute;
    z-index: 99999;
  }

  .tool {
    position: absolute;
    background: white;
    cursor: pointer;
  }
}
</style>
