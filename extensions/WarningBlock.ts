import { Node, mergeAttributes } from '@tiptap/core'

export const WarningBlock = Node.create({
    name: 'warningBlock',
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
                    'bg-amber-400/30 border border-yellow-500 rounded-xl p-4 text-yellow-700',
            }),
            0,
        ]
    },

    addCommands() {
        return {
            insertWarningBlock:
                () =>
                    ({ state, chain, commands }) => {
                        const { from, to } = state.selection
                        const hasSelection = from !== to

                        if (hasSelection) {
                            return commands.wrapIn(this.name)
                        }

                        return chain()
                            .focus()
                            .insertContent({
                                type: this.name,
                                content: [
                                    {
                                        type: 'paragraph',
                                        attrs: { class: 'text-yellow-700' },
                                        content: [],
                                    },
                                ],
                            })
                            .run()
                    },
        }
    },

})
