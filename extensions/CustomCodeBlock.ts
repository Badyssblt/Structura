// extensions/CustomCodeBlock.js

import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'

export const CustomCodeBlockLowlight = CodeBlockLowlight.extend({
    addNodeView() {
        return ({ editor, node, getPos }) => {
            const dom = document.createElement('div')
            dom.classList.add('relative', 'group')

            const pre = document.createElement('pre')
            const code = document.createElement('code')
            code.textContent = node.textContent
            pre.appendChild(code)

            const copyBtn = document.createElement('button')
            copyBtn.textContent = 'Copier'
            copyBtn.className =
                'absolute top-2 right-2 text-sm bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition'
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(code.textContent)
                copyBtn.textContent = 'Copié !'
                setTimeout(() => (copyBtn.textContent = 'Copier'), 1500)
            })

            dom.appendChild(pre)
            dom.appendChild(copyBtn)

            return {
                dom,
                contentDOM: code,
                update(updatedNode) {
                    if (updatedNode.type !== node.type) return false
                    code.textContent = updatedNode.textContent
                    return true
                },
            }
        }
    },
})
