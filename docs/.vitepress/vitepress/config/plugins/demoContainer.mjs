import fs from 'node:fs';
import path from 'node:path';

const docRoot = path.resolve(__dirname, '../../../..');

export default function createDemoContainerPlugin(md) {
  return {
    validate: function (params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    render: function (tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : '';
        const sourceFileToken = tokens[idx + 2];
        let source = '';
        const sourceFile = sourceFileToken.children?.[0].content ?? '';

        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(
            path.resolve(docRoot, 'components', `${sourceFile}.vue`),
            'utf-8'
          );
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`);

        // 渲染 Demo 容器
        return `
          <Demo 
            source="${encodeURIComponent(source)}"
            description="${encodeURIComponent(md.render(description))}"
          >
            <template #source><ep-${sourceFile.replaceAll('/', '-')}/></template>
        `;
      } else {
        return '</Demo>\n';
      }
    },
  };
}