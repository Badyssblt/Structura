// CustomParagraph.ts
import { Paragraph } from '@tiptap/extension-paragraph'

export const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: null,
                parseHTML: element => element.getAttribute('class'),
                renderHTML: attributes => {
                    if (!attributes.class) {
                        return {}
                    }
                    return {
                        class: attributes.class,
                    }
                },
            },
        }
    },
})