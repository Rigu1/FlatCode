import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { translateText } from '../app/translateSlice';

const Translate: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('ko');
  const { translatedText, loading, error } = useSelector(
    (state: RootState) => state.translate,
  );

  const handleTranslate = () => {
    if (text.trim()) {
      const source = language;
      const target = language === 'ko' ? 'en' : 'ko';
      dispatch(translateText({ text, source, target }));
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <br />
      <div>
        <label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="ko">Korean to English</option>
            <option value="en">English to Korean</option>
          </select>
        </label>
      </div>
      <button onClick={handleTranslate}>Translate</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {translatedText && (
        <div>
          <h3>Translated Text</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Translate;
