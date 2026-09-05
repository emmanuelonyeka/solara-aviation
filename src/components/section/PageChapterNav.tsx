export interface PageChapter {
    id: string;
    label: string;
  }
  
  interface PageChapterNavProps {
    items: readonly PageChapter[];
  }
  
  /**
   * A compact index for long editorial pages. It stays in normal document flow
   * so it never competes with the global header, while every link uses the
   * application's existing smooth anchor-scroll behaviour.
   */
  export default function PageChapterNav({ items }: PageChapterNavProps) {
    return (
      <nav aria-label="On this page" className="border-y border-white/[0.07] bg-charcoal">
        <div className="mx-auto flex w-full max-w-content items-center gap-[clamp(1.25rem,4vw,3.5rem)] px-gutter">
          <span className="hidden flex-none text-micro font-sans uppercase text-white/35 sm:block">
            On this page
          </span>
  
          <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ol className="flex w-max min-w-full items-stretch gap-[clamp(1.25rem,3vw,2.75rem)]">
              {items.map((item, index) => (
                <li key={item.id} className="flex-none">
                  <a
                    href={`#${item.id}`}
                    className="group inline-flex min-h-14 items-center gap-2 border-b border-transparent text-micro font-sans uppercase text-white/45 transition-[border-color,color] duration-400 hoverable:border-beige/60 hoverable:text-white"
                  >
                    <span aria-hidden="true" className="tabular-nums text-beige/65">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </nav>
    );
  }