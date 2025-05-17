<template>
  <div>
    <div v-if="editor" class="flex gap-2">
      <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'bg-primary': editor.isActive('bold') }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="heroicons:bold" size="20px" :class="{ 'text-white': editor.isActive('bold') }"/>

      </button>
      <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'bg-primary': editor.isActive('italic') }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="heroicons:italic" size="16px" :class="{ 'text-white': editor.isActive('italic') }"/>
      </button>
      <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'bg-primary': editor.isActive('strike') }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="heroicons:strikethrough" size="16px" :class="{ 'text-white': editor.isActive('strike') }"/>
      </button>
      <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'bg-primary': editor.isActive('code') }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="heroicons:code-bracket" size="16px" :class="{ 'text-white': editor.isActive('code') }"/>
      </button>
      <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'bg-primary': editor.isActive('paragraph') }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="ic:outline-local-parking" size="16px" :class="{ 'text-white': editor.isActive('paragraph') }"/>

      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'bg-primary': editor.isActive('heading', { level: 1 }) }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="heroicons:h1" size="16px" :class="{ 'text-white': editor.isActive('heading', { level: 1 }) }"/>
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'bg-primary': editor.isActive('heading', { level: 2 }) }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="heroicons:h2" size="16px" :class="{ 'text-white': editor.isActive('heading', { level: 2 }) }"/>
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'bg-primary': editor.isActive('heading', { level: 3 }) }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="heroicons:h3" size="16px" :class="{ 'text-white': editor.isActive('heading', { level: 3 }) }"/>
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'bg-primary': editor.isActive('heading', { level: 4 }) }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="heroicons:h4" size="16px" :class="{ 'text-white': editor.isActive('heading', { level: 4 }) }"/>
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'bg-primary': editor.isActive('heading', { level: 5 }) }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="heroicons:h5" size="16px" :class="{ 'text-white': editor.isActive('heading', { level: 5 }) }"/>
      </button>
      <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'bg-primary': editor.isActive('bulletlist') }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="heroicons:list-bullet" size="16px" :class="{ 'text-white': editor.isActive('bulletlist') }"/>
      </button>
      <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'bg-primary': editor.isActive('orderedlist') }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="heroicons:numbered-list" size="16px" :class="{ 'text-white': editor.isActive('orderedlist') }"/>
      </button>
      <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'bg-primary': editor.isActive('codeblock') }"
          class="flex items-center p-1 rounded"
      >
        code block
      </button>
      <button
          @click="editor.chain().focus().undo().run()"
          :class="{ 'bg-primary': editor.isActive('undo') }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="ic:baseline-undo" size="16px" :class="{ 'text-white': editor.isActive('undo') }"/>

      </button>
      <button
          @click="editor.chain().focus().redo().run()"
          :class="{ 'bg-primary': editor.isActive('redo') }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="ic:baseline-redo" size="16px" :class="{ 'text-white': editor.isActive('redo') }"/>
      </button>
    </div>
    <TiptapEditorContent :editor="editor" class="border rounded p-2 min-h-screen"/>
  </div>
</template>

<script setup>
import 'highlight.js/styles/github-dark.css';

const lowlight = createLowlight(allLanguages)
const model = defineModel()


const editor = useEditor({
  content: model.value,
  extensions: [
    TiptapStarterKit.configure({
      codeBlock: false,
    }),
    TiptapCodeBlockLowlight.configure({ lowlight }),
  ],
  onUpdate({ editor }){
    model.value = editor.getHTML()
  }
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});



</script>

<style>

.tiptap h1 {
  font-size: 24px;
}

.tiptap h2 {
  font-size: 20px;
}

.tiptap h3 {
  font-size: 18px;
}

.tiptap pre code {
  font-family: Inter, serif !important;
}
.tiptap:focus {
  outline: none;
}

.tiptap pre {
  border-radius: 0.5rem;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
  background: #0d1117;
}

.tiptap code {
  color: inherit;
  font-size: 0.8rem;
  padding: 10px;
  border-radius: 5px;
  color: white;
}

/* Code styling */
.tiptap pre .hljs-comment,
.tiptap pre .hljs-quote {
  color: #616161;
}

.tiptap pre .hljs-variable,
.tiptap pre .hljs-template-variable,
.tiptap pre .hljs-attribute,
.tiptap pre .hljs-tag,
.tiptap pre .hljs-name,
.tiptap pre .hljs-regexp,
.tiptap pre .hljs-link,
.tiptap pre .hljs-selector-id,
.tiptap pre .hljs-selector-class {
  color: #f98181;
}

.tiptap pre .hljs-number,
.tiptap pre .hljs-meta,
.tiptap pre .hljs-built_in,
.tiptap pre .hljs-builtin-name,
.tiptap pre .hljs-literal,
.tiptap pre .hljs-type,
.tiptap pre .hljs-params {
  color: #fbbc88;
}

.tiptap pre .hljs-string,
.tiptap pre .hljs-symbol,
.tiptap pre .hljs-bullet {
  color: #b9f18d;
}

.tiptap pre .hljs-title,
.tiptap pre .hljs-section {
  color: #faf594;
}

.tiptap pre .hljs-keyword,
.tiptap pre .hljs-selector-tag {
  color: #70cff8;
}

.tiptap pre .hljs-emphasis {
  font-style: italic;
}

.tiptap pre .hljs-strong {
  font-weight: 700;
}

.tiptap li {
  list-style-type: disc;
  margin-left: 2rem;
}

</style>
