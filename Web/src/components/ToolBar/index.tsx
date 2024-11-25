import { Editor } from '@tiptap/react';
import { FC } from 'react';
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaBold, FaCode, FaHeading, FaItalic, FaLink, FaListOl, FaListUl, FaParagraph, FaQuoteLeft, FaStrikethrough, FaUnderline } from 'react-icons/fa';
import { ToolbarButton } from './styles';

interface ToolbarProps {
    editor: Editor | null;
}

export const Toolbar: FC<ToolbarProps> = ({ editor }) => {
    if (!editor) return null;

    // Prevent form submission on button clicks
    const preventSubmit = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent form submit
        event.stopPropagation(); // Stop event from propagating
    };

    return (
        <div>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().toggleBold().run();
                }}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <FaBold />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().toggleItalic().run();
                }}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <FaItalic />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().toggleUnderline().run();
                }}
                className={editor.isActive('underline') ? 'is-active' : ''}
            >
                <FaUnderline />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().toggleStrike().run();
                }}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <FaStrikethrough />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().toggleCode().run();
                }}
                className={editor.isActive('code') ? 'is-active' : ''}
            >
                <FaCode />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().setParagraph().run();
                }}
            >
                <FaParagraph />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                }}
            >
                <FaHeading />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
            >
                <FaHeading />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().toggleBulletList().run();
                }}
            >
                <FaListUl />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().toggleOrderedList().run();
                }}
            >
                <FaListOl />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().toggleBlockquote().run();
                }}
            >
                <FaQuoteLeft />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().setLink({ href: 'https://example.com' }).run();
                }}
            >
                <FaLink />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().setTextAlign('left').run();
                }}
                className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
            >
                <FaAlignLeft />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().setTextAlign('center').run();
                }}
                className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
            >
                <FaAlignCenter />
            </ToolbarButton>
            <ToolbarButton
                type="button"
                onClick={(event) => {
                    preventSubmit(event);
                    editor.chain().focus().setTextAlign('right').run();
                }}
                className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
            >
                <FaAlignRight />
            </ToolbarButton>
        </div>
    );
};
