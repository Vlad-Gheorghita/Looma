import { GenerateContentResponse, GoogleGenAI } from '@google/genai';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


type ImagePickerOptions = {
    alowsEditing?: boolean,
    aspectRatio?: [number, number],
    quality?: number,
    base64?: boolean
}

const ai = new GoogleGenAI({
    apiKey: Constants?.expoConfig?.extra?.gemini_api_key
});

const prompt = `You are an expert receipt data extractor.
                You will receive an image of a receipt, and your job is to extract all of the items and their prices from the receipt.
                
                Return ONLY a valid JSON object containing:
                - items: an array of items, each with:
                  - id: auto-generated sequential number starting from 1
                  - name: the item name from the receipt
                  - price: the price as a string (numbers only, no currency symbols)
                  - currency: always set to "RON"
                - total: the total price of the receipt as a string (numbers only, no currency symbols)
                
                Example format:
                {
                  "items": [
                    {"id": 1, "name": "Bread", "price": "5.50", "currency": "RON"},
                    {"id": 2, "name": "Milk", "price": "8.99", "currency": "RON"}
                  ],
                  "total": "14.49"
                }
                
                Return only the JSON object, no additional text or explanation.`;

export const pickImage = async (options?: ImagePickerOptions): Promise<ImagePicker.ImagePickerResult> => {
  const image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: options?.alowsEditing ?? true,
    aspect: options?.aspectRatio,
    quality: options?.quality ?? 1,
    base64: options?.base64 ?? true,
  });

  return image;
};

export const readRecipt = async (
  image: ImagePicker.ImagePickerSuccessResult
): Promise<GenerateContentResponse> => {
  const result = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: [
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: image.assets![0].base64!,
        },
      },
      {
        text: prompt,
      },
    ],
  });

  return result;
};
