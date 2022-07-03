import { Editor, RichTextEditor as MantineRte } from '@mantine/rte';
import { FC, useEffect, useRef } from 'react';
import { InputWrapper } from '@mantine/core';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  readOnly?: boolean;
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
  value,
  onChange,
  error,
  label,
  readOnly,
}) => {
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    if (!readOnly) return;
    editorRef?.current?.editor?.setText('');
    editorRef?.current?.editor?.pasteHTML(0, value);
  }, [value, readOnly]);

  return (
    <InputWrapper error={error} label={label}>
      <MantineRte
        ref={editorRef}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        controls={[
          ['bold', 'strike', 'italic', 'underline', 'clean'],
          ['alignLeft', 'alignCenter', 'alignRight'],
          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          ['blockquote', 'unorderedList', 'orderedList'],
          ['sup', 'sub'],
        ]}
      />
    </InputWrapper>
  );
};
