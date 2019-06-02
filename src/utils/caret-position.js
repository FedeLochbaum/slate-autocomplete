const position = () => {
  if (document.selection) {
    const range = document.selection.createRange()
    return { top: range.offsetTop, left: range.offsetLeft }
  } else if (window.getSelection) {
    const { top, left, width } = window.getSelection().getRangeAt(0).getBoundingClientRect()

    return { top, left: left + width }
  } else {
    return { top: 0, left: 0 }
  }
}

export default position
