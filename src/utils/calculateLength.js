/**
 * Calculates the length based on the specified type.
 *
 * @param {"char" | "word"} type - The type of length to calculate. Use "char" for character count and "word" for word count.
 * @param {string} text - The input text for which the length needs to be calculated.
 * @returns {number} - The calculated length based on the specified type.
 * @throws {Error} - Throws an error if an invalid type is provided.
 *
 * @example
 * // Character count example
 * const charCount = calculateLength("char", "Hello, World!");
 *
 * // Word count example
 * const wordCount = calculateLength("word", "This is a sample sentence.");
 */
export default function calculateLength(type, text) {
  switch (type) {
    case "char":
      return text.length;

    case "word": {
      const trimmedText = text.trim();

      if (trimmedText === "") return 0;

      const words = trimmedText.split(/\s+/);
      return words.length;
    }

    default:
      throw new Error(`Invalid type: ${type}`);
  }
}
