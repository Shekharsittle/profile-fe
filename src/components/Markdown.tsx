import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders markdown text (as streamed from the AI backend) into styled React
 * elements. Visual styling lives in the scoped `.chat-md` CSS block in
 * index.css so it stays consistent with the site's theme variables.
 *
 * remark-gfm adds GitHub-flavoured markdown: bullet/ordered lists, tables,
 * strikethrough, and autolinks — all common in model output.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="chat-md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Open links in a new tab so the portfolio isn't navigated away.
          a({ node, ...props }) {
            void node;
            return <a {...props} target="_blank" rel="noopener noreferrer" />;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
