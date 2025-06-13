
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("APIキーが設定されていません。");
      return res.status(500).json({ message: 'サーバー設定エラー: APIキーがありません。' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = "今日の運勢を占う、ポジティブで短い一言を生成してください。";

    const apiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: {
        // 高品質な応答を得るために thinkingConfig はデフォルト（有効）のままにします。
        // temperature: 0.7, // 必要に応じて調整
      }
    });
    
    const fortuneText = apiResponse.text;

    if (!fortuneText || fortuneText.trim() === "") {
      console.error("Gemini APIから空のメッセージが返されました。");
      return res.status(500).json({ message: 'メッセージの生成に失敗しました。モデルから有効な応答がありません。' });
    }

    return res.status(200).json({ fortune: fortuneText.trim() });

  } catch (error) {
    console.error('Gemini API呼び出し中にエラーが発生しました:', error);
    let errorMessage = '占いメッセージの生成中に内部サーバーエラーが発生しました。';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    // エラーレスポンスに詳細情報を含める場合は注意してください（例：APIキー漏洩など）
    return res.status(500).json({ message: '占いメッセージの取得に失敗しました。', error: errorMessage });
  }
}
