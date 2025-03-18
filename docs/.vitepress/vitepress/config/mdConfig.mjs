import demoContainer from "./plugins/demoContainer.mjs"
import MarkdownItContainer from "markdown-it-container"

export default function (md){
  md.use(MarkdownItContainer, 'demo', demoContainer(md))
}