"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export function Pagination({ currentPage, totalPages, baseUrl, className }: PaginationProps) {
  const generatePaginationItems = () => {
    const items = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    // Première page
    if (startPage > 1) {
      items.push(
          <PaginationLink key="1" href={`${baseUrl}?page=1`}>
            1
          </PaginationLink>
      );
      if (startPage > 2) {
        items.push(<PaginationEllipsis key="ellipsis-1" />);
      }
    }

    // Pages du milieu
    for (let i = startPage; i <= endPage; i++) {
      items.push(
          <PaginationLink key={i} href={`${baseUrl}?page=${i}`} isActive={i === currentPage}>
            {i}
          </PaginationLink>
      );
    }

    // Dernière page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<PaginationEllipsis key="ellipsis-2" />);
      }
      items.push(
          <PaginationLink key={totalPages} href={`${baseUrl}?page=${totalPages}`}>
            {totalPages}
          </PaginationLink>
      );
    }

    return items;
  };

  return (
      <nav role="navigation" aria-label="Pagination" className={cn("mx-auto flex w-full justify-center", className)}>
        <ul className="flex flex-row items-center gap-1">
          <PaginationLink
              href={`${baseUrl}?page=${currentPage - 1}`}
              disabled={currentPage <= 1}
              aria-label="Aller à la page précédente"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Précédent</span>
          </PaginationLink>
          {generatePaginationItems()}
          <PaginationLink
              href={`${baseUrl}?page=${currentPage + 1}`}
              disabled={currentPage >= totalPages}
              aria-label="Aller à la page suivante"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Suivant</span>
          </PaginationLink>
        </ul>
      </nav>
  );
}

interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  disabled?: boolean;
}

export function PaginationLink({ className, isActive, disabled, href, children, ...props }: PaginationLinkProps) {
  return (
      <li>
        <a
            href={disabled ? "#" : href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
                buttonVariants({
                  variant: isActive ? "default" : "ghost",
                  size: "icon",
                }),
                disabled && "pointer-events-none opacity-50",
                className
            )}
            {...props}
        >
          {children}
        </a>
      </li>
  );
}

export function PaginationEllipsis() {
  return (
      <li className="flex h-9 w-9 items-center justify-center">
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">Plus de pages</span>
      </li>
  );
}
