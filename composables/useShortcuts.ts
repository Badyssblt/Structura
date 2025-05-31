type Shortcut = {
    keys: string[],
    handler: () => void
}

const normalizeKey = (key: string) => key.toLowerCase()

export function useShortcuts(shortcuts: Shortcut[]){
    const handleKeydown = (e: KeyboardEvent) => {
        const pressedKeys = new Set<string>()

        if (e.ctrlKey) pressedKeys.add('ctrl')
        if (e.metaKey) pressedKeys.add('meta')
        if (e.altKey) pressedKeys.add('alt')
        if (e.shiftKey) pressedKeys.add('shift')

        pressedKeys.add(normalizeKey(e.key))

        for (const shortcut of shortcuts) {
            const keys = new Set(shortcut.keys.map(normalizeKey))
            if (keys.size === pressedKeys.size && [...keys].every(k => pressedKeys.has(k))) {
                e.preventDefault()
                shortcut.handler()
                break
            }
        }
    }

    onMounted(() => {
        window.addEventListener('keydown', handleKeydown)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleKeydown)
    })
}