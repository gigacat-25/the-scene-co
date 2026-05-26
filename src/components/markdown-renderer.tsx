"use client";

import React from "react";
import Link from "next/link";
import { 
  Info, 
  Sparkles, 
  AlertTriangle, 
  AlertOctagon, 
  CheckCircle2 
} from "lucide-react";

interface Block {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'paragraph' | 'blockquote' | 'ul' | 'ol' | 'table' | 'code' | 'image' | 'hr';
  content: string;
  items?: string[];
  rows?: string[][];
  lang?: string;
  alertType?: 'note' | 'tip' | 'important' | 'warning' | 'caution';
  imageUrl?: string;
  imageAlt?: string;
}

// Helper to parse inline styles recursively (bold, italic, links, inline code, images)
export function parseInline(text: string): React.ReactNode[] {
  let parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // 1. Image match: ![alt](url)
    const imgMatch = remaining.match(/^!\[(.*?)\]\((.*?)\)/);
    if (imgMatch) {
      parts.push(
        <img
          key={key++}
          src={imgMatch[2]}
          alt={imgMatch[1]}
          className="my-4 rounded-lg border border-white/10 inline-block max-w-full"
        />
      );
      remaining = remaining.substring(imgMatch[0].length);
      continue;
    }

    // 2. Link match: [label](url)
    const linkMatch = remaining.match(/^\[(.*?)\]\((.*?)\)/);
    if (linkMatch) {
      const url = linkMatch[2];
      const isExternal = url.startsWith("http");
      parts.push(
        <Link
          key={key++}
          href={url}
          className="text-primary hover:underline font-medium transition-colors cursor-pointer"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {parseInline(linkMatch[1])}
        </Link>
      );
      remaining = remaining.substring(linkMatch[0].length);
      continue;
    }

    // 3. Bold Match: **text** or __text__
    const boldMatch = remaining.match(/^(\*\*|__)(.*?)\1/);
    if (boldMatch) {
      parts.push(
        <strong key={key++} className="font-bold text-ink">
          {parseInline(boldMatch[2])}
        </strong>
      );
      remaining = remaining.substring(boldMatch[0].length);
      continue;
    }

    // 4. Italic Match: *text* or _text_
    const italicMatch = remaining.match(/^(\*|_)(.*?)\1/);
    if (italicMatch) {
      parts.push(
        <em key={key++} className="italic text-ink/90">
          {parseInline(italicMatch[2])}
        </em>
      );
      remaining = remaining.substring(italicMatch[0].length);
      continue;
    }

    // 5. Code Match: `code`
    const codeMatch = remaining.match(/^`(.*?)`/);
    if (codeMatch) {
      parts.push(
        <code 
          key={key++} 
          className="px-1.5 py-0.5 rounded bg-surface-soft border border-hairline text-sm font-mono text-ink/95"
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.substring(codeMatch[0].length);
      continue;
    }

    // 6. Plain characters: consume until next special character
    const nextSpecial = remaining.search(/[!\[\*_`]/);
    if (nextSpecial === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    } else if (nextSpecial === 0) {
      parts.push(<span key={key++}>{remaining[0]}</span>);
      remaining = remaining.substring(1);
    } else {
      parts.push(<span key={key++}>{remaining.substring(0, nextSpecial)}</span>);
      remaining = remaining.substring(nextSpecial);
    }
  }

  return parts;
}

// Block parser
export function parseMarkdownToBlocks(text: string): Block[] {
  const lines = text.split("\n");
  const blocks: Block[] = [];
  let currentBlock: Block | null = null;
  let inCodeBlock = false;
  let codeContent: string[] = [];
  let codeLang = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block check
    if (inCodeBlock) {
      if (line.trim().startsWith("```")) {
        inCodeBlock = false;
        blocks.push({
          type: "code",
          content: codeContent.join("\n"),
          lang: codeLang
        });
        codeContent = [];
        codeLang = "";
      } else {
        codeContent.push(line);
      }
      continue;
    }

    if (line.trim().startsWith("```")) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      inCodeBlock = true;
      codeLang = line.trim().substring(3).trim();
      continue;
    }

    // Horizontal Rule
    if (line.trim() === "---" || line.trim() === "***") {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      blocks.push({ type: "hr", content: "" });
      continue;
    }

    // Headers
    const hMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (hMatch) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      const level = hMatch[1].length;
      let type: 'h1' | 'h2' | 'h3' | 'h4' = 'h4';
      if (level === 1) type = 'h1';
      else if (level === 2) type = 'h2';
      else if (level === 3) type = 'h3';
      
      blocks.push({
        type,
        content: hMatch[2].trim()
      });
      continue;
    }

    // Blockquote & Alerts
    if (line.startsWith(">")) {
      let bLine = line.substring(1);
      if (bLine.startsWith(" ")) bLine = bLine.substring(1);

      if (currentBlock && currentBlock.type === "blockquote") {
        currentBlock.content += "\n" + bLine;
      } else {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        
        let alertType: Block['alertType'] = undefined;
        let cleanText = bLine;
        
        const alertMatch = bLine.match(/^\[!(NOTE|IMPORTANT|WARNING|CAUTION|TIP)\]/i);
        if (alertMatch) {
          alertType = alertMatch[1].toLowerCase() as any;
          cleanText = bLine.substring(alertMatch[0].length).trim();
        }
        
        currentBlock = {
          type: "blockquote",
          content: cleanText,
          alertType
        };
      }
      continue;
    }

    // List item (unordered)
    const ulMatch = line.match(/^(\s*)[-\*\+]\s+(.*)$/);
    if (ulMatch) {
      const itemContent = ulMatch[2].trim();
      if (currentBlock && currentBlock.type === "ul") {
        currentBlock.items?.push(itemContent);
      } else {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        currentBlock = {
          type: "ul",
          content: "",
          items: [itemContent]
        };
      }
      continue;
    }

    // List item (ordered)
    const olMatch = line.match(/^(\s*)\d+\.\s+(.*)$/);
    if (olMatch) {
      const itemContent = olMatch[2].trim();
      if (currentBlock && currentBlock.type === "ol") {
        currentBlock.items?.push(itemContent);
      } else {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        currentBlock = {
          type: "ol",
          content: "",
          items: [itemContent]
        };
      }
      continue;
    }

    // Table rows
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const cells = line
        .split("|")
        .map(c => c.trim())
        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      const isSep = cells.every(c => c.match(/^:?-+:?$/));
      
      if (isSep) {
        if (currentBlock && currentBlock.type === "table") {
          continue;
        }
      }

      if (currentBlock && currentBlock.type === "table") {
        currentBlock.rows?.push(cells);
      } else {
        if (currentBlock) {
          blocks.push(currentBlock);
        }
        currentBlock = {
          type: "table",
          content: "",
          rows: [cells]
        };
      }
      continue;
    }

    // Image standalone line
    const imgMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      blocks.push({
        type: "image",
        content: "",
        imageAlt: imgMatch[1],
        imageUrl: imgMatch[2]
      });
      continue;
    }

    // Empty line ends current block
    if (line.trim() === "") {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }

    // Normal paragraph line
    if (currentBlock && currentBlock.type === "paragraph") {
      currentBlock.content += "\n" + line.trim();
    } else {
      if (currentBlock) {
        blocks.push(currentBlock);
      }
      currentBlock = {
        type: "paragraph",
        content: line.trim()
      };
    }
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return blocks;
}

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Convert literal backslash-n sequences to actual newlines
  const cleanContent = (content || "")
    .replace(/\\r\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\\n/g, "\n");
  const blocks = parseMarkdownToBlocks(cleanContent);
  let keyIdx = 0;

  return (
    <div className="markdown-body text-ink">
      {blocks.map((block) => {
        const key = `block-${block.type}-${keyIdx++}`;

        switch (block.type) {
          case "h1":
            return (
              <h1 
                key={key} 
                className="text-ink font-bold tracking-tight mt-12 mb-6"
                style={{ fontSize: "clamp(28px, 4vw, 42px)", lineHeight: 1.15 }}
              >
                {parseInline(block.content)}
              </h1>
            );
          case "h2":
            return (
              <h2 
                key={key} 
                className="text-ink font-bold text-2xl mt-12 mb-5 border-b border-hairline pb-3"
              >
                {parseInline(block.content)}
              </h2>
            );
          case "h3":
            return (
              <h3 
                key={key} 
                className="text-ink font-semibold text-xl mt-8 mb-4"
              >
                {parseInline(block.content)}
              </h3>
            );
          case "h4":
            return (
              <h4 
                key={key} 
                className="text-ink/90 font-medium text-lg mt-6 mb-3"
              >
                {parseInline(block.content)}
              </h4>
            );
          case "paragraph":
            return (
              <p 
                key={key} 
                className="text-ink/80 leading-relaxed text-base mb-6"
              >
                {parseInline(block.content)}
              </p>
            );
          case "ul":
            return (
              <ul 
                key={key} 
                className="list-disc pl-6 mb-6 space-y-2 text-ink/80"
              >
                {block.items?.map((item, idx) => (
                  <li key={idx}>{parseInline(item)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol 
                key={key} 
                className="list-decimal pl-6 mb-6 space-y-2 text-ink/80"
              >
                {block.items?.map((item, idx) => (
                  <li key={idx}>{parseInline(item)}</li>
                ))}
              </ol>
            );
          case "blockquote":
            if (block.alertType) {
              let alertStyle = "bg-surface-soft border-hairline text-ink";
              let titleStyle = "text-ink";
              let icon = <Info className="h-5 w-5 flex-shrink-0" />;
              let title = "Note";

              switch (block.alertType) {
                case "note":
                  alertStyle = "bg-blue-50/70 border-blue-200/80 text-blue-950";
                  titleStyle = "text-blue-900";
                  icon = <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />;
                  title = "Note";
                  break;
                case "tip":
                  alertStyle = "bg-emerald-50/70 border-emerald-200/80 text-emerald-950";
                  titleStyle = "text-emerald-900";
                  icon = <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />;
                  title = "Tip";
                  break;
                case "important":
                  alertStyle = "bg-purple-50/70 border-purple-200/80 text-purple-950";
                  titleStyle = "text-purple-900";
                  icon = <Sparkles className="h-5 w-5 text-purple-500 flex-shrink-0" />;
                  title = "Important";
                  break;
                case "warning":
                  alertStyle = "bg-amber-50/70 border-amber-200/80 text-amber-950";
                  titleStyle = "text-amber-900";
                  icon = <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />;
                  title = "Warning";
                  break;
                case "caution":
                  alertStyle = "bg-red-50/70 border-red-200/80 text-red-950";
                  titleStyle = "text-red-900";
                  icon = <AlertOctagon className="h-5 w-5 text-red-500 flex-shrink-0" />;
                  title = "Caution";
                  break;
              }

              return (
                <div 
                  key={key} 
                  className={`flex gap-3.5 p-5 my-6 rounded-lg border ${alertStyle} leading-relaxed`}
                >
                  {icon}
                  <div>
                    <span className={`block font-bold mb-1.5 text-sm uppercase tracking-wide ${titleStyle}`}>
                      {title}
                    </span>
                    <span className="text-[15px]">{parseInline(block.content)}</span>
                  </div>
                </div>
              );
            }

            return (
              <blockquote 
                key={key} 
                className="bg-surface-soft border-l-4 border-primary text-ink/80 pl-5 pr-3 py-2.5 my-6 italic rounded-r-md"
              >
                {parseInline(block.content)}
              </blockquote>
            );
          case "table":
            if (!block.rows || block.rows.length === 0) return null;
            const headers = block.rows[0];
            const dataRows = block.rows.slice(1);

            return (
              <div key={key} className="w-full my-8 overflow-x-auto rounded-lg border border-hairline bg-canvas">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-hairline bg-surface-soft">
                      {headers.map((h, idx) => (
                        <th 
                          key={idx} 
                          className="p-4 font-semibold text-ink uppercase tracking-wider text-xs"
                        >
                          {parseInline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline-soft">
                    {dataRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-surface-soft/50 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-4 text-ink/80 align-top max-w-xs md:max-w-none break-words">
                            {parseInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "code":
            return (
              <pre 
                key={key} 
                className="bg-surface-soft border border-hairline rounded-lg p-5 my-6 overflow-x-auto font-mono text-sm text-ink/90 leading-relaxed"
              >
                <code>{block.content}</code>
              </pre>
            );
          case "image":
            return (
              <figure key={key} className="my-8">
                <div className="relative w-full rounded-xl overflow-hidden border border-hairline bg-canvas">
                  <img 
                    src={block.imageUrl} 
                    alt={block.imageAlt} 
                    className="w-full h-auto object-cover max-h-[480px]"
                  />
                </div>
                {block.imageAlt && (
                  <figcaption className="text-center text-xs text-ink/60 mt-3 italic">
                    {block.imageAlt}
                  </figcaption>
                )}
              </figure>
            );
          case "hr":
            return <hr key={key} className="my-10 border-t border-hairline" />;
          default:
            return null;
        }
      })}
    </div>
  );
}
