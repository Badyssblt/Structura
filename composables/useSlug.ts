export const useSlug = (text: string): string => {
    if (!text) return '';

    let slug = text.toLowerCase();

    slug = slug.replace(/\s+/g, '-');

    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");  // Supprimer les accents
    slug = slug.replace(/[^a-z0-9\-]/g, '');  // Supprimer les caractères non alphabétiques et non numériques
    slug = slug.replace(/-+/g, '-');  // Remplacer plusieurs tirets consécutifs par un seul

    slug = slug.replace(/^-+|-+$/g, '');

    return slug;
};
