export type StringOp = (str: string) => string;
export interface TransformerStep {
    id: string;
    label: string;
    action: StringOp;
}

export function s_toUpperCase(str: string): string {
    const output = str.toUpperCase();
    return output;
}
export function s_toLowerCase(str: string): string {
    const output = str.toLowerCase();
    return output;
}
export function s_toTitleCase(str: string): string {
    const rec = (s: string) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
    const output = str.split(" ").map(rec).join(" ");
    return output;
}
export function s_reverse(str: string): string {
    const output = str.split('').reverse().join('');
    return output;
}
export function s_removeWhiteSpace(str: string) {
    const output = str.replaceAll(" ", "");
    return output;
}
export function s_slugify(str: string) {
    const output = (
        str.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
    );
    return output;

}
function words(str: string) {
    return str
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .toLowerCase()
        .match(/[a-z0-9]+/g) || [];
}

export function s_toCamelCase(str: string) {
    const output = words(str);
    return output
        .map((word, i) =>
            i === 0
                ? word
                : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");
}
export function s_toSnakeCase(str: string) {
    return words(str).join("_");
}

export function s_toKebabCase(str: string) {
    return words(str).join("-");
}

export function s_toPascalCase(str: string) {
    const output = words(str);
    return output
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");
}
export function s_toConstantCase(str: string) {
    return words(str)
        .join("_")
        .toUpperCase();
}
export function s_toPathCase(str: string) {
    return words(str).join("/");
}
export function s_toDotCase(str: string) {
    return words(str).join(".");
}
export function s_toHeaderCase(str: string) {
    const output = words(str);
    return output
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("-");
}
export function s_toSentenceCase(str: string) {
    const output = words(str);
    if (output.length === 0) return "";

    const sentence = output.join(" ");
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
export function s_swapCase(str: string) {
    return str
        .split("")
        .map(char =>
            char === char.toUpperCase()
                ? char.toLowerCase()
                : char.toUpperCase()
        )
        .join("");
}
export function s_toFlatCase(str: string) {
    return words(str).join("");
}
export function s_toUpperFlatCase(str: string) {
    return words(str)
        .join("")
        .toUpperCase();
}
export function s_countWords(str: string) {
    return words(str).length.toString()
}

export function s_len(str: string) {
    return str.length.toString()
}

export function s_countVowels(str: string) {
    const output = {
        length: 0,
        vowelsFound: []
    };
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    for (let i = 0; i < str.length; ++i) {
        if (vowels.includes(str[i])) {
            output.length += 1;
            output.vowelsFound.push(str[i])
        }
    }
    return `${output.length} - [${output.vowelsFound}]`;
}

export function s_alternatingCaps(str: string) {
    const isFirstLetterLower = str[0].toLowerCase() === str[0];
    return str.split("").map((c, i) => {
        if (isFirstLetterLower) {
            if (i % 2 !== 0) return c.toUpperCase();
            return c.toLowerCase();
        }
        else {
            if (i % 2 === 0) return c.toUpperCase();
            return c.toLowerCase();
        }
    }).join("")
}

export function s_randomCase(str: string) {
    return str.split("").map((c, i) => Math.random() > 0.5 ? c.toLowerCase() : c.toUpperCase()).join("")
}

export function s_extractEmail(str: string) {
    const matches = str.match(
        /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi
    );
    return (matches || []).join("\n");
}

export function s_extractAllUrls(str: string): string {
    const regex = /\b(?:https?|ftp):\/\/[^\s<>"']+[^\s<>"'.,!?]/gi;
    const matches = str.match(regex);
    return (matches || []).join("\n");
}




export const availableStringOps: Record<string, StringOp> = Object.freeze({
    'upper_case': s_toUpperCase,
    'lower_case': s_toLowerCase,
    'title_case': s_toTitleCase,
    'sentence_case': s_toSentenceCase,
    '!!reverse': s_reverse,
    'Remove Spaces': s_removeWhiteSpace,
    'Swap Case': s_swapCase,

    'slug': s_slugify,

    'camel_case': s_toCamelCase,
    'pascal_case': s_toPascalCase,
    'snake_case': s_toSnakeCase,
    'constant_case': s_toConstantCase,
    'kebab_case': s_toKebabCase,
    'dot_case': s_toDotCase,
    'path_case': s_toPathCase,
    'header_case': s_toHeaderCase,
    'flat_case': s_toFlatCase,
    'upper_flat_case': s_toUpperFlatCase,

    '!!Count Words': s_countWords,
    '!!Length': s_len,
    '!!Count Vowels': s_countVowels,
    'Alternating Case': s_alternatingCaps,
    'Random Case': s_randomCase,
    '!!Extract Email': s_extractEmail,
    '!!Extract URLs': s_extractAllUrls,


});
