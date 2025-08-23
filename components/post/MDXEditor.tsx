"use client";

import { MDXEditor } from "@mdxeditor/editor";
import {
	headingsPlugin,
	listsPlugin,
	quotePlugin,
	thematicBreakPlugin,
	markdownShortcutPlugin,
	linkPlugin,
	linkDialogPlugin,
	imagePlugin,
	tablePlugin,
	codeBlockPlugin,
	codeMirrorPlugin,
	diffSourcePlugin,
	frontmatterPlugin,
	toolbarPlugin,
	UndoRedo,
	BoldItalicUnderlineToggles,
	Separator,
	BlockTypeSelect,
	ListsToggle,
	CreateLink,
	InsertImage,
	InsertTable,
	InsertThematicBreak,
	CodeToggle,
	InsertCodeBlock,
	type MDXEditorMethods,
} from "@mdxeditor/editor";
import { forwardRef } from "react";
import "@mdxeditor/editor/style.css";

// Import CodeMirror language packages
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { json } from "@codemirror/lang-json";
import { markdown as markdownLang } from "@codemirror/lang-markdown";
import { python } from "@codemirror/lang-python";
import { sql } from "@codemirror/lang-sql";

type MDXEditorProps = {
	markdown: string;
	onChange: (markdown: string) => void;
	placeholder?: string;
	readOnly?: boolean;
};

/**
 * 📝 Rich MDX Editor with comprehensive formatting features
 *
 * @param markdown - The markdown content
 * @param onChange - Callback when content changes
 * @param placeholder - Placeholder text
 * @param readOnly - Whether the editor is read-only
 */
const MDXEditorComponent = forwardRef<MDXEditorMethods, MDXEditorProps>(
	({ markdown, onChange, placeholder, readOnly = false }, ref) => {
		return (
			<div className="mdx-editor-wrapper">
				<MDXEditor
					ref={ref}
					markdown={markdown}
					onChange={onChange}
					placeholder={placeholder}
					readOnly={readOnly}
					plugins={[
						// Core editing plugins
						headingsPlugin(),
						listsPlugin(),
						quotePlugin(),
						thematicBreakPlugin(),
						markdownShortcutPlugin(),

						// Link and image plugins
						linkPlugin(),
						linkDialogPlugin(),
						imagePlugin({
							imageUploadHandler: async (image) => {
								// TODO: Implement image upload to your storage service
								// For now, return a placeholder URL
								return Promise.resolve(`/api/images/${image.name}`);
							},
						}),

						// Table plugin
						tablePlugin(),

						// Code plugins
						codeBlockPlugin({
							defaultCodeBlockLanguage: "javascript",
						}),
						codeMirrorPlugin({
							codeBlockLanguages: {
								javascript: "JavaScript",
								typescript: "TypeScript",
								jsx: "JSX",
								tsx: "TSX",
								python: "Python",
								java: "Java",
								css: "CSS",
								html: "HTML",
								json: "JSON",
								markdown: "Markdown",
								bash: "Bash",
								sql: "SQL",
							},
							// Use the imported language packages for syntax highlighting
							autoLoadLanguageSupport: true,
							codeMirrorExtensions: [
								javascript({ jsx: true, typescript: true }),
								css(),
								html(),
								json(),
								markdownLang(),
								python(),
								sql(),
							],
						}),

						// Advanced features
						diffSourcePlugin(),
						frontmatterPlugin(),

						// Toolbar configuration
						toolbarPlugin({
							toolbarContents: () => (
								<>
									{/* Undo/Redo */}
									<UndoRedo />
									<Separator />

									{/* Text formatting */}
									<BoldItalicUnderlineToggles />
									<CodeToggle />
									<Separator />

									{/* Block types */}
									<BlockTypeSelect />
									<Separator />

									{/* Lists */}
									<ListsToggle />
									<Separator />

									{/* Links and media */}
									<CreateLink />
									<InsertImage />
									<Separator />

									{/* Tables and blocks */}
									<InsertTable />
									<InsertThematicBreak />
									<InsertCodeBlock />
								</>
							),
						}),
					]}
					className="prose prose-slate dark:prose-invert max-w-none min-h-[300px] p-4 border rounded-lg focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary"
				/>
			</div>
		);
	}
);

MDXEditorComponent.displayName = "MDXEditor";

export { MDXEditorComponent as MDXEditor };
