import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Remove the horizontal gutter so a child can bleed to the viewport edge. */
  bleed?: boolean;
  /** Lift the surface a fraction above the page. Use sparingly. */
  raised?: boolean;
  /** Hairline along the top edge, for separating adjacent sections. */
  divided?: boolean;
  as?: 'section' | 'div';
  /** Tighter vertical rhythm, for a section holding a single band of figures. */
  compact?: boolean;
}

/**
 * Vertical and horizontal rhythm for every page section.
 *
 * Spacing comes from the `section` and `gutter` tokens in tailwind.config,
 * so the whole site's proportions are changed in one place.
 */
export default function Section({
  children,
  id,
  className = '',
  bleed = false,
  raised = false,
  divided = false,
  compact = false,
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={[
        'relative',
        compact ? 'py-section-sm' : 'py-section',
        bleed ? '' : 'px-gutter',
        raised ? 'bg-white/[0.015]' : '',
        divided ? 'border-t border-white/[0.07]' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {bleed ? children : <div className="mx-auto w-full max-w-content">{children}</div>}
    </Tag>
  );
}
