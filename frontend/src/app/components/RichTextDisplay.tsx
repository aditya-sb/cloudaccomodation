import React from 'react';
import styles from './RichTextDisplay.module.css';

interface RichTextDisplayProps {
  content: string;
  className?: string;
}

const RichTextDisplay: React.FC<RichTextDisplayProps> = ({ content, className = '' }) => {
  if (!content) return null;

  return (
    <div
      className={`${styles['rich-text-content']} ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default RichTextDisplay;
