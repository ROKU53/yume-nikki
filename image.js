export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    // まずClaudeで夢の内容を画像生成用の英語プロンプトに変換
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `以下の夢の内容を、DALL-E 3で美しい幻想的な絵画を生成するための英語プロンプトに変換してください。
スタイルは「dreamy, surreal, watercolor painting, soft light, mystical atmosphere」を必ず含めてください。
プロンプトのみ返してください（説明不要）。

夢の内容：${prompt}`
        }]
      })
    });

    const claudeData = await claudeRes.json();
    const imagePrompt = claudeData.content?.[0]?.text || prompt;

    // DALL-E 3で画像生成
    const dalleRes = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'standard',
      })
    });

    const dalleData = await dalleRes.json();

    if (dalleData.error) {
      throw new Error(dalleData.error.message);
    }

    res.status(200).json({
      imageUrl: dalleData.data[0].url,
      prompt: imagePrompt
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || '画像生成に失敗しました' });
  }
}
