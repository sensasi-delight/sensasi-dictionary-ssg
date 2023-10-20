import WordClassesEnum from './WordClassesEnum'

export default function isWordClass(
    wordClass: string,
): wordClass is WordClassesEnum {
    return Object.keys(WordClassesEnum).includes(wordClass)
}
