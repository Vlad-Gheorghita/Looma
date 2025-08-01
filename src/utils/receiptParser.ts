import { BillItem } from "../types/billScanning/billItemType";

export interface ParsedReceiptData {
  items: BillItem[];
  total: string;
}

/**
 * Parses AI response text containing receipt data
 * Handles cleanup of markdown formatting and JSON parsing
 * @param responseText - Raw response text from AI
 * @returns Parsed receipt data with items and total
 * @throws Error if parsing fails
 */
export const parseReceiptResponse = (responseText: string | undefined): ParsedReceiptData => {
  if (!responseText) {
    throw new Error("No response text received from AI");
  }
  
  // Clean up the response - remove markdown code blocks and "json" keywords
  const cleanedText = responseText
    .replace(/```json\s*/g, '')
    .replace(/```\s*/g, '')
    .trim();
  
  let parsedResult;
  try {
    parsedResult = JSON.parse(cleanedText);
  } catch (error) {
    throw new Error(`Failed to parse receipt data: ${(error as Error).message}`);
  }
  
  // Extract items and total from the parsed result
  const items: BillItem[] = parsedResult.items || [];
  const total: string = parsedResult.total || "0.00";
  
  return { items, total };
};
