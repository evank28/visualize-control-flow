
export function countStartingSpaces(s: string): number {
    //  Gets index of first non-whitespace character
    return s.search(/\S/); 
}