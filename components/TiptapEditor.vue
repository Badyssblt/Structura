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
      <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
        <Icon name="material-symbols:link" size="16px"/>
      </button>
      <button @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">
        <Icon name="ion:unlink" size="16px"/>
      </button>
      <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'bg-primary': editor.isActive('codeblock') }"
          class="flex items-center p-1 rounded"
      >
        <Icon name="material-symbols:code-rounded" size="16px" />
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
      <button type="button" @click="editor.chain().focus().insertFunctionBlock({
          name: 'getUser',
          params: 'id: string',
          returnType: 'User',
          description: 'Récupère un utilisateur par son ID.'
        }).run()">
        <Icon name="hugeicons:function" size="16px"/>
      </button>
      <button type="button" @click="editor.chain().focus().insertWarningBlock().run()">
        <Icon name="material-symbols:warning-rounded" size="16px"/>
      </button>
      <button type="button" @click="editor.chain().focus().setHorizontalRule().run()">
        <Icon name="material-symbols:horizontal-rule-rounded" size="16px"/>
      </button>

    </div>
    <bubble-menu
        :editor="editor"
        :tippy-options="{ duration: 100 }"
        v-if="editor"
    >
      <div class="bg-white p-4 flex gap-4 border rounded-lg">
        <button type="button" @click="editor.chain().focus().toggleBold().run()" class="flex items-center p-1 rounded" :class="{ 'bg-primary': editor.isActive('bold') }">
          <Icon name="heroicons:bold" size="20px" :class="{ 'text-white': editor.isActive('bold') }"/>
        </button>
        <button type="button" @click="editor.chain().focus().toggleItalic().run()" class="flex items-center p-1 rounded" :class="{ 'bg-primary': editor.isActive('italic') }">
          <Icon name="heroicons:italic" size="16px" :class="{ 'text-white': editor.isActive('italic') }"/>
        </button>
        <button type="button" @click="editor.chain().focus().toggleStrike().run()" class="flex items-center p-1 rounded" :class="{ 'bg-primary': editor.isActive('strike') }">
          <Icon name="heroicons:strikethrough" size="16px" :class="{ 'text-white': editor.isActive('strike') }"/>
        </button>
        <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
          <Icon name="material-symbols:link" size="16px"/>
        </button>
        <button @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">
          <Icon name="ion:unlink" size="16px"/>
        </button>
      </div>
    </bubble-menu>
    <TiptapEditorContent :editor="editor" class="border rounded p-2 min-h-screen"/>
  </div>
</template>

<script setup>
import { FunctionBlock } from '~/extensions/FunctionExtension.js'
import {CustomParagraph} from "~/extensions/CustomParagraph.js";
import {WarningBlock} from "~/extensions/WarningBlock.js";
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Dropcursor from '@tiptap/extension-dropcursor'
import { BubbleMenu } from '@tiptap/vue-3'
import {CustomCodeBlockLowlight} from "~/extensions/CustomCodeBlock.js";
import { all, createLowlight } from 'lowlight'
import Link from '@tiptap/extension-link'
import {CustomHeading} from "~/extensions/CustomHeading.js";

const lowlight = createLowlight(all)

const model = defineModel()


const editor = useEditor({
  content: model.value,
  extensions: [
    TiptapStarterKit.configure({
      codeBlock: false,
      paragraph: false,
      heading: false
    }),
      CustomHeading,
    CustomCodeBlockLowlight.configure({ lowlight }),
      FunctionBlock,
      CustomParagraph,
      WarningBlock,
    HorizontalRule,
    Link.configure({
      openOnClick: false,
      defaultProtocol: 'https',
    }),
    Dropcursor,
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none',
    },
  },
  onUpdate({ editor }){
    model.value = editor.getHTML()
  }
});


const setLink = () =>  {
  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.value
        .chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run()

    return
  }

  // update link
  editor.value
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run()
}


onBeforeUnmount(() => {
  unref(editor).destroy();
});



</script>


