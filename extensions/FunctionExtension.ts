// FunctionBlock.ts
import { Node, mergeAttributes } from '@tiptap/core'

export const FunctionBlock = Node.create({
    name: 'functionBlock',
    group: 'block',
    content: 'block+',

    parseHTML() {
        return [
            {
                tag: 'div.function-block',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, {
                class:
                    'function-block',
            }),
            0,
        ]
    },

    addCommands() {
        return {
            insertFunctionBlock:
                () =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            content: [
                                {
                                    type: 'paragraph',
                                    attrs: { class: 'function-name font-bold text-xl' },
                                    content: [{ type: 'text', text: 'Nom de la fonction (args...): returnType' }],
                                },
                                {
                                    type: 'paragraph',
                                    attrs: { class: 'text-sm opacity-60 border-b pb-6' },
                                    content: [{ type: 'text', text: 'Une courte description de votre fonction' }],
                                },
                            ],
                        })
                    },
        }
    },
})