import TextRecognition from 'react-native-text-recognition';

//TODO: Work in Progress

export const recognizeTextFromImage = async (uri: string): Promise<string> => {
  try {
    const result = await TextRecognition.recognize(uri);
    console.log('[OCR RESULT]', result);

    // Combine recognized lines into one string (simulate Tesseract behavior)
    return result.join('\n');
  } catch (error) {
    console.error('[OCR ERROR]', error);
    throw error;
  }
};

export const parseBillText = (rawText: string): { name: string; price: number }[] => {
  return rawText.split('\n')
    .map(line => {
      const match = line.match(/(.+?)\s+([\d]+\.\d{2})$/);
      if (match) {
        return {
          name: match[1].trim(),
          price: parseFloat(match[2]),
        };
      }
      return null;
    })
    .filter(Boolean) as { name: string; price: number }[];
};
