
import React, { useState, useCallback } from 'react';
import Button from './components/Button';
import FortuneMessage from './components/FortuneMessage';

const App: React.FC = () => {
  const [currentFortune, setCurrentFortune] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFortuneClick = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setCurrentFortune(null); 

    try {
      const response = await fetch('/api/generateFortune');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'APIからエラー応答がありましたが、詳細の解析に失敗しました。' }));
        throw new Error(errorData.message || `サーバーエラー: ${response.status}`);
      }
      const data = await response.json();
      if (data.fortune) {
        setCurrentFortune(data.fortune);
      } else {
        throw new Error('APIから有効な占いメッセージが返されませんでした。');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('不明なエラーが発生しました。');
      }
      console.error("占いメッセージの取得に失敗しました:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 text-gray-800 p-4 selection:bg-indigo-200 selection:text-indigo-800">
      <main className="bg-white shadow-2xl rounded-xl p-8 md:p-12 text-center space-y-8 w-full max-w-md">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-700">
            今日の気分は？
          </h1>
        </header>
        
        <Button 
          onClick={handleFortuneClick} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-3 px-8 rounded-lg shadow-lg focus:ring-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? '生成中...' : '占う！'}
        </Button>
        
        <FortuneMessage message={currentFortune} />
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative" role="alert">
            <strong className="font-bold">エラー: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
      </main>
      <footer className="absolute bottom-4 text-center w-full text-gray-700 text-sm">
        <p>AI気分占い &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
