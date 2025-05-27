export type Setting = {
    key: string,
    value: Object
}

export type Settings = Setting[]

export type Page = {
    title: string,
    slug: string,
    parentId: number,
    parent: Page,
    subPages: Page[],
    content: string,
    order: number,
    createdAt: Date,
    updatedAt: Date,
    is_public: Boolean
}

export type Category = {
    name: string,
    pages: Page[]
}