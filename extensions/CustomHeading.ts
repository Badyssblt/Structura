// ~/extensions/CustomHeading.js
import { Heading } from '@tiptap/extension-heading'
import { v4 as uuidv4 } from 'uuid'

export const CustomHeading = Heading.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            id: {
                default: null,
                parseHTML: element => element.getAttribute('id'),
                renderHTML: attributes => {
                    if (!attributes.id) {
                        return {}
                    }
                    return {
                        id: attributes.id,
                    }
                },
            },
        }
    },

    addCommands() {
        return {
            ...this.parent?.(),
            toggleHeading:
                (attributes) =>
                    ({ commands }) => {
                        return commands.toggleNode(this.name, 'paragraph', {
                            ...attributes,
                            id: uuidv4(), // ⬅️ Ajoute un ID unique à chaque création
                        })
                    },
        }
    },
})
