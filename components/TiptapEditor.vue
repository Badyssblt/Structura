<template>
  <div>
    <div v-if="editor" class="flex gap-2">
      <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
      >
        <Icon name="heroicons:bold" size="16px"/>
      </button>
      <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
      >
        <Icon name="heroicons:italic" size="16px"/>
      </button>
      <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
      >
        <Icon name="heroicons:strikethrough" size="16px"/>
      </button>
      <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
      >
        <Icon name="heroicons:code-bracket" size="16px"/>
      </button>
      <button
          @click="editor.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        <Icon name="ic:outline-local-parking" size="16px"/>

      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        <Icon name="heroicons:h1" size="16px"/>
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        <Icon name="heroicons:h2" size="16px"/>
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        <Icon name="heroicons:h3" size="16px"/>
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        <Icon name="heroicons:h4" size="16px"/>
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        <Icon name="heroicons:h5" size="16px"/>
      </button>
      <button
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        <Icon name="heroicons:h6" size="16px"/>

      </button>
      <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <Icon name="heroicons:list-bullet" size="16px"/>
      </button>
      <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        <Icon name="heroicons:numbered-list" size="16px"/>
      </button>
      <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        code block
      </button>
      <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
      >
        <Icon name="ic:baseline-undo" size="16px"/>

      </button>
      <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
      >
        <Icon name="ic:baseline-redo" size="16px"/>
      </button>
    </div>
    <TiptapEditorContent :editor="editor" class="border rounded p-2"/>
  </div>
</template>

<script setup>
import 'highlight.js/styles/github-dark.css';

const lowlight = createLowlight(allLanguages)

const editor = useEditor({
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [
    TiptapStarterKit.configure({
      codeBlock: false,
    }),
    TiptapCodeBlockLowlight.configure({ lowlight }),
  ],
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
}

.tiptap pre code {
  background: #0d1117;
  color: inherit;
  font-size: 0.8rem;
  padding: 10px;
  border-radius: 5px;
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
