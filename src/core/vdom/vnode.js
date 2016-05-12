export default function VNode (tag, data, children, text, elm, ns, context) {
  return {
    tag,
    data,
    children,
    text,
    elm,
    ns,
    context,
    key: data && data.key,
    setChildren
  }
}

export const emptyVNode = VNode(undefined, undefined, undefined, '')

function setChildren (children) {
  this.children = children
}
